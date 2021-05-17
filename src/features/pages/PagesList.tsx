/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSection } from '../sections/sectionSlice'
import {
  createPage,
  fetchPageContent,
  selectPage,
  setPageId,
} from './pageSlice'

const PagesList: React.VFC = () => {
  const dispatch = useDispatch()
  const { currentSectionId } = useSelector(selectSection)
  const { pages } = useSelector(selectPage)

  const [show, setShow] = useState(false)
  const [newPageName, setNewPageName] = useState('')

  const handlePageList = (pageId: string | undefined) => () => {
    dispatch(setPageId(pageId))
    if (pageId) {
      dispatch(fetchPageContent(pageId))
    }
  }
  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)
  const handleChangePageName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewPageName(ev.currentTarget.value)
  }
  const handleAddPage = () => {
    if (currentSectionId) {
      dispatch(createPage(currentSectionId, newPageName))
      setShow(false)
    }
  }

  return (
    <>
      <div className="content-list">
        <Button
          variant="outline-warning"
          onClick={handleOpen}
          block
          className="mb-2"
        >
          Add a Page
        </Button>
        <ListGroup variant="flush">
          {(() => {
            const lists: any[] = []
            pages.forEach((page) => {
              lists.push(
                <ListGroup.Item
                  key={page.id}
                  action
                  onClick={handlePageList(page.id)}
                  className="list-item"
                >
                  {page.title}
                </ListGroup.Item>
              )
            })
            return lists
          })()}
        </ListGroup>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add a new page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Page Name"
            onChange={handleChangePageName}
            value={newPageName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPage}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PagesList
