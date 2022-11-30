import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid/Grid';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import Button from '@mui/material/Button/Button';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Alert from '@mui/material/Alert/Alert';
import axios from 'axios';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSVLink } from "react-csv";
import { ITipo } from '../models/ModeloTipo';
import { IDataSets } from '../models/ModeloDatosChart';
import { IDataTabla } from '../models/ModeloDatoTabla';
import { IModeloCabecera } from '../models/ModeloCabecera';
import { idiomas, categorias, listaTipos, Api, labels, labelsIngles, cabeceraTablaEspañol, cabeceraTablaIngles } from '../models/DatosArray';
import ComponentSelect from '../components/Select';
import ComponentRadioGroup from '../components/RadioGroup';
import Grafico from '../components/Grafico';
import Tabla from '../components/Tabla';

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
    const [datosTabla, setDatosTabla] = useState<IDataTabla[]>([]);
    const [datosCsv, setDatosCsv] = useState<IDataTabla[]>([]);
    const [label, setLabel] = useState<string[]>([]);
    const [cabeceraTabla, setCabeceraTabla] = useState<IModeloCabecera[]>([]);
    const { t, i18n } = useTranslation();
    
    const handleChangeLenguaje = (e: { target: { value: SetStateAction<string> } }) => {
      setLenguaje(e.target.value);
      setLabel(e.target.value === 'es' ? labels : labelsIngles);
      if(e.target.value === 'es'){
        i18n.changeLanguage('es');
      }else{
        i18n.changeLanguage('en');
      }
    };

    const handleChangeCategoria = (e: { target: { value: SetStateAction<string>} }) => {
      setCategoria(e.target.value);
      const found = categorias.find(element => element.value === e.target.value);
      if (found) {
        setArrayWidget(found.datos);
        setWidget('');
        setArrayTipos([]);
      } else{
        setMensajeError(t('No existen categorias para el widget seleccionado'));
      }
    };

    const handleChangeWidget = (e: { target: { value: SetStateAction<string> } }) => {
      setWidget(e.target.value);
      const found = listaTipos.find(element => element.value === e.target.value);
      if (found) {
        setArrayTipos(found.datos)
        setTipo(0);
      } else{
        setMensajeError(t('No existen categorias para el widget seleccionado'));
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
        setDatosTabla([]);
        setDatosCsv([]);
        axios.get(`${Api}${lenguaje}/datos/${categoria}/${widget}?start_date=2021-01-01&end_date=2021-12-31&time_trunc=month`)
          .then((res) => {
            setMensajeError(null);
            setCabeceraTabla(lenguaje === 'es' ? cabeceraTablaEspañol : cabeceraTablaIngles)
            if(res.data.included[tipo].attributes.content) {
              let resul = res.data.included[tipo].attributes.content;
              resul.forEach(function(elem : {attributes : {title : string, color : string, values : {value : number, percentage: number}[]}},index :number ) {
                label.forEach(function (month,index) {
                  setDatosTabla(datosTabla=>[...datosTabla,{
                    tipo: elem.attributes.title,
                    mes: month,
                    valor: elem.attributes.values[index]?.value ? Number(elem.attributes.values[index]?.value.toFixed(2)) : 0,
                    porcentaje: elem.attributes.values[index]?.percentage ? Number(elem.attributes.values[index]?.percentage.toFixed(2)) : 0
                  }])
                  setDatosCsv(datosCsv=>[...datosCsv,{
                    tipo: elem.attributes.title,
                    mes: month,
                    valor: elem.attributes.values[index]?.value ? Number(elem.attributes.values[index]?.value) : 0,
                    porcentaje: elem.attributes.values[index]?.percentage ? Number(elem.attributes.values[index]?.percentage) : 0
                  }])
                })
                setDatosChart(datosChart=>[...datosChart,{
                  label: elem.attributes.title,
                  data: labels.map((month, index) => elem.attributes.values[index]?.value),
                  backgroundColor: elem.attributes.color,
                }])
              })
            } else if (res.data.included[tipo].attributes.values){
              label.forEach(function(month,index) {
                setDatosTabla(datosTabla=>[...datosTabla,{
                  tipo: res.data.included[tipo].attributes.title,
                  mes: month,
                  valor: res.data.included[tipo].attributes.values[index]?.value ? Number(res.data.included[tipo].attributes.values[index]?.value.toFixed(2)) : 0,
                  porcentaje: res.data.included[tipo].attributes.values[index]?.percentage ? Number(res.data.included[tipo].attributes.values[index]?.percentage.toFixed(2)) : 0
                }])
                setDatosCsv(datosCsv=>[...datosCsv,{
                  tipo: res.data.included[tipo].attributes.title,
                  mes: month,
                  valor: res.data.included[tipo].attributes.values[index]?.value ? Number(res.data.included[tipo].attributes.values[index]?.value) : 0,
                  porcentaje: res.data.included[tipo].attributes.values[index]?.percentage ? Number(res.data.included[tipo].attributes.values[index]?.percentage) : 0
                }])
              })
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
          setMensajeError(t("Faltan datos para cargar el gráfico"));
        }
    };

  return (
    <Grid container justifyContent="center" columns={19} spacing={1}>
      <Grid item xs={17} md={17} lg={9}>
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
                      <InputLabel id="language">{t("Language")}</InputLabel>
                      <ComponentSelect nombre="language" value={lenguaje} required opciones={idiomas} function={handleChangeLenguaje}/>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{  marginTop: 2, marginBottom: 2 }}>
                      <InputLabel id="category">{t("Category")}</InputLabel>
                      <ComponentSelect nombre="category" value={categoria} required opciones={categorias} function={handleChangeCategoria}/>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{  marginTop: 2, marginBottom: 2 }}>
                      <InputLabel id="widget">{t("Widget")}</InputLabel>
                      <ComponentSelect nombre="widget" value={widget} required opciones={arrayWidget} function={handleChangeWidget}/>
                  </FormControl>
                </Grid>
                <Grid container sx={{ml: 2}} >
                  {widget &&
                    <FormControl>
                      <FormLabel id="tipo" sx={{textAlign: 'left'}}>{t("Tipo")}</FormLabel>
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
                    {t("Enviar")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={17} md={17} lg={9} >
        <Card variant="outlined" sx={{my: 2}}>
          <CardHeader
            sx={{backgroundColor: "#333", color: "#f37840"}}
            title="Resultados de la Red Eléctrica"
            action={
              <Button variant="contained" color='warning' disabled={datosTabla.length===0}>
                <CSVLink filename={'Datos'} data={datosCsv} headers={cabeceraTabla} separator={";"} style={{color: datosTabla.length===0 ? 'gray' : 'white'}} >Descargar</CSVLink>
              </Button> 
            }
          />   
          <CardContent className='overflow tamanoCard'>
            {carga ?
                <CircularProgress />
              :
              !mensajeError ?
                datosChart.length>0 && datosTabla.length>0 &&
                  <>
                    <Tabla cabecera={cabeceraTabla} datos={datosTabla}/>
                    <Grafico datos={{labels: label, datasets : datosChart}} />
                  </>
                :
                  <Alert severity="error">{mensajeError}</Alert>
            }
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}