import React from 'react';
import './Display.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation/Navigation';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

class Display extends React.Component {
    state = {
        data: [],
        form: {
            id: '',
            marca: '',
            referencia: '',
            tipo: '',
            cantidad: '',
            precio: '',
            costoProveedor:''
        },
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
        idGenerado: '',
    };

    componentDidMount() {
        fetch('http://localhost:9001/display')
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

    handleSubmit = () => {
        let valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.idGenerado;

        if(valorNuevo.referencia === '' || valorNuevo.marca === '' 
            || valorNuevo.precio === '' || valorNuevo.cantidad === '' || 
            valorNuevo.costoProveedor === '' || valorNuevo.tipo === ''){
            alert('Todos los campos son obligatorios')
            return
        }

        const requestInit = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({"referencia": valorNuevo.referencia, "marca": valorNuevo.marca, "cantidad": valorNuevo.cantidad, "precio": valorNuevo.precio, "costoProveedor": valorNuevo.costoProveedor, 
            "tipo":valorNuevo.tipo, "id": valorNuevo.id})
        }

        fetch('http://localhost:9001/display', requestInit)
        .then(res => res.json())
        const lista = [...this.state.data, valorNuevo]
        this.setState({ data: lista, modalInsertar: false })
        this.setearAtributos()

    }
    mostrarModalInsertar = () => {
        this.setState({ modalInsertar: true });
        this.generarId();

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
        this.setState({ modalEliminar: true, form: registro });
    }
    ocultarModalEliminar = () => {
        this.setState({ modalEliminar: false });
    }
    setearAtributos = () => {
        this.state.form.marca = '';
        this.state.form.referencia = '';
        this.state.form.tipo = '';
        this.state.form.cantidad = '';
        this.state.form.precio = '';
        this.state.form.costoProveedor = '';
    }
   
    editar = (dato) => {
        fetch(`http://localhost:9001/display/${this.state.form.id}`, {
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
                    form: { id: '', marca: '', cantidad: '', costoProveedor: '', precio: '', tipo: '', referencia: '' }
                });
            })
            .catch(error => console.error(error))
        let contador = 0;
        let lista = this.state.data;
        lista.map((registro) => {
            if (dato.id == registro.id) {
                lista[contador].referencia = dato.referencia;
                lista[contador].marca = dato.marca;
                lista[contador].cantidad = dato.cantidad;
                lista[contador].costoProveedor = dato.costoProveedor;
                lista[contador].precio = dato.precio;
                lista[contador].tipo = dato.tipo;
                this.setearAtributos();
            }
            contador++;
        });
        this.setState({ data: lista, modalEditar: false });
    }
    eliminar = (dato) => {
        fetch(`http://localhost:9001/display/${dato.id}`, {
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
        console.log('El componente Display se está renderizando');
        return (
            
            <>
            <Navigation>
            <div className='display-container'>


                <Container>
                    <br />
                    <Button color='none' className='btn-insertar' onClick={() => this.mostrarModalInsertar()}></Button>
                    <br /><br />


                    <Table>
                        <div className='nombre-columnas'>

                        </div>
                        <thead><tr><th>Id</th><th>Marca</th>
                            <th>Referencia</th><th>Tipo</th><th>Cantidad</th><th>Costo Proveedor</th>
                            <th>Precio</th><th>Acciones</th>
                        </tr></thead>
                        <tbody>
                            {this.state.data.map((elemento) => (
                                <tr>
                                    <td>{elemento.id}</td>
                                    <td>{elemento.marca}</td>
                                    <td>{elemento.referencia}</td>
                                    <td>{elemento.tipo}</td>
                                    <td>{elemento.cantidad}</td>
                                    <td>{elemento.costoProveedor}</td>
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
                        <div><h3>Insertar Display</h3></div>
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
                                Marca:
                            </label>
                            <input
                                className="form-control"
                                name="marca"
                                type="text" onChange={this.handleChange}
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
                                Tipo:
                            </label>
                            <input
                                className="form-control"
                                name="tipo"
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
                                Costo proveedor:
                            </label>
                            <input
                                className="form-control"
                                name="costoProveedor"
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
                        <Button color="primary" onClick={() => this.handleSubmit()}>Insertar</Button>
                        <Button color="danger" onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>
                        <div><h3>Editar Display</h3></div>
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
                                Marca:
                            </label>
                            <input
                                className="form-control"
                                name="marca"
                                type="text" onChange={this.handleChange} value={this.state.form.marca}
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
                                Tipo:
                            </label>
                            <input
                                className="form-control"
                                name="tipo"
                                type="text" onChange={this.handleChange} value={this.state.form.tipo}
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
                                Costo proveedor:
                            </label>
                            <input
                                className="form-control"
                                name="costoProveedor"
                                type="text" onChange={this.handleChange} value={this.state.form.costoProveedor}
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
                        <div><h3>Eliminar Display</h3></div>
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
            </Navigation>
                
            </>)
    }
}

export default Display;