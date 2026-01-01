import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import ProfessionalLogin from './components/ProfessionalLogin'
import ProfessionalSignup from './components/ProfessionalSignup'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import { UserDashboard } from './components/UserDashBoardcomponent'
import { ProfessionalDashboard } from './components/ProfessionalDashboardcomponent'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <NavigationBar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <NavigationBar />
            <About />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/professional-login" element={<ProfessionalLogin />} />
        <Route path="/professional-signup" element={<ProfessionalSignup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/professional-dashboard" element={
          <ProtectedRoute>
            <ProfessionalDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App