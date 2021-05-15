import React from 'react'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'
import Home from './components/Home'
import Login from './components/Login'

const App: React.VFC = () => (
  <>
    <AuthenticatedTemplate>
      <Home />
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
      <Login />
    </UnauthenticatedTemplate>
  </>
)

export default App
