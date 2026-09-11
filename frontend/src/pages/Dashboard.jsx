import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import api from '../services/api';
import { Search, Filter, CheckCircle2, Circle, Clock, CheckSquare, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    // const [tasks, setTasks] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Filters and Sorting
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [sortBy, setSortBy] = useState('dueDate');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            const res = await api.post('/tasks', taskData);
            setTasks((prev) => [...prev, res.data]);
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            const res = await api.put(`/tasks/${editingTask._id}`, taskData);
            setTasks((prev) => prev.map((t) => (t._id === editingTask._id ? res.data : t)));
            setEditingTask(null);
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks((prev) => prev.filter((t) => t._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleStatus = async (id, completed) => {
        try {
            const task = tasks.find((t) => t._id === id);
            const res = await api.put(`/tasks/${id}`, { ...task, completed });
            setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
        } catch (err) {
            console.error(err);
        }
    };

    // Derived state for Dashboard Stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const highPriorityTasks = tasks.filter((t) => t.priority === 'High' && !t.completed).length;

    // Filtering and Sorting operations
    const filteredTasks = tasks
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
        .filter((t) => {
            if (statusFilter === 'Completed') return t.completed;
            if (statusFilter === 'Pending') return !t.completed;
            return true;
        })
        .filter((t) => {
            if (priorityFilter !== 'All') return t.priority === priorityFilter;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'dueDate') {
                return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
            }
            return 0; // default sort or date created if needed
        });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <NavBar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                            <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
                        </div>
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                            <CheckSquare className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending</p>
                            <p className="text-3xl font-bold text-gray-900">{pendingTasks}</p>
                        </div>
                        <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full">
                            <Circle className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Completed</p>
                            <p className="text-3xl font-bold text-gray-900">{completedTasks}</p>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-full">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">High Priority</p>
                            <p className="text-3xl font-bold text-gray-900">{highPriorityTasks}</p>
                        </div>
                        <div className="p-3 bg-red-50 text-red-600 rounded-full">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
                    <button
                        onClick={() => { setShowForm(!showForm); setEditingTask(null); }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                    >
                        {showForm || editingTask ? 'Close Form' : 'Add New Task'}
                    </button>
                </div>

                {/* Show Form when Add or Edit is clicked */}
                {(showForm || editingTask) && (
                    <TaskForm
                        initialData={editingTask}
                        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                        onCancel={() => { setShowForm(false); setEditingTask(null); }}
                    />
                )}

                {/* Filters and Search */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96 flex-shrink-0">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="All">All Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                {/* Task List */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className="mt-2 text-gray-500">Loading tasks...</p>
                    </div>
                ) : filteredTasks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onToggleStatus={handleToggleStatus}
                                onDelete={handleDeleteTask}
                                onEdit={(task) => {
                                    setEditingTask(task);
                                    setShowForm(true);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100 border-dashed">
                        <CheckSquare className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Dashboard;
