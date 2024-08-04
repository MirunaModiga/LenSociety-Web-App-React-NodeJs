import React from "react"
import { motion } from "framer-motion"
import './Main.css'

const Main = () => {
    return (
        <section className="hero-wrapper">
            <div className="flexCenter paddings innerWidth hero-container">
                <div className=" flexColStart hero-left">
                    <div className="hero-title">
                        <div className="orange-circle" />
                        <motion.h1
                            initial={{ y: "2rem", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 2,
                                type: "spring"
                            }}>
                            Looking <br /> For inspiration? <br /></motion.h1>
                    </div>

                    <div className="secondaryText flexColStart">
                        <span>Get started by customizing your content feed and uncover endless inspiration.</span>
                    </div>

                    <button className="button-find">
                        <a href="#explore">Find Photos</a>
                    </button>
                </div>

                <div className="flexCenter hero-right">
                    <motion.div
                    initial={{ x: "10rem", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        duration: 2,
                        type: "spring"
                    }}
                    className="image-container">
                        <img src="./img/home/hero.jpg" alt="hero.jpg"></img>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Main;