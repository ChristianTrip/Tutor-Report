// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import MainPage from './MainPage';
import LoginForm from "./components/LoginForm";
import TopNavigationBar from "./components/NavigationBar";
import ReportFormFull from "./components/ReportForm";
import ReportList from "./components/ReportList";
import AdminPage from "./components/AdminPage";

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const userRoles = localStorage.getItem('roles')?.split(',');

    // Check if the current route is the login page
    const isLoginPage = location.pathname === '/login';

    // Check if the user is authenticated
    const isAuthenticated = !!token;

    // Check if the user has the 'admin' role
    const isAdmin = isAuthenticated && userRoles!.includes('ADMIN');

    return (
        <>
            {!isLoginPage && <TopNavigationBar showAdminTab={isAdmin} />} {/* Pass isAdmin to TopNavigationBar */}
            <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/report-list" component={ReportList} />
                <Route path="/create-report" component={ReportFormFull} />
                {isAdmin && <Route path="/admin" component={AdminPage} />} {/* Only render if isAdmin is true */}
                {/* Add other routes as needed */}
            </Switch>
        </>
    );
};

export default App;
