import { combineReducers } from 'redux';

const initialState = {
    incomesList: [
    ],
    categoriesList: [
    ],
    incomesFormFields: {
        category_name: '',
        amount: '',
        description: '',
        isNew: true
    }
};
const incomesList = (state = initialState.incomesList, action) => {
    switch (action.type) {
        case 'FETCH_INCOMES_SUCCESS':
            const newIncomes = Object.keys(action.data).reduce((prev, curr) => ({
                ...prev,
                [action.data[curr].id]: {
                    ...action.data[curr]
                }
            }), {});
            return newIncomes;
        case 'POST_INCOME_SUCCESS':
            return action.returnData;
        case 'PUT_INCOME_SUCCESS':
            return action.returnData;
        case 'DELETE_INCOME_SUCCESS':
            return action.returnData;
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
const incomesFormFields = (state = initialState.incomesFormFields, action) => {
    switch (action.type) {
        case 'SELECT_CATEGORY':
            return {
                ...state,
                category_name: action.category_name
            };
        case 'EDIT_FIELD_INCOME':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'TAKE_TO_EDIT_INCOME':
            return {
                ...state,
                id: action.json.id,
                amount: action.json.amount,
                description: action.json.description,
                category_name: action.json.category,
                isNew: false
            };
        case 'PUT_INCOME_SUCCESS':
            return {
                name: '',
                isNew: true
            };
        case 'CANCEL_EDIT_INCOME':
            return {
                name: '',
                isNew: true
            };
        case 'POST_INCOME_SUCCESS':
            return {
                amount: '',
                description: '',
                isNew: true
            };
        default:
            return state;
    }
};

export default combineReducers({
    incomesList,
    categoriesList,
    incomesFormFields
})
