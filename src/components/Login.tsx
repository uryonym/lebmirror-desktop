import React from 'react'
import { useMsal } from '@azure/msal-react'
import { Button } from 'react-bootstrap'

const Login: React.VFC = () => {
  const { instance } = useMsal()
  return (
    <div className="login d-flex align-items-center justify-content-center flex-column">
      <h2>You will need to sign in to access lebmirror.</h2>
      <Button onClick={() => instance.loginRedirect()}>SignIn</Button>
    </div>
  )
}

export default Login
