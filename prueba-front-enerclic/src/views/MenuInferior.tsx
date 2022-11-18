import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography/Typography';

function MenuSuperior() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#333' }}>
        <Toolbar variant="dense">
            <Typography variant="h6"  sx={{ flexGrow: 1, color: '#f37840' }}>
                Prueba Frontend Enerclic 2022 ©
            </Typography>
        </Toolbar>
    </AppBar>
  );
}

export default MenuSuperior;
