import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartPage } from '../features/cart/CartPage';
import { OrderPage } from '../features/order/OrderPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="/orderPage" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}
export default App;
