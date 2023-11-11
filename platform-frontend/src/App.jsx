import { BrowserRouter, Routes,Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/auth" element={<Authentication/>} />

        <Route path="/user/*" element={<Layout/>}>

          {/* <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="favourites" element={<Favourite />} /> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
