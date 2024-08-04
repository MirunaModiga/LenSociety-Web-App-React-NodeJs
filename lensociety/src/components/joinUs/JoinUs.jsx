import React from "react"
import './JoinUs.css'

const JoinUs = () => {
    return (
        <section className="join-body">
            <div className="div-wrapper background">
                <div className="join-container">
                    <div className="j-text">
                        <h1 className="text-heading">
                            Get Exposure In Our Network
                        </h1>
                        <p className="j-paragraph-centered">
                            Whether you're an experienced photographer or just starting out in the industry,<br />
                            we're here to provide the support and resources you need to reach your full potential.
                        </p>
                    </div>
                    <div className="button-div">
                        <a href="/signup/Contributor">
                            <button className="animated-button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                                    <path
                                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                    ></path>
                                </svg>
                                <span className="text">Build Your Portofolio Now</span>
                                <span className="circle"></span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                                    <path
                                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                    ></path>
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JoinUs;