import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/locale/id';

const ListBerita = () => {
    const [News, setNews] = useState([]);
    
    useEffect(() =>{
        getNews();
    },[]);

    const getNews = async () => {
        const response = await axios.get('http://localhost:3636/news');
        setNews(response.data);
    };

    const deleteNews = async (newsId) => { 
        await axios.delete(`http://localhost:3636/news/${newsId}`);
        getNews();
    };

    const deleteProses  = async (newsId) => {
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
                    deleteNews(newsId);
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
        <h1 className="title"> Berita </h1>
        <h2 className="subtitle"> List Of News </h2>
        <Link to="/admin/news/add" className="button is-primary mb-2">Add New</Link>
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
            {News.map((news, index) => (
                <tr key={news.uuid}>
                    <td>{index + 1}</td>
                    <td>{news.name}</td>
                    <td><img src={`http://localhost:3636/images/imgNews/${news.image}`} alt="No images" width="200" height="100"/></td>
                    <td><details>{news.ket}</details></td>
                    <td>{news.user.name}</td>
                    <td>{moment(news.createdAt).format('dddd, DD MMMM YYYY')}</td>
                    <td>{moment(news.updatedAt).format('DD MMMM YYYY')}</td>
                    <td>
                        <Link to={`/admin/news/edit/${news.id}`} className="button is-small is-info">Edit</Link>
                        <button onClick={()=> deleteProses(news.id)} className="button is-small is-danger">Hapus</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default ListBerita;