import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/tasks', {
                headers: { 'x-auth-token': token }
            });
            setTasks(res.data);
        } catch (error) {
            console.error(error.response?.data?.msg || 'An error occurred while fetching tasks');
        }
    };

    const handleAddTask = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/tasks', { title: newTask }, {
                headers: { 'x-auth-token': token }
            });
            setTasks([...tasks, res.data]);
            setNewTask('');
        } catch (error) {
            console.error(error.response?.data?.msg || 'An error occurred while adding task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error(error.response?.data?.msg || 'An error occurred while deleting task');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="max-w-md mx-auto my-8 p-6 border rounded shadow">
            <h2 className="text-2xl mb-4">Dashboard</h2>
            <input
                type="text"
                name="newTask" // Add a name attribute here
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="New Task"
            />
            <button
                onClick={handleAddTask}
                className="w-full p-2 bg-green-500 text-white rounded"
            >
                Add Task
            </button>
            <ul className="mt-4">
                {tasks.map(task => (
                    <li key={task._id} className="flex justify-between items-center mb-2">
                        <span>{task.title}</span>
                        <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
