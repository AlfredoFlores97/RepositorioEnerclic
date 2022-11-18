import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { idiomas, categorias, listaTipos} from '../models/DatosArray';
import Grid from '@mui/material/Grid/Grid';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Grafico from '../components/Grafico';
import Divider from '@mui/material/Divider/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { IDataSets } from '../models/ModeloDatosChart';

export default function Formulario() {
    const [lenguaje, setLenguaje] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [widget, setWidget] = useState<string>('');
    const [arrayWidget, setArrayWidget] = useState<string[]>([]);
    const [arrayTipos, setArrayTipos] = useState<string[]>([]);
    const [carga, setCarga] = useState<boolean>(false);
    const [tipo, setTipo] = useState<number>(0);
    const [datosChart, setDatosChart] = useState<IDataSets[]>([]);
    
    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const Api = 'https://apidatos.ree.es/';

    const handleChangeCategoria = (e: { target: { value: SetStateAction<string>; }; }) => {
      setWidget('');
      setArrayTipos([]);
      setArrayWidget([]);
      setCategoria(e.target.value);
      for (let cat of categorias){
        if(cat.nombre === e.target.value)
        {
          setArrayWidget(cat.widget);
        }
      }
    };

    const handleChangeWidget = (e: { target: { value: SetStateAction<string>; }; }) => {
      setWidget(e.target.value);
      for (let tip of listaTipos){
        if(tip.nombre === e.target.value)
        {
          setArrayTipos(tip.tipo);
        }
      }
    };

    const handleChangeTipo = (e: { target: { value: SetStateAction<string>; }; }) => {
      setTipo(Number(e.target.value));
    };

    const onFormSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setCarga(true);
      setDatosChart([]);
      axios.get(`${Api}${lenguaje}/datos/${categoria}/${widget}?start_date=2021-01-01&end_date=2021-12-31&time_trunc=month`)
        .then((res) => {
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
          console.log(error);
        })
        .finally(()=>{
          setCarga(false);
        });
    };
  
    useEffect(()=>{
      setTipo(0);
    },[arrayTipos])

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
                  <InputLabel id="language">Langauge</InputLabel>
                  <Select
                      name="language"
                      labelId="language"
                      id="language"
                      value={lenguaje}
                      label="language"
                      required
                      onChange={(e) => {setLenguaje(e.target.value)}}
                  >
                    {idiomas.map((elem, index) => {
                          return (
                            <MenuItem key={index} value={elem.value}>
                              {elem.key}
                            </MenuItem>
                          );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{  marginTop: 2, marginBottom: 2 }}>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                      name="category"
                      labelId="category"
                      id="category"
                      value={categoria}
                      label="category"
                      required
                      onChange={handleChangeCategoria}
                  >
                    {categorias.map((elem, index) => {
                          return (
                            <MenuItem key={elem.nombre+index} value={elem.nombre}>
                              {elem.nombre}
                            </MenuItem>
                          );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{  marginTop: 2, marginBottom: 2 }}>
                  <InputLabel id="widget">Widget</InputLabel>
                  <Select
                      name="widget"
                      labelId="widget"
                      id="widget"
                      value={widget}
                      label="widget"
                      required
                      onChange={handleChangeWidget}
                  >
                    {arrayWidget.map((elem, index) => {
                          return (
                            <MenuItem key={elem+index} value={elem}>
                              {elem}
                            </MenuItem>
                          );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid container sx={{ml: 2}} >
                {widget &&
                  <FormControl>
                    <FormLabel id="tipo" sx={{textAlign: 'left'}}>Tipo</FormLabel>
                    <RadioGroup
                      defaultValue={0}
                      onChange={handleChangeTipo}
                    >
                      {arrayTipos.map((elem, index) => {
                          return (
                            <FormControlLabel
                              key={elem+index}
                              value={index}
                              control={<Radio />}
                              label={elem.charAt(0).toUpperCase() + elem.slice(1)}
                            />
                          );
                      })}
                    </RadioGroup>
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
            datosChart.length>0 &&
              <>
                <Divider/>
                <Grafico datos={{labels, datasets : datosChart}} />
              </>
          }
        </CardContent>
      </Card>
    </Box>
  );
}