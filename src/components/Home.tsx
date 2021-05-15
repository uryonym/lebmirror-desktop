import React from 'react'
import Header from './Header'

const Home: React.VFC = () => (
  // const dispatch = useDispatch()
  // const { noteId } = useSelector(selectNote)

  // useEffect(() => {
  //   dispatch(fetchNotebook())
  // }, [dispatch])

  // useEffect(() => {
  //   if (noteId) {
  //   dispatch(fetchSectionsList(noteId))
  //   }
  // }, [dispatch, noteId])

  <>
    <Header />
    <div className="home d-flex">
      {/* <SectionsList /> */}
      {/* <PagesList /> */}
      {/* <Editor /> */}
    </div>
  </>
)

export default Home
