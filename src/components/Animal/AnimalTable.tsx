import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BanIcon from '@mui/icons-material/Block';
import EditAnimalForm from './EditAnimalForm'; // Assuming you have EditAnimalForm component
import { Animal } from "../../pages/AnimalsPage"; // Adjust import

interface AnimalTableProps {
  animals: Animal[],
  onBanAnimal: (id: string) => void,
  onDeleteAnimal: (id: string) => void,
  onUpdateAnimal: (animal: Animal) => void
}

const AnimalTable: React.FC<AnimalTableProps> = ({ animals, onBanAnimal, onDeleteAnimal, onUpdateAnimal }) => {
  const [isEditAnimalFormVisible, setEditAnimalFormVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const handleEditAnimal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setEditAnimalFormVisible(true);
  };

  const handleClose = () => {
    setEditAnimalFormVisible(false);
    setSelectedAnimal(null);
  };

  return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animals.map(animal => (
                  <TableRow key={animal.id}>
                    <TableCell>{animal.name}</TableCell>
                    <TableCell>{animal.type}</TableCell>
                    <TableCell>{animal.age}</TableCell>
                    <TableCell>
                      {isEditAnimalFormVisible && selectedAnimal && (
                          <div className="edit-modal">
                            <EditAnimalForm animal={selectedAnimal} onClose={handleClose} onUpdateAnimal={onUpdateAnimal} />
                          </div>
                      )}
                      <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditAnimal(animal)}
                          startIcon={<EditIcon />}
                          style={{ marginRight: '8px' }}
                      >
                        Edit Animal
                      </Button>
                      <IconButton color="secondary" onClick={() => onBanAnimal(animal.id)}>
                        <BanIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => onDeleteAnimal(animal.id)}>
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

export default AnimalTable;
