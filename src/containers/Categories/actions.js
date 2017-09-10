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
export const addCategory = jsonToPost => {
    return dispatch => {
        localStorage.setItem('CategoriesList', JSON.stringify(jsonToPost));
        dispatch({
            type: 'POST_CATEGORY_SUCCESS',
            returnData: jsonToPost
        })
    }
};
export const deleteCategory = jsonToPost => {
    return dispatch => {
        localStorage.setItem('CategoriesList',  JSON.stringify(jsonToPost));
        dispatch({
            type: 'DELETE_CATEGORY_SUCCESS',
            returnData: jsonToPost
        })
    }
};
export const editCategory = jsonToPut => {
    return dispatch => {
        localStorage.setItem('CategoriesList', JSON.stringify(jsonToPut));
        dispatch({
            type: 'PUT_CATEGORY_SUCCESS',
            returnData: jsonToPut
        })
    }
};
export const takeToEditCategory = json => {
    return {
        type: 'TAKE_TO_EDIT_CATEGORY',
        json
    }
};
export const cancelEditCategory = () => {
    return {
        type: 'CANCEL_EDIT_CATEGORY'
    }
};
export const editField = (field, value) => {
    return {
        type: 'EDIT_FIELD_CATEGORY',
        field,
        value
    }
};
