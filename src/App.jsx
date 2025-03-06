import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header at the Top */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          </Routes>
        </main>

        {/* Footer at the Bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
