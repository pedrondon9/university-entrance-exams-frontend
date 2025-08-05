
import Auth from './contexts/Auth';
import './App.css';
import { Route, BrowserRouter, Router, Navigate, HashRouter, Routes } from 'react-router-dom';

import Home from './pages/home/home';
import UploadPdf from './pages/upluod/uploudPdf';
import Confir from "./pages/confirmar/confirm"
import Admins from './pages/admins/admins';
import ResendEmail from './pages/resendEmail/resendEmail';
function App() {


  return (
    <Auth>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/resendEmail" element={<ResendEmail />} />
          <Route exact path="/upload" element={<UploadPdf />} />
          <Route exact path="/deleteExammm" element={<Admins />} />
          <Route exact path="/confirm/:id" element={<Confir />} />
        </Routes>
        {/* <Footer/> */}
      </HashRouter>

    </Auth>
  );
}

export default App;
