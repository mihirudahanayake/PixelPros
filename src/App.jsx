import React                                                                  from 'react';
import { BrowserRouter as Router, Routes, Route }                             from 'react-router-dom';
import Header                                                                 from './components/Header';
import HomePage                                                               from './pages/homePage';
import PopularDish                                                            from './pages/PopularDish';
import LandingPage                                                            from './pages/LandingPage';
import MenuPage                                                               from './pages/MenuPage';
import FoodMenu                                                               from './pages/FoodMenu';
import Order                                                                  from './pages/order';
import OrderPage                                                              from './pages/OrderPage';
import CartPage                                                               from './pages/CartPage';
import FoodList                                                               from './components/FoodList';
import Login                                                                  from './pages/login';
import Signup                                                                 from './pages/Signup';
import About                                                                  from './pages/about';
import Contact                                                                from './pages/Contact';
import Footer                                                                 from './components/Footer';

function App() {
    const userId = "demoUser123";
    return (
        <Router>
            <Header /> {/* Header visible in all pages */}
            <Routes>
                {/* Default route: LandingPage */}
                {/* <Route path="/" element={<LandingPage />} /> */}

                {/* Combined home page view */}
                <Route path="/" element={
                    <>
                        <HomePage />
                        <PopularDish />
                        <MenuPage />
                        
                        
                    </>
                } />

                <Route path="/home" element={
                    <>
                        <HomePage />
                        <PopularDish />
                        <MenuPage />
                        
                        
                    </>
                } />

                {/* Individual pages */}
                <Route path="/popular" element={<PopularDish />} />
                <Route path="/foodMenu" element={<MenuPage />} />
                <Route path="/order" element={<Order />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/cart" element={<CartPage userId={userId} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;