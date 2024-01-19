import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
    
})

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;