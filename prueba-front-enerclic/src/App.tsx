import MenuSuperior from './views/MenuSuperior';
import './App.css';
import MenuInferior from './views/MenuInferior';
import Grid from '@mui/material/Grid/Grid';
import Formulario from './views/Formulario';

function App() {
  return (
    <div className="App">
      <MenuSuperior/>
      <Grid container spacing={2}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={10}>
          <Formulario/>
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>
      <MenuInferior/>
    </div>
  );
}

export default App;
