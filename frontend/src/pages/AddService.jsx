import React, {useEffect} from "react";
import Layout from "./Layout";
import FormAddService from "../components/FormAddService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddService = () => {
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
            <FormAddService/>
        </Layout>
    );
};

export default AddService;