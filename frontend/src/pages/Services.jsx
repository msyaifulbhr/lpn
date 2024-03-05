import React, {useEffect} from "react";
import Layout from "./Layout";
import ListService from "../components/ListService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Services = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state => state.auth));

    useEffect(()=>{
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError){
        navigate("/admin/login");
        }
    }, [isError, navigate]);

    return (
        <Layout>
            <ListService/>
        </Layout>
    );
};

export default Services;