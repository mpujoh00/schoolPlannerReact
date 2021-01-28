import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { columns, tableData } from "./tableData";
import { useTable } from 'react-table';
import './tableStyle.css';

const Home = () => {

    const [rooms, setRooms] = useState([]);
    const [activities, setActivities] = useState([]);
    const {handleSubmit, register} = useForm();
    const [currentRoom, setCurrentRoom] = useState();
    const history = useHistory();
    const [rowsData, setRowsData] = useState(tableData);

    useEffect(() => {
        const getData = async () => {
            console.log('getting data...');
            const result = await axios.get('/plannerData');
            if(rooms.length === 0){
                setRooms(result.data.rooms);
                setActivities(result.data.activities);
            }
            if(currentRoom === undefined){
                setCurrentRoom(rooms[0]);
            }
        }
        getData();
    }, [rooms]);

    // UPDATING ACTIVITIES SHOWN
    useEffect(() => {
        updateActivities();
    }, [currentRoom]);

    const updateActivities = () => {

        console.log('updating activities...');
        var rows = tableData; // reset

        if(currentRoom === undefined){
            setCurrentRoom(rooms[0]);
        }

        for(let i=0; i<activities.length; i++){
            var activity = activities[i];
            if(activity.room === currentRoom){
                var row = rows[activity.slot-1];
                row[activity['day']] = activity['class'];
                rows[activity.slot-1] = row;
            }
        }
        setRowsData(rows);
        history.push('/');  // supposed to reload the table but not working
    }

    // CREATION OF THE TABLE
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns: columns, data: rowsData });

    // ROOMS
    const roomChanged = (data) => {
        setCurrentRoom(data['room']);
    }
    
    const roomsSelect = (room) => {
        if(room === currentRoom)
            return <option selected>{room}</option>;
        else
            return <option>{room}</option>;
    }

    // CELL CLICKED
    const cellClicked = (cell) => {

        console.log('cell clicked');

        var slot = cell.row.index + 1;
        var day = cell.column.id;

        var info = {
            'room': currentRoom,
            'slot': slot,
            'day': day,
        }    
        history.push('/createActivity', info);
    }

    return (
        <div style={{marginLeft: '8%', marginRight: '8%', marginTop: '15px', marginBottom: '30px'}}>
            <div className="wrapper">

                <form onChange={handleSubmit(roomChanged)} style={{marginBottom: '30px'}}>
                    <label>Room:</label>
                    <select name='room' className="form-control" ref={register({ required: true})} style={{width: '150px'}}>
                        {rooms.map(roomsSelect)}
                    </select>       
                </form>

                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}                        
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()} onDoubleClick={() => cellClicked(cell)}>
                                            {cell.render('Cell')}</td>
                                    })}
                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>    
    )
}

export default Home