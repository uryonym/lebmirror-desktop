import { combineReducers } from '@reduxjs/toolkit'
import { noteSlice } from '../features/ntoes/noteSlice'
import { sectionSlice } from '../features/sections/sectionSlice'
import { pageSlice } from '../features/pages/pageSlice'

const rootReducer = combineReducers({
  note: noteSlice.reducer,
  section: sectionSlice.reducer,
  pages: pageSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
