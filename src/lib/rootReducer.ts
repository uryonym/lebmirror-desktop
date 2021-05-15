import { combineReducers } from '@reduxjs/toolkit'
import { noteSlice } from '../features/ntoes/noteSlice'

const rootReducer = combineReducers({
  note: noteSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
