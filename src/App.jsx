import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
