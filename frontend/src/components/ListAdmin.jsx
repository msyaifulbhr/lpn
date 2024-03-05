import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const ListAdmin = () => {
    const [Admins, setAdmins] = useState([]);

    useEffect(() =>{
        getAdmins();
    },[]);

    const getAdmins = async () => {
        const response = await axios.get('http://localhost:3636/admins');
        setAdmins(response.data);
    };

    const deleteAdmin = async (AdminId) => { 
        try {
            await axios.delete(`http://localhost:3636/admins/${AdminId}`);
        getAdmins();
        } catch (error) {
            
        }
        
    };

    const deleteProses  = async (AdminId) => {
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
                    deleteAdmin(AdminId);
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
        <h1 className="title"> Admin </h1>
        <h2 className="subtitle"> List of Admins</h2>
        <Link to="/admin/admins/add" className="button is-primary mb-2">Add New</Link>
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {Admins.map((admin, index) => (
                    <tr key={admin.uuid}>
                    <td>{index + 1}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.role}</td>
                    <td>
                    <Link to={`/admin/admins/edit/${admin.uuid}`} className="button is-small is-info">Edit</Link>
                    <button onClick={()=> deleteProses(admin.uuid)} className="button is-small is-danger">Hapus</button>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>

    </div>
    );
};

export default ListAdmin;