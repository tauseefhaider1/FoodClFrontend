// client/src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const userCookie = Cookies.get('user');
    const companyCookie = Cookies.get('company');

    if (!token) return;

    let user = null;
    let userType = 'user';

    try {
      if (companyCookie) {
        user = JSON.parse(companyCookie);
        userType = 'company';
      } else if (userCookie) {
        user = JSON.parse(userCookie);
      }
    } catch (err) {
      console.error('Cookie parse error:', err);
      return;
    }

    if (!user?._id) return;

    const socketInstance = io('http://localhost:3000', {
      auth: {
        token,
        userId: user._id,
        userType,
      },
      transports: ['websocket'],
      withCredentials: true,
    });

    socketInstance.on('connect', () => {
      console.log('✅ Socket connected:', socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, []); // ✅ correct dependency

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};