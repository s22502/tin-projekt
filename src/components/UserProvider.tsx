"use client";

import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";
import { type User } from "@prisma/client";

interface Props {
  children: ReactNode;
  initialUser: User | null;
}

interface ContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<ContextProps>({
  user: null,
  setUser: () => {
    console.log("error");
  },
});

const UserProvider: React.FC<Props> = ({ children, initialUser }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
