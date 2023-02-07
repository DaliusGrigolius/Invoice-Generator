import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { formatCamelCase, modalStyles } from './functions/GoodsServicesFunctions';
import { numberFields } from './functions/ProviderClientFunctions';

Modal.setAppElement('#root');

const ProviderClient = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formType, setFormType] = useState('provider');
    const [showModal, setShowModal] = useState(false);
    const [provider, setProvider] = useState({
        fullName: '',
        address: '',
        phone: '',
        email: '',
        companyCode: '',
        vat: '',
        country: ''
    });
    const [client, setClient] = useState({
        fullName: '',
        address: '',
        phone: '',
        email: '',
        companyCode: '',
        vat: '',
        id: '',
        country: ''
    });

    useEffect(() => {
        populateCountriesData();
    }, []);

    const populateCountriesData = async () => {
        try {
            const response = await fetch("api/country");
            const data = await response.json();
            const dataSorted = data.sort((a, b) => a.name.localeCompare(b.name));
            setCountries(dataSorted);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        if (formType === "provider") {
            setProvider({ ...provider, [name]: value });
        } else if (formType === "client") {
            setClient({ ...client, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!localStorage.getItem("providersClients")) {
            localStorage.setItem("providersClients", JSON.stringify({ providers: [], clients: [] }));
        }
        let providersClients = JSON.parse(localStorage.getItem("providersClients"));
        if (formType === "provider") {
            providersClients.providers.push({ ...provider });
            resetProvider();
        } else if (formType === "client") {
            providersClients.clients.push({ ...client });
            resetClient();
        }
        localStorage.setItem("providersClients", JSON.stringify(providersClients));
        document.getElementById("providerClientForm").reset();
        setShowModal(true);
    };

    const resetProvider = () => {
        setProvider({
            fullName: '',
            address: '',
            phone: '',
            email: '',
            companyCode: '',
            vat: '',
            country: ''
        });
    };

    const resetClient = () => {
        setClient({
            fullName: '',
            address: '',
            phone: '',
            email: '',
            companyCode: '',
            vat: '',
            id: '',
            country: ''
        });
    };

    const handleFormTypeChange = (e) => {
        setFormType(e.target.value);
    };

    let formFields;
    let submitButtonText;

    if (formType === "provider") {
        submitButtonText = "Add Service Provider";
    } else if (formType === "client") {
        submitButtonText = "Add Client";
    }

    let contents = loading ? <p><em>Loading...</em></p>
        : (
            <select onChange={handleChange} defaultValue={countries[0]}
                id="country" name="country" className="form-control">
                {Object.entries(countries).map(([key, val]) =>
                    <option key={key} value={val.name}>
                        {val.name} ({val.region})
                    </option>
                )}
            </select>
        );

    switch (formType) {
        case "provider":
            formFields =
                Object.keys(provider).map((key, index) => (
                    <div key={index} className="form-group mb-3">
                        <label htmlFor={key}>{formatCamelCase(key)}</label>
                        {key === 'country' ? contents :
                            <input
                                type={key === 'phone' ? "phone" : numberFields.includes(key) ? "number" : "text"}
                                id={key}
                                name={key}
                                value={formType[key] === '' ? '' : formType[key]}
                                onChange={handleChange}
                                className="form-control"
                                placeholder={"Enter " + formatCamelCase(key)}
                                required={key !== 'vat' ? true : false}
                            />}
                    </div>
                ))
            break;
        case "client":
            formFields =
                Object.keys(client).map((key, index) => (
                    <div key={index} className="form-group mb-3">
                        <label htmlFor={key}>{formatCamelCase(key)}</label>
                        {key === 'country' ? contents :
                            <input
                                type={numberFields.includes(key) ? "number" : "text"}
                                id={key}
                                name={key}
                                value={formType[key] === '' ? '' : formType[key]}
                                onChange={handleChange}
                                className="form-control"
                                placeholder={"Enter " + formatCamelCase(key)}
                                required={key === 'fullName' || key === 'address'}
                            />}
                    </div>
                ))
            break;
        default:
            formFields = null;
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} id="providerClientForm">
                    <div className="form-group mb-3">
                        <label htmlFor="formType">Select Form Type</label>
                        <select id="formType" name="formType" onChange={handleFormTypeChange}
                            className="form-control customFormSelection">
                            <option value="provider">Service Provider Form</option>
                            <option value="client">Client Form</option>
                        </select>
                    </div>
                    {formFields}
                    <button type="submit" className="btn btn-warning fw-bold form-control">{submitButtonText}</button>
                </form>
            </div>
            <Modal isOpen={showModal} style={modalStyles} contentLabel="Operation message" onRequestClose={() => setShowModal(false)}>
                <h2>Success! {formType === 'provider' ? "Provider" : "Client"} added.</h2>
                <button className="btn btn-warning fw-bold" onClick={() => setShowModal(false)}>Ok</button>
            </Modal>
        </>
    )
}
export default ProviderClient;
