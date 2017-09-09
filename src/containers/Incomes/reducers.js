import { combineReducers } from 'redux';

const initialState = {
    incomesList: [
    ],
    incomesFormFields: {
        amount: '',
        description: ''
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
        case 'DELETE_INCOME_SUCCESS':
            return action.returnData;
        default:
            return state;
    }
};
const incomesFormFields = (state = initialState.incomesFormFields, action) => {
    switch (action.type) {
        case 'EDIT_FIELD_INCOME':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'POST_INCOME_SUCCESS':
            return {
                amount: '',
                description: ''
            };
        default:
            return state;
    }
};

export default combineReducers({
    incomesList,
    incomesFormFields
})
