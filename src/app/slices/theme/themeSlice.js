import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themes: 'dark'
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        ThemeSwitcher: (state) => {
            if (state.themes === 'light') {
                state.themes = 'dark'
            } else {
                state.themes = 'light'
            }
        },
    }
});

export const { ThemeSwitcher } = themeSlice.actions;
export const SelectTheme = (state) => state.theme.themes;
export default themeSlice.reducer;