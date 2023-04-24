import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './index_related/Layout';
import PageNotFound from './index_related/PageNotFound';
import Home from './pages/generics/Home';

import ProductInCategory from "./pages/gets/ProductInCategory";
import OrderInStatus from "./pages/gets/OrderInStatus";
import SingleCustomer from "./pages/gets/SingleCustomer";
import SingleOrder from "./pages/gets/SingleOrder";

//stylesheet
import '@picocss/pico'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="products/:category" element={<ProductInCategory />} />
          <Route path="orders/all/:status" element={<OrderInStatus />} />
          <Route path="customers/:id" element={<SingleCustomer />} />
          <Route path="orders/single/:id" element={<SingleOrder />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));