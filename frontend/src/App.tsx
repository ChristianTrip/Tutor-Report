import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
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

    const isLoginPage = location.pathname === '/login';
    const isAuthenticated = !!token;
    const isAdmin = isAuthenticated && userRoles!.includes('ADMIN');

    return (
        <>
            {!isLoginPage && <TopNavigationBar showAdminTab={isAdmin} />}
            <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/report-list" component={ReportList} />
                <Route path="/create-report" component={ReportFormFull} />
                {isAdmin && <Route path="/admin" component={AdminPage} />}
            </Switch>
        </>
    );
};

export default App;
