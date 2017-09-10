import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Header from '../../components/Header';
import * as actions from '../Incomes/actions';
import selectors from '../Incomes/selectors';

class Incomes extends Component {
    constructor(props) {
        super(props);
        const {
            fetchIncomes,
            fetchCategories
        } = this.props;
        fetchIncomes();
        fetchCategories();
    }
    selectCategory = () => e => {
        const {
            selectCategory
        } = this.props;
        selectCategory(e.value);
    };
    addIncome = (e) => {
        e.preventDefault();
        const {
            incomesFormFields,
            incomesList,
            addIncome
        } = this.props;
        let id;
        const size = 1000;
        if (incomesFormFields.amount.length !== 0 && incomesFormFields.description.length !== 0) {
            if (incomesList.length !== 0) {
                while (!id) {
                    const randomNumber = Math.floor(Math.random() * size);
                    if (Object.keys(incomesList).every(v=>+v!==randomNumber)) {
                        id = randomNumber;
                    }
                }
            }
            else {
                id = 1;
            }
            const newItem = {
                id,
                amount: incomesFormFields.amount,
                description: incomesFormFields.description,
                date: moment().format('lll')
        };
            if (incomesFormFields.category_name) {
                newItem.category = incomesFormFields.category_name;
            }
            const dataToPost = {
                ...incomesList,
                [id]: newItem
            };
            addIncome(dataToPost);
        }
    };
    editIncome = e => {
        e.preventDefault();
        const {
            incomesFormFields,
            incomesList,
            editIncome
        } = this.props;
        if (incomesFormFields.amount.length !== 0 && incomesFormFields.description.length !== 0) {
            const newItem = {
                id: incomesFormFields.id,
                amount: incomesFormFields.amount,
                description: incomesFormFields.description,
                category: incomesFormFields.category_name,
                date: moment().format('lll')
            };
            const dataToPut = {
                ...incomesList,
                [incomesFormFields.id]: newItem
            };
            editIncome(dataToPut);
        }
    };
    cancelEditIncome =  e => {
        e.preventDefault();
        const {
            cancelEditIncome
        } = this.props;
        cancelEditIncome();
    };
    takeToEditIncome = id => e => {
        e.preventDefault();
        const {
            incomesList,
            takeToEditIncome
        } = this.props;
        takeToEditIncome(incomesList[id]);
    };
    deleteIncome = (id) => e => {
        e.preventDefault();
        const {
            incomesList,
            deleteIncome
        } = this.props;
        let dataToPost = {
            ...incomesList
        };
        delete dataToPost[id];
        deleteIncome(dataToPost);
    };
    edit = field => e => {
        const {
            editField
        } = this.props;
        editField(field, e.target.value);
    };
    render() {
        const {
            incomesList,
            categoriesList,
            incomesFormFields
        } = this.props;
        const incomesToShow = incomesList && Object.keys(incomesList).map((keys, index) => (
            <tr key={`income__${index}`}>
                <td>{index+1}</td>
                <td>{incomesList[keys].amount}</td>
                <td>{incomesList[keys].description}</td>
                <td>{incomesList[keys].category}</td>
                <td>{incomesList[keys].date}</td>
                <td><button className="btn btn-warning" onClick={this.takeToEditIncome(incomesList[keys].id)}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={this.deleteIncome(incomesList[keys].id)}>Delete</button></td>
            </tr>
        ));
        return (
            <div>
                <Header />
                <div className="main__wrap">
                    <div className="income__add__form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="amount">Amount:</label>
                                <input type="number" className="form-control" placeholder="Amount" id="amount" onChange={this.edit('amount')} value={incomesFormFields.amount}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Description:</label>
                                <input type="text" className="form-control" id="description" placeholder="Description" onChange={this.edit('description')} value={incomesFormFields.description}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sel1">Category:</label>
                                <Select
                                    name="form-field-name"
                                    options={categoriesList}
                                    onChange={this.selectCategory()}
                                    value={incomesFormFields.category_name}
                                    clearable={false}
                                />
                            </div>
                            {
                                incomesFormFields.isNew
                                    ?
                                    <button className="btn btn-success" onClick={this.addIncome}>Add</button>
                                    :
                                    <div>
                                        <button className="btn btn-warning" onClick={this.editIncome}>Edit</button>
                                        <button className="btn btn-default" onClick={this.cancelEditIncome}>Cancel</button>
                                    </div>
                            }
                        </form>
                    </div>
                    {
                        incomesToShow.length === 0
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
                                  { incomesToShow }
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        )
    }
}
export default connect(selectors, actions)(Incomes);
