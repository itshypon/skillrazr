import * as React from 'react';
// import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './css/Table.css';
import {internData} from './InternData';
import {cardsData} from './Data';



function createData(
  name: string,
  points: number,
  status: string,
) {
  return { name, points, status };
}

const rows = [
  createData('Himanshu' ,335 ,'Working'),
  createData('Mayank' ,337 ,'Reviewing'),
  createData('Ranjith' ,333 ,'Working'),
  createData('Rajiv' ,334 ,'Idle'),
  createData('Suraj' ,336 , 'Idle'),
];

const makeStyles = (status:string)=>{
    if(status === 'Working')
        {
            return {
                background: 'rgb(145 254 159 / 47%)',
                color: 'green',
            }
        }
        else if(status === 'Reviewing')
        {
            return{
                background: '#ffada8f',
                color: 'red',
            }
        }
        else{
            return{
                background: '#59bfff',
                color: 'white',
            }
        }
}

export default function BasicTable() {
  // const [click, setClick] = useState(false);
  // const [cardTitle, setCardTitle] = useState("");

  function handleClick(name:string){
    return ()=>{
    internData.map((item)=>{
      if(item.name===name){
        cardsData[0].value=item.numOfTasks;
        cardsData[1].value=item.codeReviews;
        cardsData[2].value=item.attendance;
      }
    })
    }
  }
  return (
    <div className="Table">
        <h3>Recent Orders</h3>
    <TableContainer component={Paper}
    style={{boxShadow:'0px 13px 20px 0px #80808029'}}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.points}</TableCell>
              <TableCell align="right">
                <span className="status" style={makeStyles(row.status)}>{row.status}</span>
                </TableCell>
              <TableCell align="right" className="Details"><button 
              className="detailsButton"
              onClick={handleClick(row.name)}
              >
                Details</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
