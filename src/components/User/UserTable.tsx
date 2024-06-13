import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BanIcon from '@mui/icons-material/Block';
import EditUserForm from './EditUserForm';
import '../../css/styles.css';
import { User } from "../../pages/UsersPage";

interface UserTableProps {
    users: User[],
    onBanUser: (id: string) => void,
    onDeleteUser: (id: string) => void,
    onUpdateUser: (user: User) => void
}

const UserTable: React.FC<UserTableProps> = ({ users, onBanUser, onDeleteUser, onUpdateUser }) => {
    const [isEditUserFormVisible, setEditUserFormVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setEditUserFormVisible(true);
    };

    const handleClose = () => {
        setEditUserFormVisible(false);
        setSelectedUser(null);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Banned</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Mapping over users array to display each user */}
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.gender}</TableCell>
                                <TableCell>{user.banned ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    {/* Conditional rendering of EditUserForm */}
                                    {isEditUserFormVisible && selectedUser && (
                                        <div className="edit-modal">
                                            <EditUserForm user={selectedUser} onClose={handleClose} onUpdateUser={onUpdateUser} />
                                        </div>
                                    )}
                                    {/* Button to edit user */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditUser(user)}
                                        startIcon={<EditIcon />}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Edit User
                                    </Button>
                                    {/* IconButton to ban user */}
                                    <IconButton color="secondary" onClick={() => onBanUser(user.id)}>
                                        <BanIcon />
                                    </IconButton>
                                    {/* IconButton to delete user */}
                                    <IconButton color="error" onClick={() => onDeleteUser(user.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserTable;
