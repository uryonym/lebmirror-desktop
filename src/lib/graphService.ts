/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import * as graph from '@microsoft/microsoft-graph-client'
import { Notebook, OnenotePage, OnenoteSection } from 'microsoft-graph'
import { getToken } from './authService'

const getAuthClient = async () => {
  const token = await getToken()
  return graph.Client.init({
    authProvider: (done) => done(null, token),
  })
}

export const getNotebook = async (): Promise<Notebook[]> => {
  const client = await getAuthClient()
  const res = await client
    .api('/me/onenote/notebooks')
    .select('id,displayName')
    .filter("displayName eq 'lebmirror'")
    .get()
  return res.value as Promise<Notebook[]>
}

export const postNotebook = async (): Promise<Notebook> => {
  const client = await getAuthClient()
  const json = { displayName: 'lebmirror' }
  return (await client
    .api('/me/onenote/notebooks')
    .post(json)) as Promise<Notebook>
}

export const getSections = async (
  noteId: string
): Promise<OnenoteSection[]> => {
  const client = await getAuthClient()
  const res = await client
    .api(`/me/onenote/notebooks/${noteId}/sections`)
    .select('id,displayName,createdDateTime')
    .get()
  return res.value as Promise<OnenoteSection[]>
}

export const postSection = async (
  noteId: string,
  sectionName: string
): Promise<OnenoteSection> => {
  const client = await getAuthClient()
  const json = { displayName: sectionName }
  return (await client
    .api(`/me/onenote/notebooks/${noteId}/sections`)
    .post(json)) as Promise<OnenoteSection>
}

export const getPages = async (sectionId: string): Promise<OnenotePage[]> => {
  const client = await getAuthClient()
  const res = await client
    .api(`/me/onenote/sections/${sectionId}/pages`)
    .select('id,title,createdDateTime')
    .orderby('title')
    .get()
  return res.value as Promise<OnenotePage[]>
}
