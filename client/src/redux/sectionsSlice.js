import {createSlice} from '@reduxjs/toolkit'

export const fetchSections = () => {
    return async dispatch => {
        const response = await fetch(
            'api/catalog/sections',
            {
                method: 'GET',
            })
        const items = await response.json();
        dispatch(addSections(items))
    }
}

export const sectionsSlice = createSlice({
    name: 'sections',
    initialState: {
        items: []
    },
    reducers: {
        addSections: (state, action) => {
            state.items = action.payload
        },
    }
})

export default sectionsSlice.reducer
export const {addSections} = sectionsSlice.actions