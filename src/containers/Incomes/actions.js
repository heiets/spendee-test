export const fetchIncomes = () => {
    return dispatch => {
        if (!localStorage.getItem('IncomesList')) {
            dispatch({
                type: 'FETCH_INCOMES_FAIL'
            })
        }
        else {
            dispatch({
                type: 'FETCH_INCOMES_SUCCESS',
                data: JSON.parse(localStorage.getItem('IncomesList'))
            })
        }
    }
};
export const addIncome = (jsonToPost) => {
    return dispatch => {
        localStorage.setItem('IncomesList', JSON.stringify(jsonToPost));
        dispatch({
            type: 'POST_INCOME_SUCCESS',
            returnData: jsonToPost
        })
    }
};
export const deleteIncome = (jsonToPost) => {
    return dispatch => {
        localStorage.setItem('IncomesList',  JSON.stringify(jsonToPost));
        dispatch({
            type: 'DELETE_INCOME_SUCCESS',
            returnData: jsonToPost
        })
    }
};
export const editField = (field, value) => {
    return {
        type: 'EDIT_FIELD_INCOME',
        field,
        value
    }
};
