export const fetchSpending = () => {
    return dispatch => {
        if (!localStorage.getItem('SpendingList')) {
            dispatch({
                type: 'FETCH_SPENDING_FAIL'
            })
        }
        else {
            dispatch({
                type: 'FETCH_SPENDING_SUCCESS',
                data: JSON.parse(localStorage.getItem('SpendingList'))
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
export const addSpending = jsonToPost => {
    return dispatch => {
        localStorage.setItem('SpendingList', JSON.stringify(jsonToPost));
        dispatch({
            type: 'POST_SPENDING_SUCCESS',
            returnData: jsonToPost
        })
    }
};
export const deleteSpending = jsonToPost => {
    return dispatch => {
        localStorage.setItem('SpendingList',  JSON.stringify(jsonToPost));
        dispatch({
            type: 'DELETE_SPENDING_SUCCESS',
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
        type: 'EDIT_FIELD_SPENDING',
        field,
        value
    }
};
export const editSpending = jsonToPut => {
    return dispatch => {
        localStorage.setItem('SpendingList', JSON.stringify(jsonToPut));
        dispatch({
            type: 'PUT_SPENDING_SUCCESS',
            returnData: jsonToPut
        })
    }
};
export const takeToEditSpending = json => {
    return {
        type: 'TAKE_TO_EDIT_SPENDING',
        json
    }
};
export const cancelEditSpending = () => {
    return {
        type: 'CANCEL_EDIT_SPENDING'
    }
};