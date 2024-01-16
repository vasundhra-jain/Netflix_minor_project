import React from 'react'

const CredentialContext = React.createContext({
  username: '',
  password: '',
  searchValue: '',
  setCredential: () => {},
  setSearchValue: () => {},
})

export default CredentialContext
