import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from 'react-router-dom';

export default function CreateActivity(props) {

    const [lectures, setLectures] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [groups, setGroups] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const getData = async () => {
            console.log('getting data...');
            const result = await axios(
                '/plannerData',
            );
            setLectures(result.data.classes);
            setTeachers(result.data.teachers);
            setGroups(result.data.groups);
        }
        getData();
    }, []);

    const optionsSelect = (item) => {
        return <option>{item}</option>;
    }

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        var activity = {
            'room': location.state.room,
            'group': data['group'],
            'class': data['class'],
            'slot': location.state.slot,
            'teacher': data['teacher'],
            'day': location.state.day
        };
        console.log(data);
        console.log(activity);
        
        axios.post('/createActivity', activity)
        .then(() => console.log('New activity created'))
        .catch(err => console.error(err));

        // back to home
        history.push('/');
    }

    return (
        <div className="wrapper" style={{marginLeft: '30%', marginRight: '30%', marginTop: '10px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{marginLeft: '25%', marginBottom: '20px', marginTop: '20px'}}>New activity</h1>

                <label>Select lecture</label>
                <select name='class' className="form-control" ref={register({ required: true})}>
                    {lectures.map(optionsSelect)}
                </select>
                {errors.class && <p style={{color: 'red', marginLeft: '5px'}}>Field required</p>}

                <label style={{marginTop: '10px'}}>Select teacher</label>
                <select name='teacher' className="form-control" ref={register({ required: true})}>
                    {teachers.map(optionsSelect)}
                </select>
                {errors.teacher && <p style={{color: 'red', marginLeft: '5px'}}>Field required</p>}
            
                <label style={{marginTop: '10px'}}>Select group</label>
                <select name='group' className="form-control" ref={register({ required: true})} style={{marginBottom: '20px'}}>
                    {groups.map(optionsSelect)}
                </select>
                {errors.group && <p style={{color: 'red', marginLeft: '5px'}}>Field required</p>}

                <input type="submit" value="Create activity" className="btn btn-block" style={{marginTop: '20px', backgroundColor: '#bb99ff'}}/>    
                <input value="Cancel" className="btn btn-block" style={{marginTop: '20px', backgroundColor: '#d1d1e0'}}
                    onClick={() => history.push('/')}/>                
            </form>
        </div>
    );
    
}