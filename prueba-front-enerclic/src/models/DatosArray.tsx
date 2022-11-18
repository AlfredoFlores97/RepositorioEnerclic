import { ICategoria } from "./ModeloCategoria";
import { ITipo } from "./ModeloTipo";

export const idiomas : {key : string, value : string}[] = [{key : 'Español', value : 'es'},{key : 'Inglés', value : 'en'}];
const arrayBalance : string[] = ['balance-electrico'];
const arrayDemanda : string[] = ['variacion-componentes'];
const arrayGeneracion : string[] = ['evolucion-renovable-no-renovable'];
const arrayIntercambios : string[] = ['francia-frontera', 'portugal-frontera'];
const arrayTransporte : string[] = ['energia-no-suministrada-ens', 'indice-indisponibilidad'];

export const categorias : ICategoria[]= [{nombre : 'balance', widget : arrayBalance},
                                        {nombre : 'demanda', widget : arrayDemanda},
                                        {nombre : 'generacion', widget : arrayGeneracion},
                                        {nombre : 'intercambios', widget : arrayIntercambios},
                                        {nombre : 'transporte', widget : arrayTransporte}];

const arrayBalanceTipo : string[] = ['renovable','no-renovable','Demanda'];
const arrayVariazionComponentesTipo : string[] = ['Laboralidad','Temperatura','Demanda corregida','Variacion de la demanda'];
const arrayEstructuraGeneracionTipo : string[] = ['estructura-generacion', 'evolucion-renovable-no-renovable'];
const arrayEvolucionRenovableNoRenovableTipo : string[] = ['Renovable', 'No renovable'];
const arrayIntercambiosTipo : string[] = ['Exportación', 'Importación', 'saldo'];
const arrayIndiceDisponibilidadTipo : string[] = ['Programada por mantenimiento preventivo y predictivo','Programada por causas ajenas al mantenimiento','No programada debida a mantenimiento correctivo','No programada debida a circunstancias fortuitas','Causa de fuerza mayor o acciones de terceros','Sin clasificar','Indisponibilidad mensual total de la red de transporte'];

export const listaTipos : ITipo[]= [{nombre : 'balance-electrico', tipo : arrayBalanceTipo},
                                {nombre : 'variacion-componentes', tipo : arrayVariazionComponentesTipo},
                                {nombre : 'intercambios', tipo : arrayEstructuraGeneracionTipo},
                                {nombre : 'evolucion-renovable-no-renovable', tipo : arrayEvolucionRenovableNoRenovableTipo},
                                {nombre : 'francia-frontera', tipo : arrayIntercambiosTipo},
                                {nombre : 'portugal-frontera', tipo : arrayIntercambiosTipo},
                                {nombre : 'indice-indisponibilidad', tipo : arrayIndiceDisponibilidadTipo}];
