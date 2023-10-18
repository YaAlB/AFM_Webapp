import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Public from "./components/Public";
import LoginSignup from "./features/auth/LoginSignup";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import ApplicationsList from "./features/applications/ApplicationsList";
import EditApplication from "./features/applications/EditApplication";
import NewApplication from "./features/applications/NewApplication";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="aboutus" element={<AboutUs />} />
        <Route path="services" element={<Services />} />

        <Route path="auth/:value" element={<LoginSignup />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />

              <Route path="applications">
                <Route index element={<ApplicationsList />} />
                <Route path=":id" element={<EditApplication />} />
                <Route path="new" element={<NewApplication />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
