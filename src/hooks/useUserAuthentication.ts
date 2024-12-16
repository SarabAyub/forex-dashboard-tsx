import { useState, useEffect } from 'react';

interface Credentials {
  user: string;
  password: string;
  host: string;
  port: string;
}

interface ErrorState {
  user: string | null;
  password: string | null;
  host: string | null;
  port: string | null;
}

const useUserAuthentication = (credentials: Credentials) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({
    user: null,
    password: null,
    host: null,
    port: null,
  });

  useEffect(() => {
    const { user, password, host, port } = credentials;

    const validateCredentials = () => {
      const expectedUser = '62333850';
      const expectedPassword = 'tecimil4';
      const expectedHost = '78.140.180.198';
      const expectedPort = '443';

      const newError: ErrorState = {
        user: user === expectedUser ? null : 'Invalid username.',
        password: password === expectedPassword ? null : 'Invalid password.',
        host: host === expectedHost ? null : 'Invalid host.',
        port: port === expectedPort ? null : 'Invalid port.',
      };

      setError(newError);
      const allFieldsValid = Object.values(newError).every((fieldError) => fieldError === null);
      setIsAuthenticated(allFieldsValid);
    };

    validateCredentials();
  }, [credentials]);

  return { isAuthenticated, error };
};

export default useUserAuthentication;
