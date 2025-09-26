import React from "react";
import { useEffect } from 'react';
import Routes from "./Routes";
import { initGA } from './lib/analytics';

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
  }, []);

  return (
    <Routes />
  );
}

export default App;
