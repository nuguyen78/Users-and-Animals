import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import AnimalsPage from './pages/AnimalsPage';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const App: React.FC = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Users and Animals
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Users</Button>
                    <Button color="inherit" component={Link} to="/animals">Animals</Button>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px', marginBottom: '50px'}}>
                <Routes>
                    <Route path="/" element={<UsersPage />} />
                    <Route path="/animals" element={<AnimalsPage />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
