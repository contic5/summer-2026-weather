import { useEffect, useState } from 'react'
import './App.css'
import get_data from './read_excel';
import Data_Chart from './Data_Chart';
import { to_averages_dictionary } from './shared';

//const month_columns=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const summer_columns=["Jun","Jul","Aug"];

function App() {
  const [excel_data, setExcelData] = useState<Record<any,any>[]>([]);
  const [charts,setCharts]=useState<React.JSX.Element[]>();

  useEffect(()=>
  {
    async function async_wrapper()
    {
      if(excel_data.length==0)
      {
        const excel_data_temp=await get_data("US-Temperature-By-State.xlsx","Max-Temperature-Data");
        console.log(excel_data_temp);
        setExcelData(excel_data_temp);
      }
    }
    async_wrapper();
  },[]);

  useEffect(()=>
  {
    if(excel_data.length>0)
    {
      console.log(excel_data);
      let historical_average_data=to_averages_dictionary(excel_data,summer_columns);
      console.log(historical_average_data);

      let current_data=excel_data.filter(row=>row["Year"]==2026);
      let current_average_data=to_averages_dictionary(current_data,summer_columns);
      console.log(current_average_data);

      let charts_temp=[];
      let data_dictionary:Record<string,any>={"Historical Average Monthly Heat":historical_average_data,"2026 Monthly Heat":current_average_data}
      let comparison_chart=<Data_Chart title="2026 Monthly Heat vs<br>Historical Average Monthly Heat" data_dictionary={data_dictionary} month_columns={summer_columns} ></Data_Chart>
      charts_temp.push(comparison_chart);

      let difference_data:Record<string,any>={};
      for(let month_column of summer_columns)
      {
        difference_data[month_column]=current_average_data[month_column]-historical_average_data[month_column];
      }
      data_dictionary={"Heat Difference":difference_data};
      let difference_chart=<Data_Chart title="2025 Monthly Heat vs<br>Historical Average Monthly Heat Difference" data_dictionary={data_dictionary} month_columns={summer_columns} ></Data_Chart>
      charts_temp.push(difference_chart);

      setCharts(charts_temp);
    }
  },[excel_data])

  return (
    <>
    <h1>Summer 2026 Weather</h1>
    {charts}
    </>
  )
}

export default App
