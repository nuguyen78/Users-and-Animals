import React, { useEffect, useState } from 'react';
import UserTable from '../components/User/UserTable';
import AddUserForm from '../components/User/AddUserForm';
import { Typography, Box, CircularProgress } from '@mui/material';
import { banUser, deleteUser, getUsers } from '../services/api';
import Filter from '../components/Filter';
import SnackbarMessage from '../components/SnackbarMessage';

export interface User {
    id: string;
    name: string;
    gender: 'female' | 'male' | 'other';
    banned: boolean;
}

const UsersPage: React.FC = () => {
    // State variables
    const [users, setUsers] = useState<User[]>([]); // State for storing users data
    const [filter, setFilter] = useState<string>(''); // State for filtering users by name
    const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

    // Snackbar state variables for displaying messages
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    // Fetch users data from API on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch users data from API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle banning a user
    const handleBanUser = async (id: string) => {
        try {
            await banUser(id, { banned: true });
            const updatedUsers = users.map(user =>
                user.id === id ? { ...user, banned: true } : user
            );
            setUsers(updatedUsers);
            showSnackbar('User banned successfully.', 'success');
        } catch (error) {
            console.error('Error banning user:', error);
        }
    };

    // Function to handle deleting a user
    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id);
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
            showSnackbar('User deleted successfully.', 'success');
        } catch (error) {
            console.error('Error deleting user:', error);
            showSnackbar('Failed to delete user. Please try again.', 'error');
        }
    };

    // Function to handle updating user details
    const handleUpdateUser = (updatedUser: any) => {
        try {
            const updatedUsers = users.map(user =>
                user.id === updatedUser.id ? { ...user, ...updatedUser } : user
            );
            setUsers(updatedUsers);
            showSnackbar('User edited successfully.', 'success');
        } catch (error) {
            console.error('Error editing user:', error);
            showSnackbar('Failed to edit user. Please try again.', 'error');
        }
    };

    // Function to handle adding a new user
    const handleAddUser = async (newUser: User) => {
        try {
            setUsers(prevUsers => [...prevUsers, newUser]);
            showSnackbar('User added successfully.', 'success');
        } catch (error) {
            console.error('Error adding user:', error);
            showSnackbar('Failed to add user. Please try again.', 'error');
        }
    };

    // Filtered users based on the filter state
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));

    // Function to show a snackbar message
    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    // Function to close the snackbar
    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>
            <AddUserForm onAddUser={handleAddUser} />
            {loading ? (
                <div className='loading-center'>
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <Filter filter={filter} setFilter={setFilter} />
                    <UserTable
                        users={filteredUsers}
                        onBanUser={handleBanUser}
                        onDeleteUser={handleDeleteUser}
                        onUpdateUser={handleUpdateUser}
                    />
                </div>
            )}
            <SnackbarMessage
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={closeSnackbar}
            />
        </Box>
    );
};

export default UsersPage;
