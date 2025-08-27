import React from 'react';
import AppRoutes from "./routes";
import Sidebar from './components/ui/Sidebar';
import TransformationTemplatesPage from './components/transformations/TransformationTemplatesPage';
import TransformationTable from './components/transformations/TransformationTable';
import FooterComponent from './components/footer';
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <AppRoutes/>
      </div>
    </div>
  );
}

export default App;