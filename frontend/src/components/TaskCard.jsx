import { Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onToggleStatus, onEdit, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-600 bg-red-50 ring-red-500/20';
            case 'Medium': return 'text-yellow-700 bg-yellow-50 ring-yellow-600/20';
            case 'Low': return 'text-green-700 bg-green-50 ring-green-600/20';
            default: return 'text-gray-600 bg-gray-50 ring-gray-500/20';
        }
    };

    const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';

    return (
        <div className={`bg-white rounded-lg p-5 shadow-sm border transition-colors hover:shadow-md ${task.completed ? 'opacity-75 border-gray-200' : 'border-gray-100'}`}>
            <div className="flex items-start gap-4">
                <div className="pt-1">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleStatus(task._id, !task.completed)}
                        className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h4 className={`text-lg font-medium truncate ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {task.title}
                        </h4>
                        <div className="flex items-center gap-2 ml-4">
                            <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                                <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this task?')) {
                                        onDelete(task._id);
                                    }
                                }}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    {task.description && (
                        <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>{task.description}</p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ${getPriorityColor(task.priority)}`}>
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {task.priority} Priority
                        </span>
                        <span className="inline-flex items-center text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formattedDate}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
