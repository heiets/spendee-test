import { combineReducers } from 'redux';

const initialState = {
    categoriesList: [
    ],
    categoriesFormFields: {
        name: '',
        isNew: true
    }
};
const categoriesList = (state = initialState.categoriesList, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORIES_SUCCESS':
            const newCategories = Object.keys(action.data).reduce((prev, curr) => ({
                ...prev,
                [action.data[curr].id]: {
                    ...action.data[curr]
                }
            }), {});
            return newCategories;
        case 'POST_CATEGORY_SUCCESS':
            return action.returnData;
        case 'PUT_CATEGORY_SUCCESS':
            return action.returnData;
        case 'DELETE_CATEGORY_SUCCESS':
            return action.returnData;
        default:
            return state;
    }
};
const categoriesFormFields = (state = initialState.categoriesFormFields, action) => {
    switch (action.type) {
        case 'EDIT_FIELD_CATEGORY':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'TAKE_TO_EDIT_CATEGORY':
            return {
                ...state,
                id: action.json.id,
                name: action.json.name,
                isNew: false
            };
        case 'PUT_CATEGORY_SUCCESS':
            return {
                name: '',
                isNew: true
            };
        case 'CANCEL_EDIT_CATEGORY':
            return {
                name: '',
                isNew: true
            };
        case 'POST_CATEGORY_SUCCESS':
            return {
                name: '',
                isNew: true
            };
        default:
            return state;
    }
};

export default combineReducers({
    categoriesList,
    categoriesFormFields
})
