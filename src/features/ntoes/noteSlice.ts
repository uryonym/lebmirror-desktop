import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getNotebook, postNotebook } from '../../lib/graphService'
import { RootState } from '../../lib/rootReducer'
import { AppThunk } from '../../lib/store'

type NoteState = {
  noteId: string | undefined
}

const initialState: NoteState = {
  noteId: undefined,
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNoteId: (state, action: PayloadAction<string | undefined>) => {
      state.noteId = action.payload
    },
  },
})

export const { setNoteId } = noteSlice.actions
export default noteSlice.reducer

export const selectNote = (state: RootState): NoteState => state.note

export const fetchNotebook = (): AppThunk => async (dispatch) => {
  try {
    const notebooks = await getNotebook()
    if (notebooks.length === 0) {
      const newNote = await postNotebook()
      notebooks.push(newNote)
    }
    dispatch(setNoteId(notebooks[0].id))
  } catch (e) {
    console.log(e)
  }
}
