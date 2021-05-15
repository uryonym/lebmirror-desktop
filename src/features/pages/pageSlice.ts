import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OnenotePage } from 'microsoft-graph'
import { getPages, postPage } from '../../lib/graphService'
import { RootState } from '../../lib/rootReducer'
import { AppThunk } from '../../lib/store'

type PageState = {
  pages: OnenotePage[]
}

const initialState: PageState = {
  pages: [],
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<OnenotePage[]>) => {
      state.pages = action.payload
    },
    addNewPage: (state, action: PayloadAction<OnenotePage>) => {
      state.pages.push(action.payload)
    },
  },
})

export const { setPages, addNewPage } = pageSlice.actions
export default pageSlice.reducer

export const selectPage = (state: RootState): PageState => state.pages

export const fetchPageList =
  (sectionId: string): AppThunk =>
  async (dispatch) => {
    try {
      const pages = await getPages(sectionId)
      dispatch(setPages(pages))
    } catch (e) {
      console.log(e)
    }
  }

export const createPage =
  (sectionId: string, pageName: string): AppThunk =>
  async (dispatch) => {
    try {
      const newPage = await postPage(sectionId, pageName)
      dispatch(addNewPage(newPage))
    } catch (e) {
      console.log(e)
    }
  }
