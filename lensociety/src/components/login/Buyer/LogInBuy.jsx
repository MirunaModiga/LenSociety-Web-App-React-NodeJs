import React, { useState, useEffect } from "react"
import '../../signup/Buyer/SignUpBuy.css'
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../../../redux/user/userSlice";

const LogInBuy = () => {
    const [formData, setFormData] = useState({});
    const { currentUser, loading, error } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser && currentUser.isAdmin === false) {
            navigate('/user');
        }
    }, [currentUser, navigate]);

    const handleSignUpClick = () => {
        navigate('../../signup/Buyer');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('http://localhost:3001/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            if (data.isAdmin === true) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <section className="con-body">
            <div className="con-wrapper">
                <div className="con-container">
                    <div className="div-form">
                        <button className="button-log" onClick={handleSignUpClick}>
                            Sign In
                        </button>
                        <div className="div-box">
                            <div className="text-box">
                                <div className="text-box">
                                    <h1 className="heading-con">
                                        Welcome Back!
                                    </h1>
                                </div>
                                <div className="s-form-container">
                                    <form onSubmit={handleSubmitLogin} className="s-form">
                                        <div className="s-form-group">
                                            <label >Username</label>
                                            <input required name="username" id="username" type="text" onChange={handleChange} />
                                        </div>
                                        <div className="s-form-group">
                                            <label >Password</label>
                                            <input required name="password" id="password" type="password" onChange={handleChange} />
                                        </div>
                                        <button disabled={loading} type="submit" className="s-form-submit-btn">
                                            {loading ? 'Loading...' : 'Log In'}
                                        </button>
                                        {error && <p className="text-red-500 mt-5">{error}</p>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default LogInBuy;