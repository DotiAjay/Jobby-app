import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import JobsView from './components/AllJobsSections'
import jobDetails from './components/JobItemDetails'
import ProtectedRoute from './components/protectedRoute'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobsView} />
      <ProtectedRoute exact path="/jobs/:id" component={jobDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
