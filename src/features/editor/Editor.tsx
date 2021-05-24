import ContentEditable from 'react-contenteditable'
import React, { useEffect, useRef, useState } from 'react'
import { EditorState } from 'prosemirror-state'
import { schema } from 'prosemirror-schema-basic'
import { EditorView } from 'prosemirror-view'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { useSelector } from 'react-redux'
import { DOMParser as PmDOMParser, Node as PmNode } from 'prosemirror-model'
import { selectPage } from '../pages/pageSlice'

const Editor: React.VFC = () => {
  const pmEditor = useRef<HTMLDivElement>(null)
  const eView = useRef<EditorView | null>(null)
  const { pageContent } = useSelector(selectPage)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const createDocument = (content?: string): PmNode<any> | undefined => {
    const tmpEl = document.createElement('div')
    if (content) {
      tmpEl.innerHTML = content
      if (tmpEl.firstElementChild) {
        return PmDOMParser.fromSchema(schema).parse(tmpEl.firstElementChild)
      }
    }
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
          console.log(
            'Document size went from',
            transaction.before.content.size,
            'to',
            transaction.doc.content.size
          )
          if (eView.current) {
            const newState = eView.current.state.apply(transaction)
            eView.current.updateState(newState)
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

  return (
    <div className="editor d-flex flex-column">
      <ContentEditable
        className="title"
        onChange={() => console.log('change title')}
        html={title}
      />
      <div className="page-body" ref={pmEditor} />
    </div>
  )
}

export default Editor
