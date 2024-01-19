import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import NotFound from './components/NotFound'
import HomePage from './components/HomePage'
import PopularPage from './components/PopularPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import MovieDetailView from './components/MovieDetailView'
import AccountPage from './components/AccountPage'
import CredentialContext from './Context/CredentialContext'
import SearchComponent from './components/SearchComponent'

class App extends Component {
  state = {username: '', password: ''}

  setCredential = (username, password) => {
    this.setState({username})
    this.setState({password})
  }

  render() {
    const {username, password} = this.state
    console.log(username, password)
    return (
      <CredentialContext.Provider
        value={{
          username,
          password,
          setCredential: this.setCredential,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute exact path="/popular" component={PopularPage} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieDetailView}
          />
          <ProtectedRoute exact path="/account" component={AccountPage} />
          <ProtectedRoute exact path="/search" component={SearchComponent} />
          <Route component={NotFound} />
        </Switch>
      </CredentialContext.Provider>
    )
  }
}

export default App
