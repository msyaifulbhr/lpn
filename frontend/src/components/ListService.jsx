import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/locale/id';

const ListService = () => {
    const [Services, setServices] = useState([]);
    
    useEffect(() =>{
        getServices();
    },[]);

    const getServices = async () => {
        const response = await axios.get('http://localhost:3636/services');
        setServices(response.data);
    };

    const deleteService = async (serviceId) => { 
        await axios.delete(`http://localhost:3636/services/${serviceId}`);
        getServices();
    };

    const deleteProses  = async (serviceId) => {
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
                    deleteService(serviceId);
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
        <h1 className="title"> Services </h1>
        <h2 className="subtitle"> List Of Services </h2>
        <Link to="/admin/services/add" className="button is-primary mb-2">Add New </Link>
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Judul</th>
                    <th>Images</th>
                    <th>keterangan</th>
                    <th>Dibuat Oleh</th>
                    <th>Dibuat Pada</th>
                    <th>Diubah Pada</th> 
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {Services.map((services, index) => (
                <tr key={services.uuid}>
                    <td>{index + 1}</td>
                    <td>{services.name}</td>
                    <td><img src={`http://localhost:3636/images/imgService/${services.image}`} alt="No images" width="200" height="300"/></td>
                    <td className="text-break"><details>{services.ketser}</details></td>
                    <td>{services.user.name}</td>
                    <td>{moment(services.createdAt).format('dddd, DD MMMM YYYY')}</td>
                    <td>{moment(services.updatedAt).format('DD MMMM YYYY')}</td>
                    <td>
                        <Link to={`/admin/services/edit/${services.id}`} className="button is-small is-info">Edit</Link>
                        <button onClick={()=> deleteProses(services.id)} className="button is-small is-danger">Hapus</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default ListService;