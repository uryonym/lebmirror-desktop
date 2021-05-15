import ContentEditable from 'react-contenteditable'
import React from 'react'

const Editor: React.VFC = () => (
  <div className="editor">
    <ContentEditable
      className="title"
      onChange={() => console.log('change title')}
      html="This is Sample Title."
    />
    <div className="page-body">
      <p>this is editor area.</p>
    </div>
  </div>
)

export default Editor
