import React from "react"
import { Facebook } from 'react-bootstrap-icons'
import { Instagram } from 'react-bootstrap-icons'
import { CCircle } from 'react-bootstrap-icons'
import { TelephoneFill } from 'react-bootstrap-icons'
import { EnvelopeFill } from 'react-bootstrap-icons'
import { GeoAltFill } from 'react-bootstrap-icons'
import './Footer.css'

const Footer = () => {
    return (
        <section id="footer" className="footer-wrapper">
            <div className="logo">
                <img src="/img/logo.png" alt="logo" />
            </div>
            <div className="footer-container">
                <div className="footer-left footer-text">
                    <h1>Get in Touch</h1>
                    <div className="links-left">
                        <div className="link">
                            <TelephoneFill className="i-link"/>
                            <a href="#" className="link-h">+40755602964</a>
                        </div>
                        <div className="link">
                            <EnvelopeFill className="i-link"/>
                            <a href="#" className="link-h">modigamiruna50@gmail.com</a>
                        </div>
                        <div className="link">
                            <GeoAltFill className="i-link"/>
                            <a href="https://www.google.com/maps/place/Academia+Tehnic%C4%83+Militar%C4%83+Ferdinand+I/@44.4181867,26.0838285,17z/data=!4m6!3m5!1s0x40b1ff0b54881f97:0xae84d2f47f65a3a7!8m2!3d44.4181867!4d26.0864088!16s%2Fm%2F064m_2r?entry=ttu" 
                            className="link-h" target="_blank">București, Sector 5, Bulevardul George Coșbuc 39-49, cod poștal 050141</a>
                        </div>
                    </div>
                </div>
                <div className="footer-right  footer-text">
                    <h1>Follow Us</h1>
                    <div className="links-right">
                        <div className="link">
                            <Facebook className="r-link"/>
                            <a href="https://www.facebook.com/miruna.modiga/" target="_blank" className="link-h">Facebook</a>
                        </div>
                        <div className="link">
                            <Instagram className="r-link"/>
                            <a href="https://www.instagram.com/miruna.modiga.m/" target="_blank" className="link-h">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <CCircle /><p>Copyright Modiga Miruna Mihaela</p>
            </div>
        </section>
    )
}

export default Footer;