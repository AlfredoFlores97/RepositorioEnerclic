import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Component } from 'react';
import { t } from "i18next";
import { Bar } from 'react-chartjs-2';
import { IDatosChart } from '../models/ModeloDatosChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
        position: 'top' as const
    },
    title: {
      display: true,
      text: t('Datos del año 2021'),
    },
  },
};

interface Props {
    datos : IDatosChart
}

class Grafico extends Component<Props> { 
    render() {
        return (
            <Bar options={options} data={this.props.datos} />
        )
    }
}

export default Grafico