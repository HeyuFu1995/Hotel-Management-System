import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark-mode" : "light-mode",
}

const styleSlice = createSlice({
    name: "style",
    initialState,
    reducers: {
        toDark(state) {
            state.mode = "dark-mode";
        },
        toLight(state) {
            state.mode = "light-mode";
        },
        changeMode(state) {
            if (state.mode === "light-mode") {
                state.mode = "dark-mode"
            } else {
                state.mode = "light-mode";
            }
        }
    }
});
export const getMode = state => state.style.mode;

export default styleSlice.reducer;

export const { toDark, toLight, changeMode } = styleSlice.actions;