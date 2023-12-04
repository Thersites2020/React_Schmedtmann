import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountriesList from "./components/CountriesList";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Product from './pages/Product'
// import Pricing from './pages/Pricing'
// import Homepage from './pages/Homepage'
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

//npm run build

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));


function App() {


  return (
    <AuthProvider>
      <CitiesProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList /> } />
                <Route path='cities/:id' element={<City />}  />
                <Route path='countries' element={<CountriesList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App

/* npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev */
