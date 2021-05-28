import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import React, { useEffect, useRef, useState } from 'react'
import { EditorState } from 'prosemirror-state'
import { schema } from 'prosemirror-schema-basic'
import { EditorView } from 'prosemirror-view'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { useDispatch, useSelector } from 'react-redux'
import {
  DOMParser as PmDOMParser,
  DOMSerializer,
  Node as PmNode,
} from 'prosemirror-model'
import { Button } from 'react-bootstrap'
import { selectPage, updatePageContent } from '../pages/pageSlice'

const Editor: React.VFC = () => {
  const pmEditor = useRef<HTMLDivElement>(null)
  const eView = useRef<EditorView | null>(null)
  const { currentPageId, pageContent } = useSelector(selectPage)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [divId, setDivId] = useState<string | undefined>('')
  const dispatch = useDispatch()

  const createDocument = (content?: string): PmNode<any> | undefined => {
    const tmpEl = document.createElement('div')
    if (content) {
      tmpEl.innerHTML = content
      const tmpFirstEl = tmpEl.firstElementChild
      if (tmpFirstEl) {
        setDivId(tmpFirstEl.id)
        return PmDOMParser.fromSchema(schema).parse(tmpFirstEl)
      }
    }
    setDivId(undefined)
    return undefined
  }

  const createEditorState = (value?: string): EditorState => {
    const doc = createDocument(value)
    return EditorState.create({
      schema,
      doc,
      plugins: [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo }),
        keymap(baseKeymap),
      ],
    })
  }

  const createEditorView = (ele: HTMLDivElement | null) => {
    if (ele) {
      eView.current = new EditorView(ele, {
        state: createEditorState(),
        dispatchTransaction(transaction) {
          if (eView.current) {
            const newState = eView.current.state.apply(transaction)
            eView.current.updateState(newState)

            const fragment = newState.doc.content
            const docHtml =
              DOMSerializer.fromSchema(schema).serializeFragment(fragment)
            const container = document.createElement('article')
            container.appendChild(docHtml)
            setBody(container.innerHTML)
          }
        },
      })
    }
  }

  useEffect(() => {
    console.log('初回レンダー時のみ実行')
    createEditorView(pmEditor.current)
    return () => eView.current?.destroy()
  }, [])

  useEffect(() => {
    console.log('pageContentの値に応じて実行')
    if (pageContent) {
      const document = new DOMParser().parseFromString(pageContent, 'text/html')
      setTitle(document.title)
      setBody(document.body.innerHTML)
      const newState = createEditorState(document.body.innerHTML)
      if (eView.current) {
        eView.current?.updateState(newState)
      }
    }
  }, [pageContent])

  const handleSave = () => {
    if (currentPageId) {
      dispatch(updatePageContent(currentPageId, title, divId, body))
    }
  }

  return (
    <div className="editor d-flex flex-column">
      <div className="menubar">
        <Button variant="info" onClick={handleSave}>
          Save
        </Button>
      </div>
      <ContentEditable
        className="title"
        onChange={(event: ContentEditableEvent) => setTitle(event.target.value)}
        html={title}
      />
      <div className="page-body" ref={pmEditor} />
    </div>
  )
}

export default Editor
