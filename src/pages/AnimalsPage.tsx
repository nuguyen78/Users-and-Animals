import React, { useEffect, useState } from 'react';
import AnimalTable from '../components/Animal/AnimalTable'; // Assuming you have AnimalTable component
import AddAnimalForm from '../components/Animal/AddAnimalForm'; // Assuming you have AddAnimalForm component
import { Typography, Box, CircularProgress } from '@mui/material';
import { banAnimal, deleteAnimal, getAnimals } from '../services/api'; // Adjust API functions
import Filter from '../components/Filter';
import SnackbarMessage from '../components/SnackbarMessage';

export interface Animal { // Change User to Animal
    id: string;
    name: string;
    type: 'cat' | 'dog' | 'other'; // Add type field
    age: number; // Add age field
}

const AnimalsPage: React.FC = () => { // Change UsersPage to AnimalsPage
    // State variables
    const [animals, setAnimals] = useState<Animal[]>([]); // Change users to animals
    const [filter, setFilter] = useState<string>(''); // State for filtering animals by name
    const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

    // Snackbar state variables
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    // Fetch animals data from API on component mount
    useEffect(() => {
        fetchAnimals();
    }, []);

    // Function to fetch animals data from API
    const fetchAnimals = async () => {
        setLoading(true);
        try {
            const data = await getAnimals(); // Change getUsers to getAnimals
            setAnimals(data);
        } catch (error) {
            console.error('Error fetching animals:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle banning an animal
    const handleBanAnimal = async (id: string) => {
        try {
            await banAnimal(id, { banned: true }); // Adjust API call to banAnimal
            const updatedAnimals = animals.map(animal =>
                animal.id === id ? { ...animal, banned: true } : animal
            );
            setAnimals(updatedAnimals);
            showSnackbar('Animal banned successfully.', 'success');
        } catch (error) {
            console.error('Error banning animal:', error);
        }
    };

    // Function to handle deleting an animal
    const handleDeleteAnimal = async (id: string) => {
        try {
            await deleteAnimal(id); // Adjust API call to deleteAnimal
            const updatedAnimals = animals.filter(animal => animal.id !== id);
            setAnimals(updatedAnimals);
            showSnackbar('Animal deleted successfully.', 'success');
        } catch (error) {
            console.error('Error deleting animal:', error);
            showSnackbar('Failed to delete animal. Please try again.', 'error');
        }
    };

    // Function to handle updating animal details
    const handleUpdateAnimal = (updatedAnimal: any) => {
        try {
            const updatedAnimals = animals.map(animal =>
                animal.id === updatedAnimal.id ? { ...animal, ...updatedAnimal } : animal
            );
            setAnimals(updatedAnimals);
            showSnackbar('Animal edited successfully.', 'success');
        } catch (error) {
            console.error('Error editing animal:', error);
            showSnackbar('Failed to edit animal. Please try again.', 'error');
        }
    };

    // Function to handle adding a new animal
    const handleAddAnimal = async (newAnimal: Animal) => {
        try {
            setAnimals(prevAnimals => [...prevAnimals, newAnimal]);
            showSnackbar('Animal added successfully.', 'success');
        } catch (error) {
            console.error('Error adding animal:', error);
            showSnackbar('Failed to add animal. Please try again.', 'error');
        }
    };

    // Filtered animals based on the filter state
    const filteredAnimals = animals.filter(animal => animal.name.toLowerCase().includes(filter.toLowerCase()));

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
                Animals
            </Typography>
            <AddAnimalForm onAddAnimal={handleAddAnimal} />
            {loading ? (
                <div className='loading-center'>
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <Filter filter={filter} setFilter={setFilter} />
                    <AnimalTable
                        animals={filteredAnimals}
                        onBanAnimal={handleBanAnimal}
                        onDeleteAnimal={handleDeleteAnimal}
                        onUpdateAnimal={handleUpdateAnimal}
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

export default AnimalsPage;
