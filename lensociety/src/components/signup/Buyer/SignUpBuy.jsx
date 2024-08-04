import React, { useState } from "react"
import './SignUpBuy.css'
import { useNavigate } from "react-router-dom";

const SignUpBuy = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('../../login/Buyer');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.toLowerCase().endsWith("@gmail.com")) {
            setError("Please use a Gmail account for registration.");
            return;
        }
        
        try {
            setLoading(true);
            const updatedFormData = {
                ...formData,
                usertype: 'viewer' 
            };
            const res = await fetch('http://localhost:3001/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                setSuccessMessage('');
                return;
            }
            setLoading(false);
            setError(null);
            setFormData({});
            setSuccessMessage('Sign up successful!');
        } catch (error) {
            setLoading(false);
            setError(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <section className="con-body">
            <div className="con-wrapper">
                <div className="con-container">
                    <div className="div-form">
                        <button className="button-log" onClick={handleLoginClick}>
                            Log In
                        </button>
                        <div className="div-box">
                            <div className="text-box">
                                <div className="text-box">
                                    <h1 className="heading-con">
                                        Create your business account
                                    </h1>
                                </div>
                                <div className="s-form-container">
                                    <form onSubmit={handleSubmit} className="s-form">
                                        <div className="s-form-group">
                                            <label for="name">Username</label>
                                            <input required name="name" id="username" type="text" onChange={handleChange} />
                                        </div>
                                        <div className="s-form-group">
                                            <label for="email">Email</label>
                                            <input required="" name="email" id="email" type="email" onChange={handleChange} />
                                        </div>
                                        <div className="s-form-group">
                                            <label for="password">Password</label>
                                            <input required="" name="password" id="password" type="password" onChange={handleChange} />
                                        </div>
                                        <button disabled={loading} type="submit" className="s-form-submit-btn">
                                            {loading ? 'Loading...' : 'Sign Up'}
                                        </button>
                                        {successMessage && <p className="text-green-500">{successMessage}</p>}
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

export default SignUpBuy;