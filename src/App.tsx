import React, { useLayoutEffect } from 'react'
import { routePaths } from 'config/routes'
import { Switch, Route, Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from 'screens/LoginScreen'
import MyProfileScreen from 'screens/MyProfileScreen'
import RegisterScreen from 'screens/RegisterScreen'
import UserDetailsScreen from 'screens/UserDetailsScreen'
import NotFoundScreen from 'screens/NotFoundScreen'
import CreateJobScreen from 'screens/CreateJobScreen'
import JobsScreen from 'screens/JobsScreen'
import NavBar from 'components/NavBar'
import { useAuthInit, useUser } from 'services/auth'
import EditProfileScreen from 'screens/EditProfileScreen'
import EditJobScreen from 'screens/EditJobScreen'
import JobAppScreen from 'screens/JobAppScreen'
import Footer from 'components/Footer'
import PrivacyPolicyScreen from 'screens/PrivacyPolicyScreen'
import TermsOfUseScreen from 'screens/TermsOfUseScreen'
import ColorModeToggle from 'components/ColorModeToggle'
import { useLocation } from 'react-router-dom'
import './App.css'

const AuthenticatedApp: React.FC = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path={routePaths.HOME} component={HomeScreen} />
      <Route path={routePaths.MY_PROFILE} component={MyProfileScreen} />
      <Route path={routePaths.EDIT_MY_PROFILE} component={EditProfileScreen} />
      <Route path={routePaths.USER_DETAILS} component={UserDetailsScreen} />
      <Route path={routePaths.CREATE_JOB} component={CreateJobScreen} />
      <Route path={routePaths.EDIT_JOB} component={EditJobScreen} />
      <Route path={routePaths.APPLY_JOB} component={JobAppScreen} />
      <Route path={routePaths.JOBS} component={JobsScreen} />
      <Route path={routePaths.PRIVACY_POLICY} component={PrivacyPolicyScreen} />
      <Route path={routePaths.TERMS_OF_USE} component={TermsOfUseScreen} />

      <Route component={NotFoundScreen} />
    </Switch>
    <Footer />
  </>
)

const UnauthenticatedApp: React.FC = () => {
  return (
    <>
      <ColorModeToggle position="absolute" top={10} right={10} />
      <Switch>
        <Route exact path={routePaths.HOME} component={LoginScreen} />
        <Route path={routePaths.LOGIN} component={LoginScreen} />
        <Route path={routePaths.REGISTER} component={RegisterScreen} />
        <Route>
          <Redirect to={routePaths.HOME} />
        </Route>
      </Switch>
    </>
  )
}

const App: React.FC = () => {
  const { loading } = useAuthInit()
  const user = useUser()
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (loading) {
    return null
  }
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}
export default withRouter(App)
