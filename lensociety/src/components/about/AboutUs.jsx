import React from "react"
import { GraphUpArrow } from "react-bootstrap-icons"
import { Tools } from "react-bootstrap-icons"
import { ChatRightHeart } from "react-bootstrap-icons"
import './AboutUs.css'

const AboutUs = () => {
    return (
        <section style={{ background: 'black' }}>
            <div className="about-body">
                <div className="about-text-container">
                    <h1 className="heading-cont">
                        About LenSociety
                    </h1>
                    <p className="paragraph-con">
                        Discover and share the world’s best photos
                    </p>
                    <div className="tooltip-container">
                        <span className="tooltip-1">Sell your creative photos</span>
                        <span className="tooltip-2">Discover inspiring images</span>
                        <span className="tooltip-3">Find photographers</span>
                        <span style={{ fontFamily: 'Poppins' }}>LenSociety</span>
                    </div>

                </div>
            </div>
            <div>
                <div className="story-con">
                    <div className="story-left">
                        <div className="story-image">
                            <img src="./img/about/story.jpg" style={{ objectFit: 'cover' }} alt="story.jpg"></img>
                        </div>
                    </div>
                    <div className="story-right">
                        <div className="notification">
                            <div className="notiglow"></div>
                            <div className="notiborderglow"></div>
                            <div className="notititle">Our Story</div>
                            <div className="notibody">
                                At LenSociety we aim to connect talented photographers with a wide audience, allowing them to showcase their work and reach potential clients. Our platform provides a space for photographers to share their best photos, discover inspiring images, and connect with other photographers. Whether you're a professional photographer or an enthusiast, LenSociety is the place to be.
                                Join our community today and start exploring the world of photography with LenSociety!

                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-dna cont-dna">
                    <div className="dna-text-container">
                        <h3 className="heading-dna">Photography is in our DNA. Authentic storytelling is what drives us.</h3>
                    </div>
                </div>
                <div className="vertical-padding"></div>
                <div className="diff-container">
                    <h2 className="diff-title">
                        What Makes Us Different
                    </h2>
                    <div className="diff-view">
                        <div className="diff-item">
                            <GraphUpArrow className="diff-icon" />
                            <h3 className="diff-title-item">
                                <span>Grow as a photographer</span>
                            </h3>
                            <p className="diff-p-item">
                                <span>Get immediate exposure with your first upload. Our Pulse algorithm surfaces new photographs and photographers, ensuring your photos are seen by the community so you receive valuable feedback on day one.</span>
                            </p>
                        </div>

                        <div className="diff-item">
                            <Tools className="diff-icon" />
                            <h3 className="diff-title-item">
                                <span>Build your career</span>
                            </h3>
                            <p className="diff-p-item">
                                <span>Market yourself as a professional photographer. Show that you’re available for hire on your Profile and create a Portfolio website to showcase your work.</span>
                            </p>
                        </div>

                        <div className="diff-item">
                            <ChatRightHeart className="diff-icon" />
                            <h3 className="diff-title-item">
                                <span>Get appreciated</span>
                            </h3>
                            <p className="diff-p-item">
                                <span>Experience the thrill of having your photos appreciated by viewers worldwide. Watch as your images captivate audiences from different corners of the globe, earning you admiration and recognition on an international scale.</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="vertical-padding"></div>
                <div className="bg-explore cont-dna"></div>
                <div className="vertical-padding"></div>

                <div className="join-cont">
                    <div className="join-left">
                        <div className="join-image">
                            <img src="./img/about/raluca.jpg" style={{ objectFit: 'cover' }} alt="raluca.jpg"></img>
                        </div>
                    </div>
                    <div className="join-right">
                        <div style={{ opacity: '1' }} className="container_text">
                            <h2 className="p-join">For Photographers</h2>
                            <h3 className="heading-dna">Your Creativity Is Empowered Here</h3>
                            <p className="p-join">
                                LenSociety is for you too. Gain real opportunities, sell your work, and be part of an inspiring creator community.
                                Showcase your talent, connect with other photographers, and explore new possibilities for your photography career. Join us today and unlock the full potential of your photography journey.
                            </p>

                            <div className="button-cont">
                                <a href="/signup/Contributor">
                                    <button className="join-button">
                                        <p>Join as a Photographer</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            ></path>
                                        </svg>
                                    </button>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="vertical-padding"></div>
                <div className="form-map-container">
                    <div id="form" className="s-section">
                        <div className="section-header-centered">
                            <h1 className="s-heading-centered">Get in Touch with Us</h1>
                            <div className="form-container">
                                <form className="form">
                                    <div className="form-group">
                                        <label for="name">Full Name</label>
                                        <input required="" name="name" id="name" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <label for="email">Email</label>
                                        <input required="" name="email" id="email" type="email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="textarea">How Can We Help You?</label>
                                        <textarea required="" cols="50" rows="10" id="textarea" name="textarea">          </textarea>
                                    </div>
                                    <button type="submit" className="form-submit-btn">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.729776489008!2d26.083833875700076!3d44.41819050261988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff0b54881f97%3A0xae84d2f47f65a3a7!2sAcademia%20Tehnic%C4%83%20Militar%C4%83%20Ferdinand%20I!5e0!3m2!1sro!2sro!4v1714304152278!5m2!1sro!2sro"
                        width="600"
                        height="450"
                        style={{ border: '0' }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">

                    </iframe>
                </div>
            </div>
        </section >
    )
}

export default AboutUs;