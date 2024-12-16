import React from 'react';
import CoreButton from '../core/button/button.tsx';
import useLogout from '../../hooks/useLogout.ts';

interface LogoutButtonProps {
  closeSocket: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ closeSocket }) => {
  const logout = useLogout(closeSocket);

  return (
    <CoreButton variant="contained" color="secondary" onClick={logout}>
      Logout
    </CoreButton>
  );
};

export default LogoutButton;
