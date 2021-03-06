import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Header from '../../components/Header';
import * as actions from '../Spending/actions';
import selectors from '../Spending/selectors';

class Spending extends Component {
    constructor(props) {
        super(props);
        const {
            fetchSpending,
            fetchCategories
        } = this.props;
        fetchSpending();
        fetchCategories();
    }
    selectCategory = () => e => {
        const {
            selectCategory
        } = this.props;
        selectCategory(e.value);
    };
    addSpending = (e) => {
        e.preventDefault();
        const {
            spendingFormFields,
            spendingList,
            addSpending
        } = this.props;
        let id;
        const size = 1000;
        if (spendingFormFields.amount.length !== 0 && spendingFormFields.description.length !== 0) {
            if (spendingList.length !== 0) {
                while (!id) {
                    const randomNumber = Math.floor(Math.random() * size);
                    if (Object.keys(spendingList).every(v=>+v!==randomNumber)) {
                        id = randomNumber;
                    }
                }
            }
            else {
                id = 1;
            }
            const newItem = {
                id,
                amount: spendingFormFields.amount,
                description: spendingFormFields.description,
                date: moment().format('lll')
            };
            if (spendingFormFields.category_name) {
                newItem.category = spendingFormFields.category_name;
            }
            const dataToPost = {
                ...spendingList,
                [id]: newItem
            };
            addSpending(dataToPost);
        }
    };
    editSpending = e => {
        e.preventDefault();
        const {
            spendingFormFields,
            spendingList,
            editSpending
        } = this.props;
        if (spendingFormFields.amount.length !== 0 && spendingFormFields.description.length !== 0) {
            const newItem = {
                id: spendingFormFields.id,
                amount: spendingFormFields.amount,
                description: spendingFormFields.description,
                category: spendingFormFields.category_name,
                date: moment().format('lll')
            };
            const dataToPut = {
                ...spendingList,
                [spendingFormFields.id]: newItem
            };
            editSpending(dataToPut);
        }
    };
    cancelEditSpending =  e => {
        e.preventDefault();
        const {
            cancelEditSpending
        } = this.props;
        cancelEditSpending();
    };
    takeToEditSpending = id => e => {
        e.preventDefault();
        const {
            spendingList,
            takeToEditSpending
        } = this.props;
        takeToEditSpending(spendingList[id]);
    };
    deleteSpending = id => e => {
        e.preventDefault();
        const {
            spendingList,
            deleteSpending
        } = this.props;
        let dataToPost = {
            ...spendingList
        };
        delete dataToPost[id];
        deleteSpending(dataToPost);
    };
    edit = field => e => {
        const {
            editField
        } = this.props;
        editField(field, e.target.value);
    };
    render() {
        const {
            spendingList,
            categoriesList,
            spendingFormFields
        } = this.props;
        const spendingToShow = spendingList && Object.keys(spendingList).map((keys, index) => (
            <tr key={`spending__${index}`}>
                <td>{index+1}</td>
                <td>{spendingList[keys].amount}</td>
                <td>{spendingList[keys].description}</td>
                <td>{spendingList[keys].category}</td>
                <td>{spendingList[keys].date}</td>
                <td><button className="btn btn-warning" onClick={this.takeToEditSpending(spendingList[keys].id)}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={this.deleteSpending(spendingList[keys].id)}>Delete</button></td>
            </tr>
        ));
        return (
            <div>
                <Header />
                <div className="main__wrap">
                    <div className="spending__add__form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="amount">Amount:</label>
                                <input type="number" className="form-control" placeholder="Amount" id="amount" onChange={this.edit('amount')} value={spendingFormFields.amount}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Description:</label>
                                <input type="text" className="form-control" id="description" placeholder="Description" onChange={this.edit('description')} value={spendingFormFields.description}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sel1">Category:</label>
                                <Select
                                    name="form-field-name"
                                    options={categoriesList}
                                    onChange={this.selectCategory()}
                                    value={spendingFormFields.category_name}
                                    clearable={false}
                                />
                            </div>
                            {
                                spendingFormFields.isNew
                                    ?
                                    <button className="btn btn-success" onClick={this.addSpending}>Add</button>
                                    :
                                    <div>
                                        <button className="btn btn-warning" onClick={this.editSpending}>Edit</button>
                                        <button className="btn btn-default" onClick={this.cancelEditSpending}>Cancel</button>
                                    </div>
                            }
                        </form>
                    </div>
                    {
                        spendingToShow.length === 0
                            ?
                            <div style={{'textAlign': 'center'}}>No items here. Create one!</div>
                            :
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Amount</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                { spendingToShow }
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        )
    }
}
export default connect(selectors, actions)(Spending);
