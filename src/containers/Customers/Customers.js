import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import * as actions from '../Customers/actions';
import selectors from '../Customers/selectors';

class Customers extends Component {
    constructor(props) {
        super(props);
        const {
            fetchCustomers
        } = this.props;
        fetchCustomers();
    }
    addCustomer = (e) => {
        e.preventDefault();
        const {
            customersFormFields,
            addCustomer
        } = this.props;
        if (customersFormFields.name.length !== 0 && customersFormFields.address.length !== 0 && customersFormFields.phone.length !== 0) {
            const dataToPost ={
                name: customersFormFields.name,
                address: customersFormFields.address,
                phone: customersFormFields.phone
            };
            addCustomer(dataToPost);
        }
    };
    deleteCustomer = (id) => e => {
        e.preventDefault();
        const {
            deleteCustomer
        } = this.props;
        deleteCustomer(id);
    };
    edit = field => e => {
        const {
            editField
        } = this.props;
        editField(field, e.target.value);
    };
    render() {
        const {
            customersList,
            customersFormFields
        } = this.props;
        const customersToShow = Object.keys(customersList).map((keys, index) => (
            <tr key={`customer__${index}`}>
                <td>{customersList[keys].id}</td>
                <td>{customersList[keys].name}</td>
                <td>{customersList[keys].address}</td>
                <td>{customersList[keys].phone}</td>
                <td><button className="btn btn-danger" onClick={this.deleteCustomer(customersList[keys].id)}>Delete</button></td>
            </tr>
        ));
        return (
            <div>
                <Header />
                <div className="main__wrap">
                    <div className="product__add__form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" placeholder="Name" id="name" onChange={this.edit('name')} value={customersFormFields.name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" className="form-control" id="address" placeholder="Address" onChange={this.edit('address')} value={customersFormFields.address}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" className="form-control" id="phone" placeholder="Phone" onChange={this.edit('phone')} value={customersFormFields.phone}/>
                            </div>
                            <button className="btn btn-success" onClick={this.addCustomer}>Add</button>
                        </form>
                    </div>
                    {
                        customersToShow.length === 0
                            ?
                            <div style={{'textAlign': 'center'}}>No items here. Create one!</div>
                            :
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                </tr>
                                </thead>
                                <tbody>
                                  { customersToShow }
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        )
    }
}
export default connect(selectors, actions)(Customers);
