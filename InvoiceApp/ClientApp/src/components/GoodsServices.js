import React, { useState } from 'react';
import Modal from 'react-modal';
import { formatCamelCase, numberFields, units, modalStyles } from './functions/GoodsServicesFunctions';

Modal.setAppElement('#root');

const GoodsServices = () => {
    const [formType, setFormType] = useState("product");
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        brand: '',
        color: '',
        height: 0,
        width: 0,
        weight: 0,
        volume: 0,
        size: '',
        unitsPerPackage: 0,
        discount: 0,
        description: ''
    });
    const [service, setService] = useState({
        name: '',
        price: 0,
        duration: '',
        description: '',
        plan: '',
        type: '',
        level: '',
        dateFrom: '',
        dateTo: '',
        discount: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (formType === "product") {
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value
            }));
        } else if (formType === "service") {
            setService(prevService => ({
                ...prevService,
                [name]: value
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!localStorage.getItem("goodsServices")) {
            localStorage.setItem("goodsServices", JSON.stringify({ products: [], services: [] }));
        }
        let goodsServices = JSON.parse(localStorage.getItem("goodsServices"));
        if (formType === "product") {
            goodsServices.products.push({ ...product });
            resetProducts();
        } else if (formType === "service") {
            goodsServices.services.push({ ...service });
            resetServices();
        }
        localStorage.setItem("goodsServices", JSON.stringify(goodsServices));
        document.getElementById("productServiceForm").reset();
        setShowModal(true);
    }

    const resetProducts = () => {
        setProduct({
            name: '',
            price: 0,
            brand: '',
            color: '',
            height: 0,
            width: 0,
            weight: 0,
            volume: 0,
            size: '',
            unitsPerPackage: 0,
            discount: 0,
            description: ''
        });
    }

    const resetServices = () => {
        setService({
            name: '',
            price: 0,
            duration: '',
            description: '',
            plan: '',
            type: '',
            level: '',
            dateFrom: '',
            dateTo: '',
            discount: 0
        });
    }

    const handleFormTypeChange = (e) => {
        setFormType(e.target.value);
    }

    let formFields;
    let submitButtonText;

    if (formType === "product") {
        submitButtonText = "Add Product";
    } else if (formType === "service") {
        submitButtonText = "Add Service";
    }

    switch (formType) {
        case "product":
            formFields =
                Object.keys(product).map((key, index) => (
                    <div key={index} className="form-group mb-3">
                        <label htmlFor={key}>{formatCamelCase(key)}{units[key]}</label>
                        <input
                            type={numberFields.includes(key) ? "number" : "text"}
                            id={key}
                            name={key}
                            value={formType[key]}
                            onChange={handleChange}
                            className="form-control"
                            placeholder={"Enter " + formatCamelCase(key)}
                        />
                    </div>
                ))
            break;
        case "service":
            formFields =
                Object.keys(service).map((key, index) => (
                    <div key={index} className="form-group mb-3">
                        <label htmlFor={key}>{formatCamelCase(key)}{units[key]}</label>
                        <input
                            type={key === "dateFrom" || key === "dateTo" ? "date" : numberFields.includes(key) ? "number" : "text"}
                            id={key}
                            name={key}
                            value={formType[key]}
                            onChange={handleChange}
                            className="form-control"
                            placeholder={key === "dateFrom" || key === "dateTo" ? "Select " + formatCamelCase(key) : "Enter " + formatCamelCase(key)}
                        />
                    </div>
                ))
            break;
        default:
            formFields = null;
    }

    return (
        <>
            <div className="mb-5">
                <form onSubmit={handleSubmit} id="productServiceForm">
                    <div className="form-group mb-3">
                        <label htmlFor="formType">Select Form Type</label>
                        <select id="formType" name="formType" onChange={handleFormTypeChange} className="form-control customFormSelection">
                            <option value="product">Product Form</option>
                            <option value="service">Service Form</option>
                        </select>
                    </div>
                    {formFields}
                    <button type="submit" className="btn btn-warning fw-bold form-control">{submitButtonText}</button>
                </form>
            </div>
            <Modal isOpen={showModal} style={modalStyles} contentLabel="Operation message" onRequestClose={() => setShowModal(false)}>
                <h2>Success! {formType === 'product' ? "Product" : "Service"} added.</h2>
                <button className="btn btn-warning fw-bold form-control" onClick={() => setShowModal(false)}>Ok</button>
            </Modal>
        </>
    );
}

export default GoodsServices;