import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './LoginForm'
import Home from './Home'
import Jobs from './Jobs'
import Job from './Job'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={Job} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
