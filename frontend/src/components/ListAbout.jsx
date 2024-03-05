import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/locale/id';

const ListAbout = () => {
    const [About, setAbout] = useState([]);
    
    useEffect(() =>{
        getAbouts();
    },[]);

    const getAbouts = async () => {
        const response = await axios.get('http://localhost:3636/abouts');
        setAbout(response.data);
    };

    const deleteAbout = async (AboutId) => { 
        await axios.delete(`http://localhost:3636/abouts/${AboutId}`);
        getAbouts();
    };

    const deleteProses  = async (AboutId) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    deleteAbout(AboutId);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                }
            })
        } catch (error) {
            
        }
    };

    return (
        <div className="py-4">
        <h1 className="title"> Abouts </h1>
        <h2 className="subtitle"> List Of Abouts </h2>
        <Link to="/admin/abouts/add" className="button is-primary mb-2">Add New</Link>
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>history</th>
                    <th>vision</th>
                    <th>mision</th>
                    <th>values</th>
                    <th>Dibuat Oleh</th>
                    <th>Dibuat Pada</th>
                    <th>Diubah Pada</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {About.map((about, index) => (
                <tr key={about.uuid}>
                    <td>{index + 1}</td>
                    <td><details>{about.history}</details></td>
                    <td><details>{about.vision}</details></td>
                    <td><details>{about.mision}</details></td>
                    <td><details>{about.values}</details></td>
                    <td>{about.user.name}</td>
                    <td>{moment(about.createdAt).format('dddd, DD MMMM YYYY')}</td>
                    <td>{moment(about.updatedAt).format('DD MMMM YYYY')}</td>
                    <td>
                        <Link to={`/admin/abouts/edit/${about.uuid}`} className="button is-small is-info">Edit</Link>
                        <button onClick={()=> deleteProses(about.uuid)} className="button is-small is-danger">Hapus</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default ListAbout;