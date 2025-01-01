import { createSlice } from "@reduxjs/toolkit";
import { Collapse } from "antd";

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false
    },
    reducer: {
        collapse: state => {
            state.isCollapse = !state.isCollapse
        }
    }
})

export const {collapseMenu} = tabSlice.actions
export default tabSlice.reducer