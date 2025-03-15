import { Routes, Route } from "react-router-dom";
import TokenCreator from "./pages/CreateToken/CreateToken";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
// import Check from "./components/Check";
function App() {
  return (
    <div className="lg:px-0 px-5">
      <Header />
      <div className="mt-20 p-6"> {/* Ensures content starts below the header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tokens" element={<TokenCreator />} />
        {/* <Route path="/nfts" element={<NFTCreator />} /> */}
      </Routes>
      </div>
    </div>
  );
}

export default App;
