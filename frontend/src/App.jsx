import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import  { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom"
import Timer from "./components/Timer";

function App() {

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
