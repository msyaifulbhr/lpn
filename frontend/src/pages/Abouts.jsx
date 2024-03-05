import React, {useEffect} from "react";
import Layout from "./Layout";
import ListAbout from "../components/ListAbout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Abouts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, admin} = useSelector((state => state.auth));

    useEffect(()=>{
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError){
        navigate("/admin/login");
        }
    }, [isError, admin, navigate]);

    return (
        <Layout>
            <ListAbout/>
        </Layout>
    );
};

export default Abouts;