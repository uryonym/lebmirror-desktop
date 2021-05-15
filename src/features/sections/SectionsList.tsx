/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectNote } from '../ntoes/noteSlice'
import { fetchPageList } from '../pages/pageSlice'
import { createSection, selectSection, setSectionId } from './sectionSlice'

const SectionsList: React.VFC = () => {
  const dispatch = useDispatch()
  const { noteId } = useSelector(selectNote)
  const { sections } = useSelector(selectSection)

  const [show, setShow] = useState(false)
  const [newSectionName, setNewSectionName] = useState('')

  const handleSectionList = (sectionId: string | undefined) => () => {
    dispatch(setSectionId(sectionId))
    if (sectionId) {
      dispatch(fetchPageList(sectionId))
    }
  }
  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)
  const handleChangeSectionName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewSectionName(ev.currentTarget.value)
  }
  const handleAddSection = () => {
    if (noteId) {
      dispatch(createSection(noteId, newSectionName))
      setShow(false)
    }
  }

  return (
    <>
      <div className="content-list">
        <Button
          variant="outline-success"
          onClick={handleOpen}
          block
          className="mb-2"
        >
          Add a Section
        </Button>
        <ListGroup variant="flush">
          {(() => {
            const lists: any[] = []
            sections.forEach((section) => {
              lists.push(
                <ListGroup.Item
                  key={section.id}
                  action
                  onClick={handleSectionList(section.id)}
                  className="list-item"
                >
                  {section.displayName}
                </ListGroup.Item>
              )
            })
            return lists
          })()}
        </ListGroup>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add a new section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Section Name"
            onChange={handleChangeSectionName}
            value={newSectionName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddSection}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SectionsList
