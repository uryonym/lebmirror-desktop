import React from 'react'
import { useMsal } from '@azure/msal-react'
import { Button } from 'react-bootstrap'

const Header: React.VFC = () => {
  const { instance } = useMsal()
  return (
    <div className="header d-flex align-items-center px-3">
      <h3 className="mb-0">lebmirror</h3>
      <div className="ml-auto">
        <Button
          variant="outline-danger"
          onClick={() => instance.logoutRedirect()}
        >
          SignOut
        </Button>
      </div>
    </div>
  )
}

export default Header
