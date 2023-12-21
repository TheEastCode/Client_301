import { withAuth0 } from '@auth0/auth0-react';

const RequireAuth = ({ auth0, children }) => {
    if (!auth0.isAuthenticated) {
        // Optionally, redirect to login page or display a message
        return <p>User is not authenticated.</p>;
    }

    return children;
};

export default withAuth0(RequireAuth);
