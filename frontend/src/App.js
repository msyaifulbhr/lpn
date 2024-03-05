import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Admins from "./pages/Admins";
import AddAdmin from "./pages/AddAdmin";
import EditAdmin from "./pages/EditAdmin";
import Berita from"./pages/Berita";
import AddBerita from "./pages/AddBerita";
import EditBerita from "./pages/EditBerita";
import About from"./pages/Abouts";
import AddAbout from "./pages/AddAbout";
import EditAbout from "./pages/EditAbout";
import Services from"./pages/Services";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import Heros from"./pages/Heros";
import AddHero from "./pages/AddHero";
import EditHero from "./pages/EditHero";
// import NavbarCom from "./WebComp/inc/NavbarCom";
import MainHome from "./WebComp/pages/home/MainHome";
import BeritaHome from "./WebComp/pages/home/Berita";
import MainLayanan from "./WebComp/pages/layanan/MainLayanan";
import MainAbout from './WebComp/pages/about/MainAbout';
import MainContact from './WebComp/pages/contact/MainContact';
// import Footer from "./WebComp/inc/Footer";

function App() {
  return  (

  <div>
    <BrowserRouter>
    {/* <NavbarCom/> */}
      <Routes>
        <Route path="/admin/login" element={<Login />}/>
        <Route path="/admin/dashboard" element={<Dashboard />}/>

        <Route path="/admin/admins" element={<Admins />}/>
        <Route path="/admin/admins/add" element={<AddAdmin />}/>
        <Route path="/admin/admins/edit/:id" element={<EditAdmin />}/>

        <Route path="/admin/news" element={<Berita />}/>
        <Route path="/admin/news/add" element={<AddBerita />}/>
        <Route path="/admin/news/edit/:id" element={<EditBerita />}/>

        <Route path="/admin/services" element={<Services />}/>
        <Route path="/admin/services/add" element={<AddService />}/>
        <Route path="/admin/services/edit/:id" element={<EditService />}/>

        <Route path="/admin/abouts" element={<About />}/>
        <Route path="/admin/abouts/add" element={<AddAbout />}/>
        <Route path="/admin/abouts/edit/:id" element={<EditAbout />}/>

        <Route path="/admin/heros" element={<Heros />}/>
        <Route path="/admin/heros/add" element={<AddHero />}/>
        <Route path="/admin/heros/edit/:id" element={<EditHero />}/>
        
        <Route path="/" element={<MainHome/>} />
        <Route path="/news/:id" element={<BeritaHome/>} />
        <Route path="/layanan" element={<MainLayanan/>} />
        <Route path="/about" element={<MainAbout/>} />
        <Route path="/contact" element={<MainContact/>} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  </div>
  );
}

export default App;
