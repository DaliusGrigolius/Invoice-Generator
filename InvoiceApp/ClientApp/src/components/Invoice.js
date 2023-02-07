import React, { useState, memo } from 'react';
import { discountStyle, totalPriceStyle, vatStyle, totalTextStyle, vatTextStyle, tyMessage, formattedDate } from './functions/InvoiceFunctions';

const Invoice = memo(({ selectedProvider, selectedClient, vatResponse, selectedProducts, selectedServices, totalPrice }) => {
    const [provider, setProvider] = useState(selectedProvider);
    const [client, setClient] = useState(selectedClient);
    const [vat, setVat] = useState(vatResponse);
    const [products, setProducts] = useState(selectedProducts);
    const [services, setServices] = useState(selectedServices);
    const [price, setPrice] = useState(totalPrice);

    return (
        <>
            <div className="pt-3 mb-3" style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
                <div style={{ fontWeight: 'bold', fontSize: '32px' }}>Invoice No.
                    <h5 style={{ lineHeight: '0.9em' }}>{Date.now().toLocaleString()}</h5>
                    <h6 style={{ fontWeight: 'bold' }}>{formattedDate}</h6>
                </div>
            </div>
            <div className="mb-2 row">
                <div className="col-sm-6 mb-2 mb-sm-0">
                    <div className="card d-flex flex-column h-100">
                        <div className="card-body">
                            <div className="card-title" style={{ fontWeight: 'bold' }}>FROM:</div>
                            <div className="card-text">{provider.fullName}, {provider.country}</div>
                            <div className="card-text">{provider.address}</div>
                            <div className="card-text">Company code: {provider.companyCode}</div>
                            <div className="card-text">VAT: {provider.vat}</div>
                            <div className="card-text">Phone: {provider.phone}</div>
                            <div className="card-text">Email: {provider.email}</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card d-flex flex-column h-100">
                        <div className="card-body">
                            <div className="card-title" style={{ fontWeight: 'bold' }}>TO:</div>
                            <div className="card-text">{client.fullName}, {client.country}</div>
                            <div className="card-text">{client.address}</div>
                            {client.companyCode ?
                                (<div className="card-text">Company code: {client.companyCode}</div>) : null}
                            {client.vat ? (<div className="card-text">VAT: {client.vat}</div>) : null}
                            {client.phone ? (<div className="card-text">Phone: {client.phone}</div>) : null}
                            {client.email ? (<div className="card-text">Email: {client.email}</div>) : null}
                        </div>
                    </div>
                </div>
            </div>
            <table className="table">
                {products.length > 0 && (<>
                    <thead className="table-dark">
                        <tr>
                            <th>Products</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Price/Unit</th>
                            <th className="text-center">Final(Eu)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>{product.name}</td>
                                    <td className="text-center">{product.description}</td>
                                    <td className="text-center">{product.quantity}</td>
                                    <td className="text-center">{product.price}</td>
                                    <td className="text-center">{product.final}</td>
                                </tr>
                                {product.discount ? (
                                    <tr style={discountStyle}>
                                        <td colSpan="4">Discount for product "{product.name}"</td>
                                        <td className="text-center">-{product.discount}%</td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </tbody></>)}
                {services.length > 0 && (<>
                    <thead className="table-dark">
                        <tr>
                            <th>Services</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Price/Unit</th>
                            <th className="text-center">Final(Eu)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>{service.name}</td>
                                    <td className="text-center">{service.description}</td>
                                    <td className="text-center">{service.quantity}</td>
                                    <td className="text-center">{service.price}</td>
                                    <td className="text-center">{service.final}</td>
                                </tr>
                                {service.discount ? (
                                    <tr style={discountStyle}>
                                        <td colSpan="4">Discount for service "{service.name}"</td>
                                        <td className="text-center">-{service.discount}%</td>
                                    </tr>
                                ) : null}
                                {new Date(service.dateTo) >= new Date() ?
                                    (<tr style={discountStyle}>
                                        <td colSpan="4">Due date for service "{service.name}"</td>
                                        <td className="text-center">{service.dateTo}</td>
                                    </tr>) : null}
                            </React.Fragment>
                        ))}
                    </tbody></>)}
                <tfoot>
                    <tr>
                        <td style={tyMessage} colSpan="3">Thank you for your business and have a great day!</td>
                        <td style={vatTextStyle}>SUBTOTAL</td>
                        <td style={vatStyle}>{price} Eu</td>
                    </tr>
                    <tr>
                        <td colSpan="3"></td>
                        <td style={vatTextStyle}>TAX ({vat}%)</td>
                        <td style={vatStyle}>{price * (vat/100)} Eu</td>
                    </tr>
                    <tr>
                        <td colSpan="3"></td>
                        <td style={totalTextStyle}>TOTAL</td>
                        <td style={totalPriceStyle}>{price + (price * (vat/100))}(Eu)</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
});

export default Invoice;