
import {ThemeProvider} from '@mui/material/styles';
import React from 'react';
import SearchPage from './pages/searchpage';
import { theme } from './theme';
import "./App.css"
import { CssBaseline, Typography } from '@mui/material';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
      <div className="App">
        <header className="App-header">
        </header>
        <Typography id="header" variant="h1" component="div" gutterBottom>
          TMDB-UI
        </Typography>
          <SearchPage></SearchPage>
      </div>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
