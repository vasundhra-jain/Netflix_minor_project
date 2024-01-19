import React from 'react'

const CredentialContext = React.createContext({
  username: '',
  password: '',
  setCredential: () => {},
})

export default CredentialContext
