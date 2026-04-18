import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { Plus, Check } from 'lucide-react';

const RestaurantDetail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, cart } = useContext(CartContext);
    const [addedId, setAddedId] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await api.get(`restaurants/${id}/`);
                setRestaurant(res.data);
                const menuRes = await api.get(`restaurants/${id}/menu/`);
                setMenuItems(menuRes.data);
            } catch (error) {
                console.error("Failed to load restaurant details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleAdd = (itemId) => {
        addToCart(itemId, 1);
        setAddedId(itemId);
        setTimeout(() => setAddedId(null), 1000);
    };

    if (loading) return <div className="text-center py-20 text-slate-500">Loading menu...</div>;
    if (!restaurant) return <div className="text-center py-20 text-red-500">Restaurant not found.</div>;

    const getQuantityInCart = (itemId) => {
        const item = cart?.items?.find(i => i.menu_item.id === itemId);
        return item ? item.quantity : 0;
    };

    return (
        <div className="animate-[fadeIn_0.5s_ease-out] max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 mb-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    {restaurant.image_url ? (
                        <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                    )}
                </div>
                <div className="flex-1 pt-2">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">{restaurant.name}</h1>
                    <p className="text-slate-500 text-lg mb-4">{restaurant.description}</p>
                    <div className="inline-block bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600">
                        {restaurant.address}
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">Menu</h2>
            <div className="flex flex-col gap-4">
                {menuItems.map(item => {
                    const quantity = getQuantityInCart(item.id);
                    return (
                        <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm hover:border-slate-200 transition-colors">
                            <div className="flex-1 pr-6 flex items-start gap-4">
                                {item.image_url && (
                                    <img src={item.image_url} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                                    <p className="text-sm text-slate-500 mt-1 mb-2 max-w-lg">{item.description}</p>
                                    <span className="font-semibold text-emerald-600">${item.price}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleAdd(item.id)}
                                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                    addedId === item.id 
                                        ? 'bg-emerald-500 text-white' 
                                        : quantity > 0 
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {addedId === item.id ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            </button>
                        </div>
                    );
                })}
                {menuItems.length === 0 && (
                    <div className="text-center py-10 bg-white rounded-2xl border border-slate-100">
                        <p className="text-slate-500">No menu items available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantDetail;
