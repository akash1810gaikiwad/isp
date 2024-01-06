import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    currentRouteKey: '',
    showbox: false,
    editData: [],
}

export const commonSlice = createSlice({
    name: 'base/common',
    initialState,
    reducers: {
        setCurrentRouteKey: (state, action) => {
            state.currentRouteKey = action.payload
        },
        setShowbox: (state, action) => {
            state.showbox = action.payload
        },
        setEditData: (state, action) => {
            state.editData = action.payload
        },
    },
})

export const { setCurrentRouteKey, setShowbox, setEditData } =
    commonSlice.actions

export default commonSlice.reducer
