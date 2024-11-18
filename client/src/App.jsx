import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Layouts/Header/Header";
import Footer from "./components/Layouts/Footer/Footer";
import AuthGuard from "./guard/AuthGuard";
import ErrorPage from "./pages/ErrorPage";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import CatalogCategoryPage from "./pages/CatalogCategoryPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import { ContactProvider } from "./context/contactContext";
import { ToastContainer } from "react-toastify";
import AdminGuard from "./guard/AdminGuard";
import AdminCategoryPage from "./pages/admin/AdminCategoryPage";
import AdminLayout from "./components/Layouts/Admin/AdminLayout";
import AdminProductCreatePage from "./pages/admin/AdminProductCreatePage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminProductEditPage from "./pages/admin/AdminProductEditPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import CheckoutPage from "./pages/CheckoutPage";
import "./styles/base.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toastify-custom.css";

function App() {
  return (
    <ErrorBoundary>
      <ContactProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route
            path="/catalog/:categoryTitle"
            element={<CatalogCategoryPage />}
          />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<AuthGuard />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>

          <Route element={<AdminGuard />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="categories" element={<AdminCategoryPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route
                path="products/create"
                element={<AdminProductCreatePage />}
              />
              <Route
                path="products/edit/:id"
                element={<AdminProductEditPage />}
              />
              <Route path="users" element={<AdminUsersPage />} />
            </Route>
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </ContactProvider>
    </ErrorBoundary>
  );
}

export default App;
