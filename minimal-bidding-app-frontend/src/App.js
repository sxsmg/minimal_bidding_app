import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import BidForm from './components/BidForm';
import AuctionItems from './components/AuctionItems';

function App() {
    return (
        <Router>
           <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/bid" element={<BidForm />} />
                <Route path="/auctions" element={<AuctionItems />} />
                {/* Define other routes as needed */}
            </Routes>
          <Footer />
        </Router>
    );
}

export default App;
