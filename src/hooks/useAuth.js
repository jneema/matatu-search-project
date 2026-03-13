import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const mockUser = {
        id: 1,
        name: "Admin User",
        email: "admin@matatufinder.co.ke",
        role: "admin",
      };

      const isLoggedIn = true;

      if (isLoggedIn) {
        setUser(mockUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, []);

  return { user, isLoading };
};

export default useAuth;
