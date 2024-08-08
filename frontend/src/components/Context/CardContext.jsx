import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
export const CardContext = createContext();

// Create a provider component
export const CardProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <CardContext.Provider value={{ users, loading, setUsers }}>
      {children}
    </CardContext.Provider>
  );
};

// Create a custom hook
export const useCard = () => {
  return useContext(CardContext);
};
