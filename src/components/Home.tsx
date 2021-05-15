import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import { fetchNotebook, selectNote } from '../features/ntoes/noteSlice'

const Home: React.VFC = () => {
  const dispatch = useDispatch()
  const { noteId } = useSelector(selectNote)

  useEffect(() => {
    dispatch(fetchNotebook())
  }, [dispatch])

  // useEffect(() => {
  //   if (noteId) {
  //   dispatch(fetchSectionsList(noteId))
  //   }
  // }, [dispatch, noteId])

  return (
    <>
      <Header />
      <div className="home d-flex">
        {/* <SectionsList /> */}
        {/* <PagesList /> */}
        {/* <Editor /> */}
      </div>
    </>
  )
}

export default Home
