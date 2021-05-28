/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import * as graph from '@microsoft/microsoft-graph-client'
import { Notebook, OnenotePage, OnenoteSection } from 'microsoft-graph'
import { getToken } from './authService'
import { UpdateContent } from '../features/pages/pageSlice'

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

export const postPage = async (
  sectionId: string,
  pageName: string
): Promise<OnenotePage> => {
  const client = await getAuthClient()
  const html = `<!DOCTYPE html><html><head><title>${pageName}</title></head><body></body></html>`
  console.log(html)
  const response = await client
    .api(`/me/onenote/sections/${sectionId}/pages`)
    .header('Content-Type', 'application/xhtml+xml')
    .post(html)
  console.log(response)
  return response as Promise<OnenotePage>
}

export const getPageContent = async (pageId: string): Promise<string> => {
  const client = await getAuthClient()
  const response: ReadableStream = await client
    .api(`/me/onenote/pages/${pageId}/content?includeIDs=true`)
    .getStream()
  const reader = response.getReader()
  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        controller.enqueue(value)
      }
      controller.close()
      reader.releaseLock()
    },
  })
  // eslint-disable-next-line no-return-await
  return await new Response(stream).text()
}

export const patchPageContent = async (
  pageId: string,
  stream: UpdateContent[]
) => {
  const client = await getAuthClient()
  await client
    .api(`/me/onenote/pages/${pageId}/content`)
    .patch(JSON.stringify(stream))
}
