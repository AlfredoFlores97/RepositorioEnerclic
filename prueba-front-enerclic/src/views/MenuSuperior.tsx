import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function MenuSuperior() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <img src="enerclic-color.svg" alt="enerclic" style={{ height: "9vh", width: "18vh" }}/>
        </Toolbar>
    </AppBar>
  );
}

export default MenuSuperior;
