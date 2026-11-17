import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Builder from "./pages/Builder";
import Results from "./pages/Results";
import Gallery from "./pages/Gallery";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/results" element={<Results />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
}
