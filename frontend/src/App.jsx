import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Questionpage } from "./pages/Questionpage";
import { Questionform } from "./pages/Questionform";
import { Questionplay } from "./pages/Questionplay";

import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/questionpage" />}></Route>
          <Route path="/questionpage" element={<Questionpage />}></Route>
          <Route path="/questionform" element={<Questionform />}></Route>
          <Route path="/question/:id" element={<Questionform />}></Route>
          <Route path="/questionplay" element={<Questionplay />}></Route>
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
