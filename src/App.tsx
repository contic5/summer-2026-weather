import { useEffect, useState } from 'react'
import './App.css'
import get_data from './read_excel';
function App() {
  const [excel_data, setExcelData] = useState<Record<any,any>[]>([]);
  const [table_headings,setTableHeadings]=useState<React.JSX.Element[]>();
  const [table_rows,setTableRows]=useState<React.JSX.Element[]>();

  useEffect(()=>
  {
    async function async_wrapper()
    {
      if(excel_data.length==0)
      {
        const excel_data_temp=await get_data("MOCK_DATA.xlsx","data_short");
        console.log(excel_data_temp);
        setExcelData(excel_data_temp);
      }
    }
    async_wrapper();
  },[]);

  //Set up data entry cell.
  function handle_cell(value:any,column_number:number,row_number:number)
  {
    return (<td key={`td_${row_number},${column_number}`}>{value}</td>);
  }

  //Loop through each input row
  function handle_row(row:Record<any, any>,row_number:number)
  {
    let values=Object.values(row);
    return(<tr key={ `tr_${row_number}`}>
    {
      values.map((value: any,column_number: number) => handle_cell(value,column_number,row_number))
    }
    </tr>);
  }

  useEffect(()=>
  {
    if(excel_data.length>0)
    {
      console.log(excel_data);
      let columns=Object.keys(excel_data[0]);
      const table_headings_temp=columns.map(column=><th key={`th_${column}`}>{column}</th>);
      setTableHeadings(table_headings_temp);

      const table_rows_temp=excel_data.map((row,row_number)=>handle_row(row,row_number));
      setTableRows(table_rows_temp);
    }
  },[excel_data])
  return (
    <>
    <h1>React Excel Template</h1>
    <table className="table table-striped">
    <thead>
    <tr>
    {table_headings}
    </tr>
    </thead>
    <tbody>
    {table_rows}
    </tbody>
    </table>
    </>
  )
}

export default App
