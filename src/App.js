import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import NotFound from './components/NotFound'
import HomePage from './components/HomePage'
import PopularPage from './components/PopularPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import MovieDetailView from './components/MovieDetailView'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute exact path="/popular" component={PopularPage} />
        <ProtectedRoute exact path="/movie/:id" component={MovieDetailView} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
