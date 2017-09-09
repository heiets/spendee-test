import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';

import Header from '../../components/Header';
import * as actions from '../InvoiceCreate/actions';
import selectors from '../InvoiceCreate/selectors';
import 'react-select/dist/react-select.css';

class InvoiceCreate extends Component {
    constructor(props) {
        super(props);
        const {
            fetchCustomers,
            fetchProducts
        } = this.props;
        fetchCustomers();
        fetchProducts();
    }
    selectCustomer = () => e => {
        const {
            selectCustomer
        } = this.props;
        const customer = {
            customer_id: e.id,
            customer_name: e.value
        };
        selectCustomer(customer);
    };
    editQuantity = id => e => {
        const {
            editQuantity
        } = this.props;
        editQuantity(id, e.target.value);
    };
    deleteQuantity = id => () => {
        const {
            editQuantity,
            invoiceCreateProductsList
        } = this.props;
        const oldQuantity = invoiceCreateProductsList[id].quantity;
        oldQuantity === 0
            ?
            editQuantity(id, 0)
            :
            editQuantity(id, oldQuantity-1);
    };
    addQuantity = id => () => {
        const {
            editQuantity,
            invoiceCreateProductsList
        } = this.props;
        const oldQuantity = invoiceCreateProductsList[id].quantity;
        oldQuantity === 0
            ?
            editQuantity(id, 1)
            :
            editQuantity(id, oldQuantity+1);
    };
    edit = field => e => {
        const {
            editField
        } = this.props;
        editField(field, e.target.value);
    };
    addInvoice = (e) => {
        e.preventDefault();
        const {
            addInvoice,
            invoiceCreateFormFields
        } = this.props;
        const dataToPost ={
            customer_id: invoiceCreateFormFields.customer.customer_id,
            discount: invoiceCreateFormFields.discount,
            total: +this.refs.totalPrice.innerHTML
        };
        addInvoice(dataToPost);
    };
    render() {
        const {
            invoiceCreateProductsList,
            invoiceCreateCustomersList,
            invoiceCreateFormFields
        } = this.props;
        const CustomersList = Object.keys(invoiceCreateCustomersList).map(keys => ({
                id: invoiceCreateCustomersList[keys].id,
                value: invoiceCreateCustomersList[keys].name,
                label: invoiceCreateCustomersList[keys].name
        }));
        const totalPrice = Object.keys(invoiceCreateProductsList).reduce((prev, curr) => (
            prev+invoiceCreateProductsList[curr].total
        ), 0) * ((100-(+invoiceCreateFormFields.discount))/100);
        const ProductsList = Object.keys(invoiceCreateProductsList).map((keys, index) => (
            <div key={`product__${index}`} className="form__2">
                <div className="text">
                {invoiceCreateProductsList[keys].name} <strong>{invoiceCreateProductsList[keys].price}</strong>
                </div>
                <div className="input-group quantity">
                    <span className="input-group-addon custom__buttons" onClick={this.deleteQuantity(invoiceCreateProductsList[keys].id)}>-</span>
                    <input id="msg" type="number"
                           className="form-control"
                           name="msg"
                           placeholder="Quantity"
                           value={invoiceCreateProductsList[keys].quantity}
                           style={{'textAlign': 'center'}}
                           onChange={this.editQuantity(invoiceCreateProductsList[keys].id)}/>
                    <span className="input-group-addon custom__buttons" onClick={this.addQuantity(invoiceCreateProductsList[keys].id)}>+</span>
                </div>
            </div>
        ));
        return (
            <div>
                <Header />
                <div className="main__wrap">
                    {
                        <div className="product__add__form">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="sel1">Customers list:</label>
                                    <Select
                                        name="form-field-name"
                                        options={CustomersList}
                                        onChange={this.selectCustomer()}
                                        value={invoiceCreateFormFields.customer.customer_name}
                                        clearable={false}
                                    />
                                </div>
                                <details>
                                    <summary>Details</summary>
                                    {
                                        ProductsList
                                    }
                                </details>
                                <div className="form__2">
                                    <div className="text">
                                        <label htmlFor="Discount">Discount:</label>
                                    </div>
                                    <div className="input-group quantity">
                                        <input type="number" className="form-control"
                                               placeholder="Discount"
                                               id="Discount"
                                               onChange={this.edit('discount')}
                                               value={invoiceCreateFormFields.discount}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <strong>
                                        Total:
                                    </strong>
                                    <span ref="totalPrice">
                                        {
                                            totalPrice.toFixed(2)
                                        }
                                    </span>
                                    $
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-success"
                                        onClick={this.addInvoice}
                                        disabled={!invoiceCreateFormFields.customer.customer_id || totalPrice < '0.01'}
                                    >Create</button>
                                </div>
                                {/*<div className="form-group">*/}
                                    {/*<label htmlFor="price">Price:</label>*/}
                                    {/*<input type="number" className="form-control" id="price" placeholder="Price" onChange={this.edit('price')} value={productsFormFields.price}/>*/}
                                {/*</div>*/}
                                {/*<button className="btn btn-success" onClick={this.addProduct}>Add</button>*/}
                            </form>
                        </div>
                        }
                </div>
            </div>
        )
    }
}
export default connect(selectors, actions)(InvoiceCreate);
