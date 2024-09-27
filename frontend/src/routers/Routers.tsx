import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from '../pages/SignIn';
import Home from '../pages/Home';
import { useAppSelector } from '../helpers/CostumHook';

const Routers: React.FC = () => {
  const { userName } = useAppSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={userName ? <Navigate to="/home" replace /> : <SignUp />} />
      <Route path="/home" element={userName ? <Home /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default Routers;
