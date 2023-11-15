import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListPage from "./pages/home";
import EditPage from "./pages/edit";
import CreatePage from "./pages/create";
import RootLayout from "./components/Layout";
function App() {
  return (
    <>
      <RootLayout>
        <Routes>
          <Route path="/" element={<ListPage />}></Route>
          <Route path="/edit/:id" element={<EditPage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
