import React, { useState } from 'react';
import './Display.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const data = [
    { id: 1, referencia: "Oppo reno 5 lite", calidad: "OLED", cantidad: 5, precio: 120000 },
    { id: 2, referencia: "OnePlus 11 5G", calidad: "AMOLED", cantidad: 9, precio: 90000 },
    { id: 3, referencia: "Samsung j4 plus", calidad: "ORIGINAL", cantidad: 2, precio: 110000 },
];

class Display extends React.Component {
    state = {
        data: data,
        form: {
            id: '',
            referencia: '',
            calidad: '',
            cantidad: '',
            precio: ''
        },
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
    };

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }
    mostrarModalInsertar = () => {
        this.setState({ modalInsertar: true });
    }
    ocultarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    }
    mostrarModalEditar = (registro) => {
        this.setState({ modalEditar: true, form: registro });
    }
    ocultarModalEditar = () => {
        this.setState({ modalEditar: false });
    }
    mostrarModalEliminar = (registro) => {
        this.setState({ modalEliminar: true, form: registro});
    }
    ocultarModalEliminar = () => {
        this.setState({ modalEliminar: false });
    }
    insertar = () => {
        let valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        let lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ data: lista, modalInsertar: false });
    }
    editar = (dato) => {
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
        let contador = 0;
            let lista = this.state.data;
            lista.map((registro) => {
                if (dato.id == registro.id) {
                    lista.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: lista, modalEliminar: false});     
    }
    render() {
        return (
            <>
            <div className='articulo-container'>

            
                <Container>
                        <br />
                        <Button color='none' className='btn-insertar' onClick={() => this.mostrarModalInsertar()}></Button>
                        <br /><br />
                    

                    <Table>
                        <div className='nombre-columnas'>

                        </div>
                        <thead><tr><th>Id</th>
                            <th>Referencia</th><th>Calidad</th><th>Cantidad</th>
                            <th>Precio</th><th>Acciones</th>
                        </tr></thead>
                        <tbody>
                            {this.state.data.map((elemento) => (
                                <tr>
                                    <td>{elemento.id}</td>
                                    <td>{elemento.referencia}</td>
                                    <td>{elemento.calidad}</td>
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
                                type="text" value={this.state.data.length + 1}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Referencia:
                            </label>
                            <input
                                className="form-control"
                                name="referencia"
                                type="text" onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Calidad:
                            </label>
                            <input
                                className="form-control"
                                name="calidad"
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
                                Referencia:
                            </label>
                            <input
                                className="form-control"
                                name="referencia"
                                type="text" onChange={this.handleChange} value={this.state.form.referencia}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Calidad:
                            </label>
                            <input
                                className="form-control"
                                name="calidad"
                                type="text" onChange={this.handleChange} value={this.state.form.calidad}
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
                                ¿Deseas eliminar el display seleccionado con el id: {this.state.form.id}?
                            </label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        
                        <Button color="none" className='btn-aceptar1' onClick={() => this.eliminar(this.state.form)}></Button>
                        <Button color="none" className='btn-cancelar1' onClick={() => this.ocultarModalEliminar()}></Button>
                    </ModalFooter>
                </Modal>
                </div>
            </>)
    }
}

export default Display;