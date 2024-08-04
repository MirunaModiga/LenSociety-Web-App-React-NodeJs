import React from "react"
import './Book.css'

const Book = () => {
    return (
        <section className="book-wrapper">
            <div className="book-container">
                <h1 className="book-text">Still looking for the right image? Book a photoshoot.</h1>
                <div className="vertical-paddings-s"></div>
                <p className="paragraph">
                    Capture the essence of your story with our all-inclusive photo and video shoots. 
                    Our creative team handles every detail for a flawless production experience.
                </p>
                <div className="vertical-paddings-m"></div>
            </div>
            <div className="img-container">
                <img src="./img/home/woman.png" alt="true" className="image"></img>
            </div>
            <button className="button-lm">
                <a href="/services">Learn More</a>
            </button>
        </section>
    )
}

export default Book;