import { CategoryScale, LinearScale, LineElement, PointElement, Tooltip,Legend,Chart as ChartJS } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the scales and elements you need
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement,Tooltip,Legend);

const border_colors=["red","blue","green"];
const background_colors=["darkred","darkblue","darkgreen"];

function Data_Chart(props: any)
{
    const data_dictionary=props.data_dictionary;
    console.log(data_dictionary);

    const labels=props.month_columns;
    let datasets=[];
    let color_index=0;
    for(let key in data_dictionary)
    {
      const dataset={
        label:key,
        data: labels.map((month:string) => data_dictionary[key][month]),
        borderColor:border_colors[color_index],
        backgroundColor:background_colors[color_index],
        tension:0.3
      }
      datasets.push(dataset);

      color_index+=1;
    }

    const data = {
    labels: labels,
    datasets: datasets,
    };

    return (<>
    <h2>{props.title}</h2>
    <Line
    data={data}
    />
    </>);
}

export default Data_Chart;