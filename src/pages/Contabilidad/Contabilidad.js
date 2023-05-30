import React from 'react';
import './Contabilidad.css';
import Navigation from '../components/Navigation/Navigation';

import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import { isEmpty } from 'lodash';


class Contabilidad extends React.Component {
    state = {
        showTable1: false,
        showTable2: false,
        data: [],
        dinero: [],
        beneficio: '',
        cajaDinero: '',
        modalVender: false,
        modalVenderAccesorio: false,
        form: {
            id: '',
            marca: '',
            referencia: '',
            tipo: '',
            cantidad: 0,
            precio: 0.0,
            costoProveedor: 0.0,
            categoria: '',
            venta: 0,
        }
    };

    componentDidMount() {
        this.handleShowTable1();
    }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    handleShowTable1 = () => {
        this.setState({
            showTable1: true,
            showTable2: false
        });

        fetch('https://api-juanmcell-production.up.railway.app/display')
            .then(response => response.json())
            .then(data => this.setState({ data }));

        fetch('https://api-juanmcell-production.up.railway.app/venta')
            .then(response => response.json())
            .then(dinero => this.setState({ dinero }));
        this.listarDineroDisplay();
    };

    handleShowTable2 = () => {
        this.setState({
            showTable1: false,
            showTable2: true
        });

        fetch('https://api-juanmcell-production.up.railway.app/api')
            .then(response => response.json())
            .then(data => this.setState({ data }));

        fetch('https://api-juanmcell-production.up.railway.app/venta')
            .then(response => response.json())
            .then(dinero => this.setState({ dinero }));
        this.listarDineroAccesorio();
    };

    mostrarModalVender = (registro) => {
        this.setState({ modalVender: true, form: registro });
    };

    listarDineroDisplay = () => {
        let lista = this.state.dinero;
        lista.map((registro) => {
            if (1 == registro.id) {
                this.state.beneficio = registro.ganancia;
                this.state.cajaDinero = registro.caja;
            }
        })
    }

    listarDineroAccesorio = () => {
        let lista = this.state.dinero;
        lista.map((registro) => {
            if (2 == registro.id) {
                this.state.beneficio = registro.ganancia;
                this.state.cajaDinero = registro.caja;
            }
        })
    }

    reiniciarCaja(){

    }

    ocultarModalVender = () => {
        this.setState({ modalVender: false });
    };
    mostrarModalVenderAccesorio = (registro) => {
        this.setState({ modalVenderAccesorio: true, form: registro });
    };

    ocultarModalVenderAccesorio = () => {
        this.setState({ modalVenderAccesorio: false });
    };

    vender = (dato) => {
        if (this.state.form.cantidad < this.state.form.venta) {
            alert('Se está solicitando una venta que supera la cantidad disponible en el inventario.')
            return
        }
        if (isEmpty(dato.venta)) {
            alert('Todos los campos son obligatorios.')
            return
        }
        if (dato.venta < 0) {
            alert('Por favor ingresa valores positivos.')
            return
        }
        if (this.isLetterAttribute(dato.venta)) {
            alert('Verifica que el valor ingresado sea un número.')
            return
        }
        const updatedCantidad = dato.cantidad - dato.venta;
        const updatedItem = { ...dato, cantidad: updatedCantidad };

        let idAgregar = 2;
        const updatedGanancia = ((dato.precio - dato.costoProveedor) * dato.venta) + this.state.beneficio;
        const updatedCaja = (dato.precio * dato.venta) + this.state.cajaDinero;
        this.state.cajaDinero = updatedCaja;
        this.state.beneficio = updatedGanancia;


        fetch(`https://api-juanmcell-production.up.railway.app/venta/${idAgregar}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "ganancia": updatedGanancia, "caja": updatedCaja })
        })


        fetch(`https://api-juanmcell-production.up.railway.app/api/${dato.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "cantidad": updatedItem.cantidad })
        })
            .then(response => response.json())
            .then(updatedItem => {
                const updatedList = this.state.data.map(item => {
                    if (item.id === updatedItem.id) {
                        return updatedItem;
                    }
                    return item;
                });
                this.setState({
                    data: updatedList,
                    modalVenderAccesorio: false,
                    form: { id: '', categoria: '', cantidad: '', costoProveedor: '', precio: '', marca: '' }
                });
            })
            .catch(error => console.error(error));

        const updatedData = this.state.data.map(registro => {
            if (dato.id === registro.id) {
                return { ...registro, cantidad: updatedCantidad };
            }
            return registro;
        });

