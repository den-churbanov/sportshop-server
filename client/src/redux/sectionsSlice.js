import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {GET_SECTIONS} from './actionTypes'

export const fetchSections = createAsyncThunk(
    GET_SECTIONS,
    async (data, thunkAPI) => {
        const response = await fetch(
            'api/catalog/sections',
            {method:'GET',
                })
        const items = await response.json();
        return items
    }
)

export const sectionsSlice = createSlice({
    name: 'sections',
    initialState: {
        sections: [],
    },
    extraReducers:{
        [fetchSections.fulfilled]: (state, action) => {
            state.sections = action.payload
        }
    }
})

export default sectionsSlice.reducer