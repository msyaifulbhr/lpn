import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Welcome = () => {
    const {admin} = useSelector((state) => state.auth);
    return (
        <div>
        <div className="py-4">
            <h1 className="title gx-4 text-center"> Dasboard </h1>
            <h2 className="subtitle text-center"> Welcome Back <strong>{admin && admin.name}</strong></h2>
        </div>

        <div className="text-center">
            
        </div>
        </div>
    );
};

export default Welcome;