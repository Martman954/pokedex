import { Outlet, Link } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="fixed inset-0 z-[-2] w-full h-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
