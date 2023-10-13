import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import ApplicationsList from './features/applications/ApplicationsList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="applications">
            <Route index element={<ApplicationsList />} />
          </Route>

        </Route>

      </Route>
    </Routes>
  );
}

export default App;