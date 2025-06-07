import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <main className="flex flex-col overflow-hidden text-tertiary bg-gray-50 dark:bg-gray-900 h-[100vh]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
