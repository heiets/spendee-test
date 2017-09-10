import React, { Component } from 'react';
import { connect } from 'react-redux';

import fusioncharts from 'fusioncharts';
// Load the charts module
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Header from '../../components/Header';
import * as actions from '../Main/actions';
import selectors from '../Main/selectors';

class Main extends Component {
    constructor(props) {
        super(props);
        const {
            fetchIncomes,
            fetchSpending,
            fetchCategories
        } = this.props;
        fetchIncomes();
        fetchSpending();
        fetchCategories();
        charts(fusioncharts);
    }
    selectCategory = () => e => {
        const {
            selectCategory
        } = this.props;
        selectCategory(e.value);
    };
    render() {
        const {
            selectedCategory,
            incomesList,
            spendingList,
            categoriesList
        } = this.props;
        const incomesDataSource = {
            chart: {
                caption: 'Incomes',
                theme: 'ocean'
            },
            data: selectedCategory
                ? incomesList.filter(v=>v.category === selectedCategory)
                : incomesList
        };
        const spendingDataSource = {
            chart: {
                caption: 'Spending',
                theme: 'ocean'
            },
            data: selectedCategory
                ? spendingList.filter(v=>v.category === selectedCategory)
                : spendingList
        };

        const incomesConfig = {
            type: 'column2d',
            width:600,
            height: 400,
            dataFormat: 'json',
            dataSource: incomesDataSource
        };
        const spendingConfig = {
            type: 'column2d',
            width:600,
            height: 400,
            dataFormat: 'json',
            dataSource: spendingDataSource
        };
        return (
            <div>
                <Header />
                <div className="main__wrap">
                    <div className="form-group" style={{'width': '600px'}}>
                        <label htmlFor="sel1">Category:</label>
                        <Select
                            name="form-field-name"
                            options={categoriesList}
                            onChange={this.selectCategory()}
                            value={selectedCategory}
                            clearable={false}
                        />
                    </div>
                    <div className="form-group" style={{'display': 'flex'}}>
                        <ReactFC {...incomesConfig} />
                        <ReactFC {...spendingConfig} />
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(selectors, actions)(Main);
