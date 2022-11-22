import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { SetStateAction, useState } from 'react';
import { idiomas, categorias, listaTipos, Api, labels } from '../models/DatosArray';
import Grid from '@mui/material/Grid/Grid';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Grafico from '../components/Grafico';
import Divider from '@mui/material/Divider/Divider';
import { IDataSets } from '../models/ModeloDatosChart';
import ComponentSelect from '../components/Select';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import { ITipo } from '../models/ModeloTipo';
import Alert from '@mui/material/Alert/Alert';
import ComponentRadioGroup from '../components/RadioGroup';

export default function Formulario() {
    const [mensajeError, setMensajeError] = useState<string|null>(null);
    const [lenguaje, setLenguaje] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [widget, setWidget] = useState<string>('');
    const [arrayWidget, setArrayWidget] = useState<ITipo[]>([]);
    const [arrayTipos, setArrayTipos] = useState<ITipo[]>([]);
    const [carga, setCarga] = useState<boolean>(false);
    const [tipo, setTipo] = useState<number>(0);
    const [datosChart, setDatosChart] = useState<IDataSets[]>([]);
    
    const handleChangeLenguaje = (e: { target: { value: SetStateAction<string> } }) => {
      setLenguaje(e.target.value);
    };

    const handleChangeCategoria = (e: { target: { value: SetStateAction<string>} }) => {
      setCategoria(e.target.value);
      const found = categorias.find(element => element.value === e.target.value);
      if (found) {
        setArrayWidget(found.datos);
        setWidget('');
        setArrayTipos([]);
      } else{
        setMensajeError('No existen categorias para el widget seleccionado');
      }
    };

    const handleChangeWidget = (e: { target: { value: SetStateAction<string> } }) => {
      setWidget(e.target.value);
      const found = listaTipos.find(element => element.value === e.target.value);
      if (found) {
        setArrayTipos(found.datos)
        setTipo(0);
      } else{
        setMensajeError('No existen tipos para el widget seleccionado');
      }  
    };

    const handleChangeTipo = (e: { target: { value: SetStateAction<string>; }; }) => {
      setTipo(Number(e.target.value));
    };

    const onFormSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if (lenguaje !== '' && categoria !== '' && widget !== '') {
        setCarga(true);
        setDatosChart([]);
        axios.get(`${Api}${lenguaje}/datos/${categoria}/${widget}?start_date=2021-01-01&end_date=2021-12-31&time_trunc=month`)
          .then((res) => {
            setMensajeError(null);
            if(res.data.included[tipo].attributes.content) {
              let resul = res.data.included[tipo].attributes.content;
              resul.forEach(function(elem : {attributes : {title : string, color : string, values : {value : number}[]}},index :number ) {
                setDatosChart(datosChart=>[...datosChart,{
                  label: elem.attributes.title,
                  data: labels.map((month, index) => elem.attributes.values[index]?.value),
                  backgroundColor: elem.attributes.color,
                }])
              })
            } else if (res.data.included[tipo].attributes.values){
              setDatosChart(datosChart=>[...datosChart,{
                label: res.data.included[tipo].attributes.title,
                data: labels.map((month, index) => res.data.included[tipo].attributes.values[index]?.value),
                backgroundColor: res.data.included[tipo].attributes.color,
              }])
            }
          })
          .catch((error) => {
            setMensajeError(error.message);
          })
          .finally(()=>{
            setCarga(false);
          });
        } else {
          setMensajeError("Faltan datos para cargar el gráfico");
        }
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card variant="outlined" sx={{my :2}}>
        <CardHeader
          sx={{backgroundColor: "#333", color: "#f37840"}}
          title="Formulario de la Red Eléctrica"
        />
        <CardContent>
          <form onSubmit={onFormSubmit}>
            <Grid container spacing={2} sx={{mb :2}}>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{  marginTop: 2, marginBottom: 2 }}>
                    <InputLabel id="language">Language</InputLabel>
                    <ComponentSelect nombre="language" value={lenguaje} required opciones={idiomas} function={handleChangeLenguaje}/>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{  marginTop: 2, marginBottom: 2 }}>
                    <InputLabel id="category">Category</InputLabel>
                    <ComponentSelect nombre="category" value={categoria} required opciones={categorias} function={handleChangeCategoria}/>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{  marginTop: 2, marginBottom: 2 }}>
                    <InputLabel id="widget">Widget</InputLabel>
                    <ComponentSelect nombre="widget" value={widget} required opciones={arrayWidget} function={handleChangeWidget}/>
                </FormControl>
              </Grid>
              <Grid container sx={{ml: 2}} >
                {widget &&
                  <FormControl>
                    <FormLabel id="tipo" sx={{textAlign: 'left'}}>Tipo</FormLabel>
                      <ComponentRadioGroup nombre="tipo" value={tipo} opciones={arrayTipos} function={handleChangeTipo}/>
                  </FormControl>
                }
              </Grid>
              <Grid 
                justifyContent="flex-start"
                alignItems="flex-start" 
                item 
              >
                <Button type='submit' variant="outlined" sx={{backgroundColor: '#f37840', borderColor: '#333', color: '#333'}}>
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
          {carga ?
            <CircularProgress />
            :
            !mensajeError ?
              datosChart.length>0 &&
                <>
                  <Divider/>
                  <Grafico datos={{labels, datasets : datosChart}} />
                </>
              :
                <>
                  <Alert severity="error">{mensajeError}</Alert>
                </>
          }
        </CardContent>
      </Card>
    </Box>
  );
}