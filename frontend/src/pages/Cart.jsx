import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, checkout } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    if (!user) {
        return (
            <div className="text-center py-20 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Please Log In</h2>
                <p className="text-slate-500 mb-8">You need to be logged in to view and manage your cart.</p>
                <Link to="/login" className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors inline-block">
                    Log In to Continue
                </Link>
            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="text-center py-20 animate-[fadeIn_0.5s_ease-out]">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Cart is Empty</h2>
                <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                    Browse Restaurants &rarr;
                </Link>
            </div>
        );
    }

    const total = cart.items.reduce((acc, item) => acc + (item.quantity * item.menu_item.price), 0);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            await checkout();
            navigate('/orders');
        } catch (error) {
            console.error("Checkout failed", error);
            alert("Checkout failed. Make sure all items are from the same restaurant.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto animate-[fadeIn_0.5s_ease-out]">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Your Cart</h1>
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm mb-8">
                <ul className="divide-y divide-slate-100">
                    {cart.items.map(item => (
                        <li key={item.id} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
                            <div className="flex-1 flex gap-4">
                                {item.menu_item.image_url ? (
                                    <img src={item.menu_item.image_url} alt={item.menu_item.name} className="w-16 h-16 rounded-xl object-cover" />
                                ) : (
                                    <div className="w-16 h-16 rounded-xl bg-slate-100" />
                                )}
                                <div>
                                    <h3 className="font-bold text-slate-900">{item.menu_item.name}</h3>
                                    <p className="text-sm text-slate-500">${item.menu_item.price}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6 self-start sm:self-auto">
                                <div className="flex items-center bg-slate-50 rounded-full border border-slate-200">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="w-16 text-right font-bold text-slate-900">
                                    ${(item.quantity * item.menu_item.price).toFixed(2)}
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-lg font-medium text-slate-500">Total Amount</span>
                    <span className="text-3xl font-bold text-slate-900">${total.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex justify-end">
                <button 
                    onClick={handleCheckout} 
                    disabled={loading}
                    className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Place Order'}
                    {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
};

export default Cart;
