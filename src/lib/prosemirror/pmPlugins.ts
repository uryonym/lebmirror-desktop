/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { baseKeymap } from 'prosemirror-commands'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import keyMaps from './keyMaps'
import markdownInputRules from './markdownInputRules'

const pmPlugins = (schema: Schema): Plugin[] => [
  history(),
  keymap(keyMaps()),
  keymap(baseKeymap),
  markdownInputRules(schema),
  dropCursor(),
  gapCursor(),
]

export default pmPlugins
