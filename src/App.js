import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import NotFound from './components/NotFound'
import HomePage from './components/HomePage'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
