import React from "react"
import './Service.css'
import { GlobeAmericas } from "react-bootstrap-icons"
import { Play } from "react-bootstrap-icons"
import { LightningCharge } from "react-bootstrap-icons"
import { HouseDoor } from "react-bootstrap-icons"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { createRequestFailure, createRequestStart, createRequestSuccess } from "../../redux/request/requestSlice"

const Service = () => {
    const [formData, setFormData] = useState({});
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            navigate('/signup');
            return;
        }
        if (currentUser.usertype !== 'viewer') {
            setModalOpen(true);
            return;
        }
        try {
            dispatch(createRequestStart());
            const updatedFormData = {
                ...formData,
                username: currentUser.username
            };
            const response = await fetch('http://localhost:3001/api/request/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFormData),
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success === false) {
                dispatch(createRequestFailure(data.message));
                return;
            }
            dispatch(createRequestSuccess(data));
            alert("Request has been created");
            e.target.reset();
        } catch (error) {
            dispatch(createRequestFailure(error.message));
        }
    };

    return (
        <section className="service-body">
            <div className="s-wrapper">
                <div className="ew-hero-content-wrapper">
                    <div className="ew-hero-container">
                        <h1 className="book-text">Full-Service Photo and Video Production. Anywhere in the World.</h1>
                        <p className="paragraph">From small scale, single location to full-service, global productions, book professional photo and video shoots worldwide.</p>
                        <div>
                            <button className="button-s button-left">
                                <a href="#learn-more">Learn More</a>
                            </button>
                            <div className="spacer"></div>
                            <button className="button-s button-right">
                                <a href="#form">Book Photoshoot</a>
                            </button>
                        </div>
                    </div>
                </div>
                <div data-poster-url="https://assets-global.website-files.com/60e62d17d59b7865f875d0e7/64da472e966d75617139b59b_flickr ad site about us hero back 720p-poster-00001.jpg" data-video-urls="https://assets-global.website-files.com/60e62d17d59b7865f875d0e7/64da472e966d75617139b59b_flickr ad site about us hero back 720p-transcode.mp4,https://assets-global.website-files.com/60e62d17d59b7865f875d0e7/64da472e966d75617139b59b_flickr ad site about us hero back 720p-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="background-video-2 w-background-video">
                    <video id="0c7455f4-22b2-c365-5cc1-afed80dd746d-video" autoplay="" loop style={{ backgroundImage: "url(&quot;https://assets-global.website-files.com/60e62d17d59b7865f875d0e7/64da472e966d75617139b59b_flickr ad site about us hero back 720p-poster-00001.jpg&quot;)" }} muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                        <source src="https://assets-global.website-files.com/60e62d17d59b7865f875d0e7/64da472e966d75617139b59b_flickr ad site about us hero back 720p-transcode.mp4" data-wf-ignore="true" />
                        <source src="https://assets-global.website-files.com/60e62d17d59b7865f875d0e7/64da472e966d75617139b59b_flickr ad site about us hero back 720p-transcode.webm" data-wf-ignore="true" />
                    </video>
                </div>
            </div>
            <div className="section-list">
                <div id="learn-more" className="s-section">
                    <div className="section-header-centered">
                        <h1 className="s-heading-centered">What is LenSociety Productions?</h1>
                        <p className="s-paragraph-centered">
                            We’re a global photo and video production company with a worldwide network of producers, photographers, and videographers that
                            <br />specialize in creating unique, authentic, and on-brand visual content.</p>
                    </div>
                </div>
                <div className="section-wide">
                    <div className="s-block-text-left-image-right">
                        <div className="s-block-text-left">
                            <div className="s-text-container">
                                <h1 className="s-heading-medium">
                                    Find the Right Photographer
                                </h1>
                                <p className="s-paragraph s-paragraph-left-aligned">
                                    No need to sift through endless directories and portfolios to find the perfect photographer. We work with you to create the perfect brief and match the right creative talent to your needs. Our global network of talent is made up of photographers, stylists, models, and more.
                                    <br />
                                </p>
                                <button className="button-find">
                                    <a href="#form">Find a Photographer</a>
                                </button>
                            </div>
                        </div>
                        <div className="s-block-image-right">
                            <img src="./img/services/book1.jpg" loading="lazy" sizes="(max-width: 479px) 92vw, (max-width: 767px) 90vw, (max-width: 991px) 92vw, 1600px" alt="" className="block-image" />
                        </div>
                    </div>
                    <div className="s-block-image-left-text-right">
                        <div className="s-block-image-right left">
                            <img src="./img/services/call.jpg" loading="lazy" sizes="(max-width: 479px) 92vw, (max-width: 767px) 90vw, (max-width: 991px) 92vw, 1600px" alt="" className="block-image" />
                        </div>
                        <div className="s-block-text-left">
                            <div className="s-text-container">
                                <h1 className="s-heading-medium">
                                    Full-Service Production Management
                                </h1>
                                <p className="s-paragraph s-paragraph-left-aligned">
                                    Our team handles everything on-site for you, including location setup, model and crew direction, and hair and makeup styling.
                                    <br />
                                </p>
                                <button className="button-find">
                                    <a href="#form">Schedule a Call</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="s-section">
                    <div className="s-section-header">
                        <h1 className="s-heading-medium left-aligned">
                            Talent For Any Type of Photography
                        </h1>
                        <p className="s-paragraph-medium">
                            No matter what your industry, style, or scale, our network of professional photographers will transform your ideas into real results.
                        </p>
                    </div>
                    <div className="s-stack">
                        <table border="1">
                            <tr>
                                <td>
                                    <div className="s-card-icon-aqua">
                                        <div className="s-card-icon-container">
                                            <GlobeAmericas className="s-card-icon" />
                                        </div>
                                    </div>
                                    <div className="s-card-content">
                                        <div className="s-text-container">
                                            <h1 className="s-heading-small"><strong>Travel Photography</strong></h1>
                                            <p className="s-paragraph-medium">Equipped with knowledge of the latest visual trends, we can help you capture exotic, romantic, luxury, and mindful travel content that matches your hospitality and travel brand.</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="s-card-icon-purple">
                                        <div className="s-card-icon-container">
                                            <Play className="s-card-icon" />
                                        </div>
                                    </div>
                                    <div className="s-card-content">
                                        <div className="s-text-container">
                                            <h1 className="s-heading-small"><strong>Video and Animation</strong></h1>
                                            <p className="s-paragraph-medium">Make every second count. Leverage our network of videographers, drone, and animation specialists for your next video shoot. We cover product, instructional, testimonial and corporate videos.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="blank_row">
                                <td colspan="2"></td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="s-card-icon-green">
                                        <div className="s-card-icon-container">
                                            <LightningCharge className="s-card-icon" />
                                        </div>
                                    </div>
                                    <div className="s-card-content">
                                        <div className="s-text-container">
                                            <h1 className="s-heading-small"><strong>Lifestyle Content</strong></h1>
                                            <p className="s-paragraph-medium">Highlight your products and services with brand visuals that radiate youthful energy, speak excitement, and effortlessly capture the aesthetic of a specific lifestyle.</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="s-card-icon-red">
                                        <div className="s-card-icon-container">
                                            <HouseDoor className="s-card-icon" />
                                        </div>
                                    </div>
                                    <div className="s-card-content">
                                        <div className="s-text-container">
                                            <h1 className="s-heading-small"><strong>Real Estate Photography</strong></h1>
                                            <p className="s-paragraph-medium">Our photographers are skilled in drone photography, architectural composition, styling, and the use of light to convey the perfect amount of depth and personality for your property.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
                <div id="form" className="s-section">
                    <div className="section-header-centered">
                        <h1 className="s-heading-centered">Tell Us Your Production Needs</h1>
                        <p className="s-paragraph-centered">We will help you plan your production from start to finish. Simply take a second to fill out your details so that we can schedule a call for you.</p>
                        <div className="form-container">
                            <form className="form" onSubmit={handleSubmitRequest}>
                                <div className="form-group">
                                    <label >How Can We Help You?</label>
                                    <input required cols="50" rows="10" id="serviceType" onChange={handleChange}></input>
                                </div>
                                {error && <p className="text-red-500 mt-5">{error}</p>}
                                <button disabled={loading} type="submit" className="form-submit-btn">
                                    {loading ? 'Loading...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {modalOpen && (
                    <div className="modal">
                        <div className="modal-content" style={{backgroundColor:'purple'}}>
                            <h2 className="text-red-500 mt-5">Error</h2>
                            <p>You need to be a viewer to have this option.</p>
                            <button className="close-btn-modal" onClick={() => setModalOpen(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Service;