import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OnenoteSection } from 'microsoft-graph'
import { getSections, postSection } from '../../lib/graphService'
import { RootState } from '../../lib/rootReducer'
import { AppThunk } from '../../lib/store'

type SectionState = {
  sections: OnenoteSection[]
  currentSectionId: string | undefined
}

const initialState: SectionState = {
  sections: [],
  currentSectionId: undefined,
}

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setSections: (state, action: PayloadAction<OnenoteSection[]>) => {
      state.sections = action.payload
    },
    setSectionId: (state, action: PayloadAction<string | undefined>) => {
      state.currentSectionId = action.payload
    },
    addNewSection: (state, action: PayloadAction<OnenoteSection>) => {
      state.sections.push(action.payload)
    },
  },
})

export const { setSections, setSectionId, addNewSection } = sectionSlice.actions
export default sectionSlice.reducer

export const selectSection = (state: RootState): SectionState => state.section

export const fetchSectionsList =
  (noteId: string): AppThunk =>
  async (dispatch) => {
    try {
      const sections = await getSections(noteId)
      dispatch(setSections(sections))
    } catch (e) {
      console.log(e)
    }
  }

export const createSection =
  (noteId: string, sectionName: string): AppThunk =>
  async (dispatch) => {
    try {
      const newSection = await postSection(noteId, sectionName)
      dispatch(addNewSection(newSection))
    } catch (e) {
      console.log(e)
    }
  }
