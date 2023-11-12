import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Authentication from "./pages/Authentication";
import Shipments from "./pages/Shipments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Authentication />} />

        <Route path="/user/*" element={<Layout />}>

          <Route index element={<Shipments />} />
          <Route path="create" element={<Create />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
