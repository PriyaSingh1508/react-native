import { createSlice } from '@reduxjs/toolkit'
export interface Expense {
  name: string;
  plannedAmount: number;
  actualAmount: number;
}

export interface ExpenseState {
  expenseEntries: Expense[];
}

const initialState: ExpenseState = {
  expenseEntries: [],
};

 const expenseSlice = createSlice({
  name: 'expenseSlice',
  initialState,
  reducers: {
    saveExpense: (state,action) => {
        state.expenseEntries.push(action.payload);
    },
    clearExpense: (state) => {
        state.expenseEntries = [];
      },
  },
})

export const { saveExpense, clearExpense } = expenseSlice.actions

export default expenseSlice.reducer