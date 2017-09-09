import { combineReducers } from 'redux';

const initialState = {
    spendingList: [
    ],
    spendingFormFields: {
        amount: '',
        description: ''
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
        case 'DELETE_SPENDING_SUCCESS':
            return action.returnData;
        default:
            return state;
    }
};
const spendingFormFields = (state = initialState.spendingFormFields, action) => {
    switch (action.type) {
        case 'EDIT_FIELD_SPENDING':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'POST_SPENDING_SUCCESS':
            return {
                amount: '',
                description: ''
            };
        default:
            return state;
    }
};

export default combineReducers({
    spendingList,
    spendingFormFields
})
