import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
export const CardContext = createContext();

// Create a provider component
export const CardProvider = ({ children }) => {
  
  const url = "http://localhost:3000";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(url + '/user/fetch');
        const result = await response.json();
        setUsers(Array.isArray(result.data) ? result.data : []); // Use result.data instead of result
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  
  

  return (
    <CardContext.Provider value={{ url, users, loading, setUsers }}>
      {children}
    </CardContext.Provider>
  );
};

// Create a custom hook
export const useCard = () => {
  return useContext(CardContext);
};