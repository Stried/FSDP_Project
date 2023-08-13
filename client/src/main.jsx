import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { StyledEngineProvider } from '@mui/styled-engine'

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  
);
