import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Invoice from './Invoice';
import Window from './Window';
import { discountStyle, totalPriceStyle, totalTextStyle, numbersCenterStyle } from './functions/InvoiceGeneratorFunctions';

const InvoiceGenerator = ( props ) => {
    const [allGood, setAllGood] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedProvider, setSelectedProvider] = useState({});
    const [selectedClient, setSelectedClient] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [providers, setProviders] = useState([]);
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [loadingProviders, setLoadingProviders] = useState(true);
    const [loadingClients, setLoadingClients] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [vatResponse, setVatResponse] = useState(undefined);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showWindowPortal, setShowWindowPortal] = useState(false);

    useEffect(() => {
        window.addEventListener('beforeunload', () => setShowWindowPortal(false));
    }, []);

    useEffect(() => {
        populateData();
    }, []);

    const handleSelection = (e, type) => {
        const { value } = e.target;
        if (type === "provider") {
            setSelectedProvider(providers[value - 1]);
        } else if (type === "client") {
            setSelectedClient(clients[value - 1]);
        }
    };

    const handleQuantityChange = (e, stateName, index) => {
        const { value } = e.target;

        const updateItems = [...(stateName === "products" ? products : services)];
        const updatedItems = updateItems.map((item, i) => {
            if (i === index) {
                item.quantity = value;
                item.final = item.discount ? item.price * value * (1 - item.discount / 100) : item.price * value;
            }
            return item;
        });

        if (stateName === "products") {
            setSelectedProducts(updatedItems.filter(item => item.quantity > 0));
            setProducts(updatedItems);
        } else {
            setSelectedServices(updatedItems.filter(item => item.quantity > 0));
            setServices(updatedItems);
        }

        const totalPriceOfProducts = products.reduce((acc, product) => acc + product.final, 0);
        const totalPriceOfServices = services.reduce((acc, service) => acc + service.final, 0);
        setTotalPrice(totalPriceOfProducts + totalPriceOfServices);
    };

    const handleInputChecking = async () => {
        if (showWindowPortal)
        {
            setErrorMessage(`Please close 'Invoice' window tab before generating new Invoice.`);
            return false;
        }
        let missingFields = "";
        let productSelected = products.some(item => item.quantity > 0);
        let servicesSelected = services.some(item => item.quantity > 0);

        if (!selectedProvider || Object.keys(selectedProvider).length === 0) {
            missingFields += "Provider, ";
        }
        if (!selectedClient || Object.keys(selectedClient).length === 0) {
            missingFields += "Client, ";
        }
        if (!productSelected && !servicesSelected) {
            missingFields += "Products or Services, ";
        }

        if (missingFields) {
            missingFields = missingFields.slice(0, -2) + '.';
            setErrorMessage(`Please select/add: ${missingFields}`);
            return false;
        }

        setAllGood(true);
        setErrorMessage('');
        await setVat();

        return true;
    };

    const setVat = () => {
        const countries = {
            ProviderCountry: selectedProvider.country,
            ProviderIsVatPayer: selectedProvider.vat ? true : false,
            ClientCountry: selectedClient.country,
            ClientIsVatPayer: selectedClient.vat ? true : false
        };
        return axios.post('/api/invoice', countries)
            .then(response => {
                setVatResponse(response.data);
            })
            .catch(error => console.error(error));
    }

    const generateInvoice = () => {
        handleInputChecking().then(result => {
            if (!result) return;
            setAllGood(false);
            setShowWindowPortal(true);
        })};

    const populateData = () => {
        if (!localStorage.getItem("providersClients")) {
            localStorage.setItem("providersClients", JSON.stringify({ providers: [], clients: [] }));
        }
        const providersClients = JSON.parse(localStorage.getItem("providersClients"));
        if (providersClients.providers.length) {
            setProviders(providersClients.providers);
            setLoadingProviders(false);
        }
        if (providersClients.clients.length) {
            setClients(providersClients.clients);
            setLoadingClients(false);
        }

        if (!localStorage.getItem("goodsServices")) {
            localStorage.setItem("goodsServices", JSON.stringify({ products: [], services: [] }));
        }
        const goodsServices = JSON.parse(localStorage.getItem("goodsServices"));
        if (goodsServices.products.length) {
            const productsWithDefaultFinal = goodsServices.products.map(p => {
                return { ...p, quantity: 0, final: 0 };
            });
            setProducts(productsWithDefaultFinal);
            setLoadingProducts(false);
        }
        if (goodsServices.services.length) {
            const servicesWithDefaultFinal = goodsServices.services.map(s => {
                return { ...s, quantity: 0, final: 0 };
            });
            setServices(servicesWithDefaultFinal);
            setLoadingServices(false);
        }
    }

    return (
        <>
            <div className="mb-5">
                <select onChange={(e) => handleSelection(e, "provider")}
                    id="provider" name="provider" className="form-control" defaultValue="">
                    <option value="" disabled >
                        --- Select Provider ---
                    </option>
                    {providers.map((provider, index) => (
                        <option key={index + 1} value={index + 1}>
                            {provider.fullName}, VAT: {provider.vat}
                        </option>
                    ))}

                </select>
            </div>

            <div className="mb-5">
                <select onChange={(e) => handleSelection(e, "client")}
                    id="client" name="client" className="form-control" defaultValue="">
                    <option value="" disabled >
                        --- Select Client ---
                    </option>
                    {clients.map((client, index) => (
                        <option key={index + 1} value={index + 1}>
                            {client.fullName}, ID: {client.id}, VAT: {client.vat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-5">
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>Products</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Price/Unit</th>
                            <th>Final(Eu)</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {products.map((product, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <input type="number"
                                            min="0" step="1" value={product.quantity}
                                            onChange={(e) => handleQuantityChange(e, "products", index)}
                                            style={{ maxWidth: "50px" }} />
                                    </td>
                                    <td style={numbersCenterStyle}>{product.price}</td>
                                    <td style={numbersCenterStyle}>{product.final}</td>
                                </tr>
                                {product.discount ? (
                                    <tr style={discountStyle}>
                                        <td colSpan="4">Discount for product "{product.name}"</td>
                                        <td style={numbersCenterStyle} >-{product.discount}%</td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </tbody>
                    <thead className="table-dark">
                        <tr>
                            <th>Services</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Price/Unit</th>
                            <th>Final(Eu)</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {services.map((service, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>
                                        <input type="number" min="0" step="1" value={service.quantity}
                                            onChange={(e) => handleQuantityChange(e, "services", index)}
                                            style={{ maxWidth: "50px" }} />
                                    </td>
                                    <td style={numbersCenterStyle}>{service.price}</td>
                                    <td style={numbersCenterStyle}>{service.final}</td>
                                </tr>
                                {service.discount ? (
                                    <tr style={discountStyle}>
                                        <td colSpan="4">Discount for service "{service.name}"</td>
                                        <td style={numbersCenterStyle} >-{service.discount}%</td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </tbody>
                    <tfoot className="table-light">
                        <tr>
                            <td style={totalTextStyle} colSpan="4">Total</td>
                            <td style={totalPriceStyle}>{totalPrice}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {errorMessage ? (<div className="mb-3 text-center errorMessage">{errorMessage}</div>) : null}
            <div className="mb-5 text-center">
                <button onClick={generateInvoice}
                    disabled={allGood}
                    className="btn btn-warning fw-bold form-control">
                    {allGood ? 'Generating.. Please wait' : 'Generate Invoice'}
                </button>
            </div>
            {showWindowPortal ? (
                <Window setShowWindowPortal={setShowWindowPortal}>
                    <Invoice
                        selectedProvider={selectedProvider}
                        selectedClient={selectedClient}
                        vatResponse={vatResponse}
                        selectedProducts={selectedProducts}
                        selectedServices={selectedServices}
                        totalPrice={totalPrice}
                    />
                </Window>
            ) : null}
    </>)
}

export default InvoiceGenerator;
