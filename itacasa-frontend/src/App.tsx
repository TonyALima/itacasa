import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContextProvider";
import { ThemeProvider } from "./theme/ThemeContext";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ImovelForms from "./pages/ImovelForms";
function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    {" "}
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/imovel/novo"
                            element={
                                <PrivateRoute>
                                    <ImovelForms />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}
export default App;