        this.setState({ data: updatedData, modalVenderAccesorio: false });
    };

    venderDisplay = (dato) => {
        if (this.state.form.cantidad < this.state.form.venta) {
            alert('Se está solicitando una venta que supera la cantidad disponible en el inventario.')
            return
        }
        if (isEmpty(dato.venta)) {
            alert('Todos los campos son obligatorios.')
            return
        }
        if (dato.venta < 0) {
            alert('Por favor ingresa valores positivos.')
            return
        }
        if (this.isLetterAttribute(dato.venta)) {
            alert('Verifica que el valor ingresado sea un número.')
            return
        }
        const updatedCantidad = dato.cantidad - dato.venta;
        const updatedItem = { ...dato, cantidad: updatedCantidad };

        let idAgregar = 1;
        const updatedGanancia = ((dato.precio - dato.costoProveedor) * dato.venta) + this.state.beneficio;
        const updatedCaja = (dato.precio * dato.venta) + this.state.cajaDinero;
        this.state.cajaDinero = updatedCaja;
        this.state.beneficio = updatedGanancia;

        fetch(`https://api-juanmcell-production.up.railway.app/venta/${idAgregar}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "ganancia": updatedGanancia, "caja": updatedCaja })
        })

        fetch(`https://api-juanmcell-production.up.railway.app/display/${dato.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "cantidad": updatedItem.cantidad })
        })
            .then(response => response.json())
            .then(updatedItem => {
                const updatedList = this.state.data.map(item => {
                    if (item.id === updatedItem.id) {
                        return updatedItem;
                    }
                    return item;
                });
                this.setState({
                    data: updatedList,
                    modalVender: false,
                    form: { id: '', referencia: '', cantidad: '', costoProveedor: '', precio: '', tipo: '' }
                });
            })
            .catch(error => console.error(error));

        const updatedData = this.state.data.map(registro => {
            if (dato.id === registro.id) {
                return { ...registro, cantidad: updatedCantidad };
            }
            return registro;
        });

        this.setState({ data: updatedData, modalVender: false });
    };

    isLetterAttribute = (dato) => {
        return typeof dato === 'string' && isNaN(dato);
    };

    render() {
        const { showTable1, showTable2, data, modalVender, modalVenderAccesorio, form, beneficio, cajaDinero } = this.state;

        return (
            <Navigation>
                <div className='button-alternar'>
                    <div className={`button-alternar-display ${showTable1 ? 'selected' : ''}`}>
                        <Button onClick={this.handleShowTable1}>Display</Button>
                    </div>

                    <div className={`button-alternar-articulo ${showTable2 ? 'selected' : ''}`}>
                        <Button onClick={this.handleShowTable2}>Articulo</Button>
                    </div>
                </div>

                {showTable1 && (
                    <div className='tabla-display'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Marca</th>
                                    <th>Referencia</th>
                                    <th>Tipo</th>
                                    <th>Cantidad</th>
                                    <th>Costo Proveedor</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((elemento) => (
                                    <tr>
                                        <td>{elemento.id}</td>
                                        <td>{elemento.marca}</td>
                                        <td>{elemento.referencia}</td>
                                        <td>{elemento.tipo}</td>
                                        <td>{elemento.cantidad}</td>
                                        <td>{elemento.costoProveedor}</td>
                                        <td>{elemento.precio}</td>
                                        <td><Button color="none" className="btn-vender" onClick={() => this.mostrarModalVender(elemento)}>Vender</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='cajas'>
                            <div className='caja-ganancia'>
                                <p> Total ganancias: </p>
                                <p>${beneficio}</p>
                            </div>
                            <div className='caja-dinero'>
                                <p>Dinero en caja: </p>
                                <p>${cajaDinero}</p>
                            </div>
                        </div>
                        <div className='reiniciar-container'>
                            <Button className="buttonReiniciar " onClick={() => this.reiniciarCaja()}>Reiniciar Caja</Button>
                        </div>
                    </div>
                )}

                {showTable2 && (
                    <div className='tabla-articulo'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Categoria</th>
                                    <th>Marca</th>
                                    <th>Cantidad</th>
                                    <th>Costo Proveedor</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((elemento) => (
                                    <tr>
                                        <td>{elemento.id}</td>
                                        <td>{elemento.categoria}</td>
                                        <td>{elemento.marca}</td>
                                        <td>{elemento.cantidad}</td>
                                        <td>{elemento.costoProveedor}</td>
                                        <td>{elemento.precio}</td>
                                        <td><Button color="none" className="btn-vender" onClick={() => this.mostrarModalVenderAccesorio(elemento)}>Vender</Button></td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <div className='cajas'>
                            <div className='caja-ganancia'>
                                <p> Total ganancias: </p>
                                <p>${beneficio}</p>
                            </div>
                            <div className='caja-dinero'>
                                <p>Dinero en caja: </p>
                                <p>${cajaDinero}</p>
                            </div>
                        </div>
                        <div className='reiniciar-container'>
                            <Button className="buttonReiniciar " onClick={() => this.reiniciarCaja()}>Reiniciar Caja</Button>
                        </div>
                        
                    </div>
                )}
                <Modal isOpen={modalVender}>
                    <ModalHeader>
                        <div><h3>Vender Display</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>
                                ¿Cuántos desea vender?:
                            </label>
                            <input
                                className="form-control"
                                name="venta"
                                type="text" onChange={this.handleChange} value={this.state.form.venta}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="none" className='btn-aceptar1' onClick={() => this.venderDisplay(form)}>Aceptar</Button>
                        <Button color="none" className='btn-cancelar1' onClick={this.ocultarModalVender}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalVenderAccesorio}>
                    <ModalHeader>
                        <div><h3>Vender Articulo</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>
                                ¿Cuántos desea vender?:
                            </label>
                            <input
                                className="form-control"
                                name="venta"
                                type="text" onChange={this.handleChange} value={this.state.form.venta}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="none" className='btn-aceptar1' onClick={() => this.vender(form)}></Button>
                        <Button color="none" className='btn-cancelar1' onClick={this.ocultarModalVenderAccesorio}></Button>
                    </ModalFooter>
                </Modal>
            </Navigation>
        );
    }
}
export default Contabilidad;


