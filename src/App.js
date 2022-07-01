import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from './auth/Protected';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const Dashboard = React.lazy(() => import("./page/Dashboard"));
export const SearchContext = React.createContext('search');

const App = () => {
  const [searchValue, setValue] = useState("");
  return (
    <SearchContext.Provider value={{ state: searchValue, setValue }}>
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard"
          element={
            <React.Suspense fallback={<>...</>}>
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            </React.Suspense>
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/registration" element={<SignUp />} />
      </Routes>
    </SearchContext.Provider>
  )
}

export default App