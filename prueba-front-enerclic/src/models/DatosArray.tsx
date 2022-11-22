import { ISelect } from "./ModeloSelect";
import { ITipo } from "./ModeloTipo";

export const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];  
export const Api = 'https://apidatos.ree.es/';

export const idiomas : ISelect[] = [{key : 'Español', value : 'es', datos : [{key : 'Español', value : 'es'}]},{key : 'Inglés', value : 'en', datos : [{key : 'Inglés', value : 'en'}]}];
const arrayBalance : ITipo[] = [{key: 'balance-electrico', value: 'balance-electrico'}];
const arrayDemanda : ITipo[] = [{key: 'variacion-componentes', value: 'variacion-componentes'}];
const arrayGeneracion : ITipo[] = [{key: 'evolucion-renovable-no-renovable', value: 'evolucion-renovable-no-renovable'}];
const arrayIntercambios : ITipo[] = [{key: 'francia-frontera', value: 'francia-frontera'}, {key: 'portugal-frontera', value: 'portugal-frontera'}];
const arrayTransporte : ITipo[] = [{key: 'indice-indisponibilidad', value: 'indice-indisponibilidad'}];

export const categorias : ISelect[] = [ {key : 'Balance', value : 'balance', datos : arrayBalance},
                                        {key : 'Demanda', value : 'demanda', datos : arrayDemanda},
                                        {key : 'Generacion', value : 'generacion', datos : arrayGeneracion},
                                        {key : 'Intercambios', value : 'intercambios', datos : arrayIntercambios},
                                        {key : 'Transporte', value : 'transporte', datos : arrayTransporte}];

const arrayBalanceTipo : ITipo[] = [{key : 'Renovable', value : 'renovable'}, {key : 'No renovable', value : 'no-renovable'},{key : 'Demanda', value : 'Demanda'}];
const arrayVariazionComponentesTipo : ITipo[] = [{key : 'Laboralidad', value : 'Laboralidad'}, {key : 'Temperatura', value : 'Temperatura'},{key : 'Demanda corregida', value : 'Demanda corregida'},{key : 'Variacion de la demanda', value : 'Variacion de la demanda'}];
const arrayEstructuraGeneracionTipo : ITipo[] = [{key : 'Estructura generacion', value : 'estructura-generacion'}, {key : 'Evolucion renovable no renovable', value : 'evolucion-renovable-no-renovable'}];
const arrayEvolucionRenovableNoRenovableTipo : ITipo[] = [{key : 'Renovable', value : 'Renovable'}, {key : 'No renovable', value : 'No renovable'}];
const arrayIntercambiosTipo : ITipo[] = [{key : 'Exportación', value : 'Exportación'}, {key : 'Importación', value : 'Importación'}, {key : 'Saldo', value : 'saldo'}];
const arrayIndiceDisponibilidadTipo : ITipo[] = 
[{key : 'Programada por mantenimiento preventivo y predictivo', value : 'Programada por mantenimiento preventivo y predictivo'}, 
{key : 'Programada por causas ajenas al mantenimiento', value : 'Programada por causas ajenas al mantenimiento'}, 
{key : 'No programada debida a mantenimiento correctivo', value : 'No programada debida a mantenimiento correctivo'}, 
{key : 'No programada debida a circunstancias fortuitas', value : 'No programada debida a circunstancias fortuitas'}, 
{key : 'Causa de fuerza mayor o acciones de terceros', value : 'Causa de fuerza mayor o acciones de terceros'}, 
{key : 'Sin clasificar', value : 'Sin clasificar'}, 
{key : 'Indisponibilidad mensual total de la red de transporte', value : 'Indisponibilidad mensual total de la red de transporte'}];

export const listaTipos : ISelect[] = [ {key : 'Balance electrico', value : 'balance-electrico', datos : arrayBalanceTipo},
                                        {key : 'Variacion componentes', value : 'variacion-componentes', datos : arrayVariazionComponentesTipo},
                                        {key : 'Intercambios', value : 'intercambios', datos : arrayEstructuraGeneracionTipo},
                                        {key : 'Evolucion renovable no renovable', value : 'evolucion-renovable-no-renovable', datos : arrayEvolucionRenovableNoRenovableTipo},
                                        {key : 'Francia frontera', value : 'francia-frontera', datos : arrayIntercambiosTipo},
                                        {key : 'Portugal frontera', value : 'portugal-frontera', datos : arrayIntercambiosTipo},
                                        {key : 'Indice indisponibilidad', value : 'indice-indisponibilidad', datos : arrayIndiceDisponibilidadTipo}];
