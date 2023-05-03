import React, { useState } from 'react';
import './Articulo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navigation from '../components/Navigation/Navigation';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';


class Articulo extends React.Component {

    state = {
        data: [],
        form: {
            id: '',
            nombre: '',
            cantidad: '',
            precio: '',
            idGenerado:' '
        },
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
        idGenerado: '',
    };

    componentDidMount() {
        fetch('http://localhost:9000/api')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9000/api', this.state.form)
          .then((response) => {
            const newData = [...this.state.data, response.data];
            this.setState({ data: newData, modalInsertar: false });
          })
          .catch((error) => console.error(error));
    }

    mostrarModalInsertar = () => {
        this.setState({ modalInsertar: true });
        this.generarId();
    }
    ocultarModalInsertar = () => {
        this.setState({ modalInsertar: false });
        this.generarId();
    }
    mostrarModalEditar = (registro) => {
        this.setState({ modalEditar: true, form: registro });
    }
    ocultarModalEditar = () => {
        this.setState({ modalEditar: false });
    }
    mostrarModalEliminar = (registro) => {
        this.setState({ modalEliminar: true, form: registro });
    }
    ocultarModalEliminar = () => {
        this.setState({ modalEliminar: false });
    }
    insertar = () => {
        let valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.idGenerado;
        let lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ data: lista, modalInsertar: false });
    }
    editar = (dato) => {
        fetch(`http://localhost:9000/api/${this.state.form.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
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
                    modalEditar: false,
                    form: { id: '', nombre: '', cantidad: '', precio: '' }
                });
            })
            .catch(error => console.error(error))
        let contador = 0;
        let lista = this.state.data;
        lista.map((registro) => {
            if (dato.id == registro.id) {
                lista[contador].nombre = dato.nombre;
                lista[contador].cantidad = dato.cantidad;
                lista[contador].precio = dato.precio;
            }
            contador++;
        });
        this.setState({ data: lista, modalEditar: false });
    }
    eliminar = (dato) => {

        fetch(`http://localhost:9000/api/${dato.id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            
                let contador = 0;
                let lista = this.state.data;
                lista.map((registro) => {
                    if (dato.id == registro.id) {
                        lista.splice(contador, 1);
                    }
                    contador++;
                    
                });
                this.setState({ data: lista, modalEliminar: false });
           
       
    }
    generarId = () =>{
        let idNuevo = this.state.data.length + 1;;
        let lista = this.state.data;
        lista.map((registro) =>{
            if (idNuevo == registro.id){
                idNuevo = idNuevo + 1;
            }
        })
        this.state.idGenerado = idNuevo;
    }

    render() {
        return (
            <>
                <Navigation>
                    <div className='articulo-container'>


                        <Container>
                            <br />
                            <Button color='none' className='btn-insertar' onClick={() => this.mostrarModalInsertar()}></Button>
                            <br /><br />


                            <Table>
                                <div className='nombre-columnas'>

                                </div>
                                <thead><tr><th>Id</th>
                                    <th>Nombre</th><th>Cantidad</th>
                                    <th>Precio</th><th>Acciones</th>
                                </tr></thead>
                                <tbody>
                                    {this.state.data.map((elemento) => (
                                        <tr>
                                            <td>{elemento.id}</td>
                                            <td>{elemento.nombre}</td>
                                            <td>{elemento.cantidad}</td>
                                            <td>{elemento.precio}</td>
                                            <td><Button color="none" className="btn-editar" onClick={() => this.mostrarModalEditar(elemento)}></Button>
                                                {"           "}
                                                <Button color="none" className='btn-eliminar' onClick={() => this.mostrarModalEliminar(elemento)}></Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Registro</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>
                                Id:
                            </label>
                            <input
                                className="form-control"
                                readOnly
                                type="text" value={this.state.idGenerado}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Nombre:
                            </label>
                            <input
                                className="form-control"
                                name="nombre"
                                type="text" onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Cantidad:
                            </label>
                            <input
                                className="form-control"
                                name="cantidad"
                                type="text" onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Precio:
                            </label>
                            <input
                                className="form-control"
                                name="precio"
                                type="text" onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
                        <Button color="danger" onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>
                        <div><h3>Editar Registro</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>
                                Id:
                            </label>
                            <input
                                className="form-control"
                                readOnly
                                type="text" value={this.state.form.id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Nombre:
                            </label>
                            <input
                                className="form-control"
                                name="nombre"
                                type="text" onChange={this.handleChange} value={this.state.form.nombre}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Cantidad:
                            </label>
                            <input
                                className="form-control"
                                name="cantidad"
                                type="text" onChange={this.handleChange} value={this.state.form.cantidad}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Precio:
                            </label>
                            <input
                                className="form-control"
                                name="precio"
                                type="text" onChange={this.handleChange} value={this.state.form.precio}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
                        <Button color="danger" onClick={() => this.ocultarModalEditar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalHeader>
                        <div><h3>Editar Registro</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>
                                ¿Deseas eliminar el articulo seleccionado con el id: {this.state.form.id}?
                            </label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        
                        <Button color="none" className='btn-aceptar1' onClick={() => this.eliminar(this.state.form)}></Button>
                        <Button color="none" className='btn-cancelar1' onClick={() => this.ocultarModalEliminar()}></Button>
                    </ModalFooter>
                </Modal>
                </div>
            </Navigation>
            
            </>)
    }
}

export default Articulo;