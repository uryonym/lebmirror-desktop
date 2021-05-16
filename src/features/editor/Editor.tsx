import ContentEditable from 'react-contenteditable'
import React, { useEffect, useRef } from 'react'
import { EditorState } from 'prosemirror-state'
import { schema } from 'prosemirror-schema-basic'
import { EditorView } from 'prosemirror-view'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'

const Editor: React.VFC = () => {
  const pmEditor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pmEditor.current) {
      const state = EditorState.create({
        schema,
        plugins: [history(), keymap({ 'Mod-z': undo, 'Mod-y': redo })],
      })
      const view = new EditorView(pmEditor.current, {
        state,
        dispatchTransaction(transaction) {
          console.log(
            'Document size went from',
            transaction.before.content.size,
            'to',
            transaction.doc.content.size
          )
          const newState = view.state.apply(transaction)
          view.updateState(newState)
        },
      })
    }
  }, [])

  return (
    <div className="editor">
      <ContentEditable
        className="title"
        onChange={() => console.log('change title')}
        html="This is Sample Title."
      />
      <div className="page-body" ref={pmEditor} />
    </div>
  )
}

export default Editor
