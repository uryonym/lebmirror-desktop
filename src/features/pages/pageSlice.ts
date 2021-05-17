import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OnenotePage } from 'microsoft-graph'
import { getPageContent, getPages, postPage } from '../../lib/graphService'
import { RootState } from '../../lib/rootReducer'
import { AppThunk } from '../../lib/store'

type PageState = {
  pages: OnenotePage[]
  currentPageId: string | undefined
  pageContent: string | undefined
}

const initialState: PageState = {
  pages: [],
  currentPageId: undefined,
  pageContent: undefined,
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
    setPageId: (state, action: PayloadAction<string | undefined>) => {
      state.currentPageId = action.payload
    },
    setPageContent: (state, action: PayloadAction<string | undefined>) => {
      state.pageContent = action.payload
    },
  },
})

export const { setPages, addNewPage, setPageId, setPageContent } =
  pageSlice.actions
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

export const fetchPageContent =
  (pageId: string): AppThunk =>
  async (dispatch) => {
    try {
      const page = await getPageContent(pageId)
      dispatch(setPageContent(page))
    } catch (e) {
      console.log(e)
    }
  }
