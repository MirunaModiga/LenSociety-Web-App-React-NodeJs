import React from 'react';
import { Link } from 'react-router-dom'; 
import './Collection.css';
import { location } from '../../data/Data';

const Collection = () => {
    return (
        <section id="explore" className='collection padding'>
            <div className='container'>
                <div className='heading'>
                    <h1>Select category</h1>
                    <p>View your favorite collection</p>
                </div>
                <div className='content grid3 mtop'>
                    {location.map((item, index) => (
                        <div className='box' key={index}>
                            <Link to={`/explore?category=${item.name}`}>
                                <img src={item.cover} alt={item.name} />
                                <div className='overlay flexColCenter'>
                                    <h5>{item.name}</h5>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Collection;
