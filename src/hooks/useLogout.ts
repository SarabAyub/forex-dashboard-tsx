import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useIdleTimer } from 'react-idle-timer';
import { toast } from 'react-toastify';
import { clearSessionId } from '../features/sessionSlice.ts';

type UseLogout = (closeSocket: () => void) => () => void;

const useLogout: UseLogout = (closeSocket) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(() => {
    dispatch(clearSessionId());
    closeSocket();
    navigate('/login');
    toast.success('You have been logged out.');
  }, [dispatch, closeSocket, navigate]);

  useIdleTimer({
    timeout: 1000 * 20 * 60,
    onIdle: () => {
      toast.warning('You will be logged out in 15 seconds due to inactivity.', {
        toastId: 'idle-warning',
      });
      logoutTimeoutRef.current = setTimeout(logout, 15 * 1000);
    },
    onActive: () => {
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
      toast.dismiss();
    },
    debounce: 500,
  });

  return logout;
};

export default useLogout;
