import { CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Chart as ChartJS } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the scales and elements you need
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip);

const border_colors=["red","blue","green"];
const background_colors=["darkred","darkblue","darkgreen"];

function Data_Chart(props: any)
{
    const data_dictionary=props.data_dictionary;
    const title_lines=props.title.split("<br>");
    const title_lines_mapped=title_lines.map((line: any)=><>{line}<br></br></>);
    console.log(title_lines);

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
    datasets: datasets
    };

    const options = {
        plugins: {
          title: {
            display: true,
            // Pass an array of strings for multiple lines
            text: title_lines,
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 30
            }
          }
        }
    };

    return (<>
    <h2>
    {title_lines_mapped}
    </h2>
    <Line
    data={data}
    options={options}
    />
    </>);
}

export default Data_Chart;