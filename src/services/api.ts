import axios from 'axios';

const BASE_URL = 'https://inqool-interview-api.vercel.app/api';

export const api = axios.create({
  baseURL: BASE_URL,
});

// User Endpoints
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (user: { name: string; gender: string; banned: boolean }) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const banUser = async (id: string, user: Partial<{ name: string; gender: string; banned: boolean }>) => {
  const response = await api.patch(`/users/${id}`, user);
  return response.data;
};

export const updateUser = async (id: string, user: Partial<{ name: string; type: string; age: number }>) => {
  const response = await api.patch(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Animal Endpoints
export const getAnimals = async () => {
  const response = await api.get('/animals');
  return response.data;
};

export const createAnimal = async (animal: { name: string; type: string; age: number }) => {
  const response = await api.post('/animals', animal);
  return response.data;
};

export const banAnimal = async (id: string, animal: Partial<{ name: string; type: string; banned: boolean }>) => {
  const response = await api.patch(`/animals/${id}`, animal);
  return response.data;
};

export const updateAnimal = async (id: string, animal: Partial<{ name: string; type: string; age: number }>) => {
  const response = await api.patch(`/animals/${id}`, animal);
  return response.data;
};

export const deleteAnimal = async (id: string) => {
  const response = await api.delete(`/animals/${id}`);
  return response.data;
};

// Seed Endpoint
export const seedDatabase = async () => {
  const response = await api.post('/seed');
  return response.data;
};
