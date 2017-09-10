import { combineReducers } from 'redux';

const initialState = {
    spendingList: [
    ],
    categoriesList: [
    ],
    spendingFormFields: {
        category_name: '',
        amount: '',
        description: '',
        isNew: true
    }
};
const spendingList = (state = initialState.spendingList, action) => {
    switch (action.type) {
        case 'FETCH_SPENDING_SUCCESS':
            const newSpending = Object.keys(action.data).reduce((prev, curr) => ({
                ...prev,
                [action.data[curr].id]: {
                    ...action.data[curr]
                }
            }), {});
            return newSpending;
        case 'POST_SPENDING_SUCCESS':
            return action.returnData;
        case 'PUT_SPENDING_SUCCESS':
            return action.returnData;
        case 'DELETE_SPENDING_SUCCESS':
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
const spendingFormFields = (state = initialState.spendingFormFields, action) => {
    switch (action.type) {
        case 'SELECT_CATEGORY':
            return {
                ...state,
                category_name: action.category_name
            };
        case 'EDIT_FIELD_SPENDING':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'TAKE_TO_EDIT_SPENDING':
            return {
                ...state,
                id: action.json.id,
                amount: action.json.amount,
                description: action.json.description,
                category_name: action.json.category,
                isNew: false
            };
        case 'PUT_SPENDING_SUCCESS':
            return {
                name: '',
                isNew: true
            };
        case 'CANCEL_EDIT_SPENDING':
            return {
                name: '',
                isNew: true
            };
        case 'POST_SPENDING_SUCCESS':
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
    spendingList,
    categoriesList,
    spendingFormFields
})
