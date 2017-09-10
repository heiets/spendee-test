import { combineReducers } from 'redux';

const initialState = {
    incomesList: [
    ],
    spendingList: [
    ],
    categoriesList: [
    ],
    selectedCategory: ''
};
const selectedCategory = (state = initialState.selectedCategory, action) => {
    switch (action.type) {
        case 'SELECT_CATEGORY':
            return action.category_name;
        default:
            return state;
    }
};
const incomesList = (state = initialState.incomesList, action) => {
    switch (action.type) {
        case 'FETCH_INCOMES_SUCCESS':
            let newIncomesArr = [];
            Object.keys(action.data).forEach(key=>(
                newIncomesArr.push({
                    label: action.data[key].date,
                    value: action.data[key].amount,
                    category: action.data[key].category
                })
            ));
            return newIncomesArr;
        default:
            return state;
    }
};
const spendingList = (state = initialState.spendingList, action) => {
    switch (action.type) {
        case 'FETCH_SPENDING_SUCCESS':
            let newSpendingArr = [];
            Object.keys(action.data).forEach(key=>(
                newSpendingArr.push({
                    label: action.data[key].date,
                    value: action.data[key].amount,
                    category: action.data[key].category
                })
            ));
            return newSpendingArr;
        default:
            return state;
    }
};
const categoriesList = (state = initialState.categoriesList, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORIES_SUCCESS':
            let newCategoriesArr = [];
            Object.keys(action.data).forEach(key=>(
                newCategoriesArr.push({
                    label: action.data[key].name,
                    value: action.data[key].name
                })
            ));
            return newCategoriesArr;
        default:
            return state;
    }
};

export default combineReducers({
    selectedCategory,
    incomesList,
    spendingList,
    categoriesList
})
