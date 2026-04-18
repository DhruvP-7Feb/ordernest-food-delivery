import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package, Clock } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('orders/');
                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (!user) {
        return <div className="text-center py-20">Please log in to view orders.</div>;
    }

    if (loading) return <div className="text-center py-20 text-slate-500">Loading orders...</div>;

    if (orders.length === 0) {
        return (
            <div className="text-center py-20">
                <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-4">No Orders Yet</h2>
                <p className="text-slate-500 mb-8">You haven't placed any orders.</p>
                <Link to="/" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                            Browse Restaurants &rarr;
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-out]">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Order History</h1>
            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-slate-900">{order.restaurant_name}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                                    order.status === 'Preparing' ? 'bg-amber-100 text-amber-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                                <Clock className="w-4 h-4" />
                                {new Date(order.created_at).toLocaleString()}
                            </div>
                            
                            <div className="space-y-2">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex gap-4 text-sm">
                                        <span className="font-semibold text-slate-900">{item.quantity}x</span>
                                        <span className="text-slate-600">{item.menu_item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-end items-start md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0 text-left md:text-right">
                            <span className="text-slate-500 text-sm mb-1">Total Amount</span>
                            <span className="text-2xl font-bold text-slate-900">${order.total_amount}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
