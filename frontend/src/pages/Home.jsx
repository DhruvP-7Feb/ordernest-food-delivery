import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { MapPin, Clock } from 'lucide-react';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await api.get('restaurants/');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Failed to fetch restaurants');
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    if (loading) return <div className="text-center py-20 text-slate-500 dark:text-slate-400">Loading restaurants...</div>;

    return (
        <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">



            <div className="flex flex-col items-start gap-4 pb-8 mb-4 border-b border-slate-200 dark:border-slate-800">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Explore Restaurants</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Discover the best food around you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restaurants.map(r => (
                    <Link to={`/restaurant/${r.id}`} key={r.id} className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-slate-700 overflow-hidden relative">
                            {r.image_url ? (
                                <img src={r.image_url} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-700/50">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{r.name}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{r.description}</p>

                            <div className="mt-auto flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-md border border-slate-100 dark:border-slate-700">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="truncate max-w-[120px]">{r.address}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-md border border-slate-100 dark:border-slate-700">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>30-40 min</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {restaurants.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-500 dark:text-slate-400 text-lg">No restaurants available right now.</p>
                </div>
            )}

        </div>
    );
};

export default Home;
