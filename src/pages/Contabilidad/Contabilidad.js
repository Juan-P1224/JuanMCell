import React, { useState } from 'react';
import './Contabilidad.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation/Navigation';

const Contabilidad = () => {
    const [showTable1, setShowTable1] = useState(false);
    const [showTable2, setShowTable2] = useState(false);

    const handleShowTable1 = () => {
        setShowTable1(true);
        setShowTable2(false);
    };

    const handleShowTable2 = () => {
        setShowTable1(false);
        setShowTable2(true);
    };

    const data = []; // Aquí debes proporcionar los datos para la tabla

    return (
        <Navigation>
            <div className='button-alternar'>
                <div className='button-alternar-display'>
                    <button onClick={handleShowTable1}>Mostrar Tabla Display</button>
                </div>

                <div className='button-alternar-articulo'>
                    <button onClick={handleShowTable2}>Mostrar Tabla Articulo</button>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Navigation>
    );
};

export default Contabilidad;
