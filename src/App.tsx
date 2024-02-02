import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { SetStateAction, useState } from "react";

function App() {
    const [currentForm, setCurrentForm] = useState("login");

    const toggleForm = (formName: SetStateAction<string>) => {
        setCurrentForm(formName);
    };

    return (
        <ShoppingCartProvider>
            <Navbar currentForm={currentForm} toggleForm={toggleForm} />
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />

                    {currentForm === "login" ? (
                        <Route path="/login" element={<Login onFormSwitch={toggleForm} />} />
                    ) : (
                        <Route path="/register" element={<Register onFormSwitch={toggleForm} />} />
                    )}
                </Routes>
            </Container>
        </ShoppingCartProvider>
    );
}

export default App;