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
export const fetchCategories = () => {
    return dispatch => {
        if (!localStorage.getItem('CategoriesList')) {
            dispatch({
                type: 'FETCH_CATEGORIES_FAIL'
            })
        }
        else {
            dispatch({
                type: 'FETCH_CATEGORIES_SUCCESS',
                data: JSON.parse(localStorage.getItem('CategoriesList'))
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
export const selectCategory = category_name => {
    return {
        type: 'SELECT_CATEGORY',
        category_name
    }
};
export const editField = (field, value) => {
    return {
        type: 'EDIT_FIELD_INCOME',
        field,
        value
    }
};
export const editIncome = jsonToPut => {
    return dispatch => {
        localStorage.setItem('IncomesList', JSON.stringify(jsonToPut));
        dispatch({
            type: 'PUT_INCOME_SUCCESS',
            returnData: jsonToPut
        })
    }
};
export const takeToEditIncome = json => {
    return {
        type: 'TAKE_TO_EDIT_INCOME',
        json
    }
};
export const cancelEditIncome = () => {
    return {
        type: 'CANCEL_EDIT_INCOME'
    }
};
