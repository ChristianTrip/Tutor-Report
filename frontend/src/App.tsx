// src/App.tsx
import React from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from "./Login";
import CreateReportPage from "./CreateReportPage";
import NavigationBar from './NavigationBar';

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent: React.FC = () => {
    const location = useLocation();

    // Check if the current route is the login page
    const isLoginPage = location.pathname === '/login';

    return (
        <>
            {!isLoginPage && <NavigationBar />} {/* Render NavigationBar for all pages except the login page */}
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/dashboard" component={MainPage} />
                <Route path="/create-report" component={CreateReportPage} />
                {/* Add other routes as needed */}
            </Switch>
        </>
    );
};

export default App;
