// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QRGenerator from './QRGenerator';

const App = () => {
  return (
      <div className="card p-4">
        <h1 className="text-center mb-4">Generador de QR</h1>
        <QRGenerator />
      </div>
  );
};

export default App;
