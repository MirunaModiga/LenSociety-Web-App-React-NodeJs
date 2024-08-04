import React, { useEffect } from "react"
import './SignUp.css'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if(currentUser){
            navigate('/user');
        }
    }, [currentUser, navigate]);
    return (
        <section className="signup-body">
            <div className="signup-wrapper">
                <div className="container-left">
                    <div className="back-left overlay"></div>
                    <div className="content-wrapper-left">
                        <div className="content-container-left">
                            <img src="/img/signup/camera.svg" className="image-css" alt="icon"></img>
                            <div className="text-container">
                                <h1 className="text-css">
                                    Upload and Sell Your Work
                                </h1>
                            </div>
                            <div className="paragraph-container">
                                <p className="paragraph-left">
                                    Join our network. Get hired for shoots and distribute your work.
                                </p>
                            </div>
                            <button className="button-sc">
                                <a href="/signup/Contributor">Sign Up as Contributor</a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container-left">
                    <div className="back-right overlay"></div>
                    <div className="content-wrapper-left">
                        <div className="content-container-left">
                            <img src="/img/signup/cart.svg" className="image-css" alt="icon"></img>
                            <div className="text-container">
                                <h1 className="text-css">
                                    Download Stock Photos
                                </h1>
                            </div>
                            <div className="paragraph-container">
                                <p className="paragraph-left">
                                    Create a business account to book photo shoots worldwide.
                                </p>
                            </div>
                            <button className="button-sc">
                                <a href="/signup/Buyer">Sign Up as Viewer</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp;