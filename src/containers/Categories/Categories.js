import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import * as actions from '../Categories/actions';
import selectors from '../Categories/selectors';

class Categories extends Component {
    constructor(props) {
        super(props);
        const {
            fetchCategories
        } = this.props;
        fetchCategories();
    }
    addCategory = (e) => {
        e.preventDefault();
        const {
            categoriesFormFields,
            categoriesList,
            addCategory
        } = this.props;
        let id;
        const size = 1000;
        if (categoriesFormFields.name.length !== 0) {
            if (categoriesList.length !== 0) {
                while (!id) {
                    const randomNumber = Math.floor(Math.random() * size);
                    if (Object.keys(categoriesList).every(v=>+v!==randomNumber)) {
                        id = randomNumber;
                    }
                }
            }
            else {
                id = 1;
            }
            const newItem = {
                id,
                name: categoriesFormFields.name
            };
            const dataToPost = {
                ...categoriesList,
                [id]: newItem
            };
            addCategory(dataToPost);
        }
    };
    editCategory = e => {
        e.preventDefault();
        const {
            categoriesFormFields,
            categoriesList,
            editCategory
        } = this.props;
        if (categoriesFormFields.name.length !== 0) {
            const newItem = {
                id: categoriesFormFields.id,
                name: categoriesFormFields.name
            };
            const dataToPut = {
                ...categoriesList,
                [categoriesFormFields.id]: newItem
            };
            editCategory(dataToPut);
        }
    };
    cancelEditCategory =  e => {
        e.preventDefault();
        const {
            cancelEditCategory
        } = this.props;
        cancelEditCategory();
    };
    takeToEditCategory = (id) => e => {
        e.preventDefault();
        const {
            categoriesList,
            takeToEditCategory
        } = this.props;
        takeToEditCategory(categoriesList[id]);
    };
    deleteCategory = (id) => e => {
        e.preventDefault();
        const {
            categoriesList,
            deleteCategory
        } = this.props;
        let dataToPost = {
            ...categoriesList
        };
        delete dataToPost[id];
        deleteCategory(dataToPost);
    };
    edit = field => e => {
        const {
            editField
        } = this.props;
        editField(field, e.target.value);
    };
    render() {
        const {
            categoriesList,
            categoriesFormFields
        } = this.props;
        const categoriesToShow = categoriesList && Object.keys(categoriesList).map((keys, index) => (
            <tr key={`category__${index}`}>
                <td>{index+1}</td>
                <td>{categoriesList[keys].name}</td>
                <td><button className="btn btn-warning" onClick={this.takeToEditCategory(categoriesList[keys].id)}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={this.deleteCategory(categoriesList[keys].id)}>Delete</button></td>
            </tr>
        ));
        return (
            <div>
                <Header />
                <div className="main__wrap">
                    <div className="category__add__form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" placeholder="Name" id="name" onChange={this.edit('name')} value={categoriesFormFields.name}/>
                            </div>
                            {
                                categoriesFormFields.isNew
                                    ?
                                    <button className="btn btn-success" onClick={this.addCategory}>Add</button>
                                    :
                                    <div>
                                        <button className="btn btn-warning" onClick={this.editCategory}>Edit</button>
                                        <button className="btn btn-default" onClick={this.cancelEditCategory}>Cancel</button>
                                    </div>
                            }
                        </form>
                    </div>
                    {
                        categoriesToShow.length === 0
                            ?
                            <div style={{'textAlign': 'center'}}>No items here. Create one!</div>
                            :
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                  { categoriesToShow }
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        )
    }
}
export default connect(selectors, actions)(Categories);
