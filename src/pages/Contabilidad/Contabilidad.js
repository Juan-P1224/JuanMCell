import React from 'react';
import './Contabilidad.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation/Navigation';

import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';


class Contabilidad extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTable1: false,
            showTable2: false,
            data: [],
            modalVender: false,
            form: {
                id: '',
                marca: '',
                referencia: '',
                tipo: '',
                cantidad: '',
                precio: '',
                costoProveedor: ''
            }
        };
    }

    handleShowTable1 = () => {
        this.setState({
            showTable1: true,
            showTable2: false
        });

        fetch('http://localhost:9000/display')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    };

    


    handleShowTable2 = () => {
        this.setState({
            showTable1: false,
            showTable2: true
        });
        
        fetch('http://localhost:9000/api')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    };

    mostrarModalVender = (registro) => {
        this.setState({ modalVender: true, form: registro });
    };

    ocultarModalVender = () => {
        this.setState({ modalVender: false });
    };

    vender = (form) => {
    };

    render() {
        const { showTable1, showTable2, data, modalVender, form } = this.state;

        return (
            <Navigation>
                <div className='button-alternar'>
                    <div className='button-alternar-display'>
                        <button name='buttonDisplay' onClick={this.handleShowTable1}>Mostrar Tabla Display</button>
                    </div>

                    <div className='button-alternar-articulo'>
                        <button name='buttonArticulo' onClick={this.handleShowTable2}>Mostrar Tabla Articulo</button>
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
                                    <tr key={elemento.id}>
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
                                    <th>Precio</th>
                                    <th>Costo Proveedor</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((elemento) => (
                                    <tr key={elemento.id}>
                                        <td>{elemento.id}</td>
                                        <td>{elemento.categoria}</td>
                                        <td>{elemento.marca}</td>
                                        <td>{elemento.cantidad}</td>
                                        <td>{elemento.precio}</td>
                                        <td>{elemento.costoProveedor}</td>
                                        <td><Button color="none" className="btn-vender" onClick={() => this.mostrarModalVender(elemento)}>Vender</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </table>
                    </div>
                )}
                <Modal isOpen={modalVender}>
                    <ModalHeader>
                        <div><h3>Vender</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>
                                Desea vender: {form.id}?
                            </label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="none" className='btn-aceptar1' onClick={() => this.vender(form)}>Aceptar</Button>
                        <Button color="none" className='btn-cancelar1' onClick={this.ocultarModalVender}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </Navigation>
        );
    }
}
export default Contabilidad;


