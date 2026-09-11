import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <CheckSquare className="h-8 w-8 text-indigo-600" />
                            <span className="font-bold text-xl text-gray-900">TaskFlow</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-500 hidden sm:block">
                                    Welcome, <span className="font-semibold text-gray-900">{user.name}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
