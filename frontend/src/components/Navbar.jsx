import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import { ShoppingCart, LogOut, User, Utensils, Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 shadow-sm z-50 h-16 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-6xl">
                <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight text-slate-800 dark:text-white transition-colors">
                    <Utensils className="w-6 h-6 text-emerald-500" />
                    <span>Order<span className="text-emerald-500">Nest</span></span>
                </Link>

                <div className="flex items-center gap-4 sm:gap-6">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors" title="Toggle Theme">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    <Link to="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
                    <Link to="/founders" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Founder</Link>

                    {user ? (
                        <>
                            <Link to="/orders" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Orders</Link>
                            <Link to="/cart" className="relative text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors">
                                <User className="w-4 h-4 text-slate-400" />
                                {user.username}
                            </div>
                            <button onClick={handleLogout} className="text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors" title="Logout">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Log in</Link>
                            <Link to="/register" className="text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
