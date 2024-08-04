import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Explore.css';
import { location } from '../data/Data';
import { Heart, HeartFill, Download, ChevronDoubleLeft, ChevronDoubleRight, Images } from "react-bootstrap-icons";
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';

const Explore = () => {
    const { currentUser } = useSelector(state => state.user);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [photoData, setPhotoData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const containerRef = useRef();
    const navigate = useNavigate();
    const loc = useLocation();

    const handleScroll = (scrollAmount) => {
        scrollAmount = (containerRef.current.clientWidth) * scrollAmount;
        const newScrollPosition = scrollAmount + scrollPosition;
        setScrollPosition(newScrollPosition);
        containerRef.current.scrollLeft = newScrollPosition;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('http://localhost:3001/api/photo', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                if (currentUser && currentUser.usertype === 'contributor') {
                    setPhotoData(data.filter(photo => photo.uploader !== currentUser.username));
                }
                else if (currentUser) {
                    setPhotoData(data);
                    const likedPhotos = data.filter(photo => photo.likes.includes(currentUser.username));
                    setLikedPhotos(likedPhotos.map(photo => photo._id));
                } else {
                    setPhotoData(data);
                }
            });

        const params = new URLSearchParams(loc.search);
        const category = params.get('category');
        setSelectedCategory(category);
    }, [loc.search, currentUser]);

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        navigate(`/explore?category=${categoryName}`);
    }

    const [likedPhotos, setLikedPhotos] = useState([]);

    const handleLikeClick = async (photoId) => {
        if (!currentUser) {
            setModalShow(true);
            return;
        }

        if (likedPhotos.includes(photoId)) {
            setLikedPhotos(likedPhotos.filter(id => id !== photoId));
        } else {
            setLikedPhotos([...likedPhotos, photoId]);
        }

        await fetch(`http://localhost:3001/api/photo/like/${photoId}`, {
            method: 'POST',
            credentials: 'include',
        });
    }

    const handleDownloadClick = async (imageUrl, imageName, photoId) => {
        if (!currentUser) {
            setModalShow(true);
            return;
        }

        fetch(imageUrl, { credentials: 'include' })
            .then(response => response.blob())
            .then(blob => {
                saveAs(blob, imageName);
            });

        await fetch(`http://localhost:3001/api/photo/download/${photoId}`, {
            method: 'POST',
            credentials: 'include',
        });
    }

    const filteredPhotos = selectedCategory ? photoData.filter(photo => photo.category === selectedCategory) : photoData;

    return (
        <section className="explore-body height-fit-content">
            <div className="categories-bar-wrapper">
                <div className="categories-bar-container">
                    <div className="categories-bar" ref={containerRef}>
                        <div className="arrow-box arrow-left" onClick={() => handleScroll(-1)}>
                            <ChevronDoubleLeft className="arrow-svg" fill="white" width={20} height={20} />
                        </div>
                        <div className="categories-bar-content">
                            {location.map(loc => (
                                <div key={loc.id} title={loc.name} className="categories-bar-item-wraper">
                                    <div className="categories-bar-item-container">
                                        <button className="cat-button" onClick={() => handleCategoryClick(loc.name)}>
                                            <span className="categories-bar-item">{loc.name}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="arrow-box arrow-right" onClick={() => handleScroll(1)}>
                            <ChevronDoubleRight className="arrow-svg" fill="white" width={20} height={20} />
                        </div>
                    </div>
                </div>
            </div>
            {selectedCategory && (
                <div className="category-title">
                    <h1>{selectedCategory}</h1>
                </div>
            )}

            <div className="photos">
                <div className="lp_fullWidth">
                    {filteredPhotos.length === 0 ? (
                        <div className="no-photos-container">
                            <div className="no-images-icon">
                                <Images size={200} color="gray" />
                            </div>
                            <p className="no-photos-text">No photos yet</p>
                        </div>
                    ) : (
                        <div className="photos-container">
                            {filteredPhotos.map(photo => (
                                <figure key={photo._id} className="photoCard">
                                    <div className="photoContainer">
                                        <img src={photo.url} alt={photo.title} className="photo" loading="lazy" />
                                        <div className="actionsBar">
                                            <button className="actionButton likeButton" onClick={() => handleLikeClick(photo._id)}>
                                                {likedPhotos.includes(photo._id) ? <HeartFill size={20} color="red" /> : <Heart size={20} />}
                                            </button>
                                            <button className="actionButton downloadButton" onClick={() => handleDownloadClick(photo.url, photo.title, photo._id)}>
                                                <Download size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="user-card">
                                        <span className="user-card-text">By @{photo.uploader}</span>
                                    </div>
                                    <figcaption>
                                        <p className="photoCard_caption">{photo.title}</p>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {modalShow && (
                <div className="modal">
                    <div className="modal-content" style={{ backgroundColor: 'purple' }}>
                        <h2 className="text-red-500 mt-5">Not Logged In</h2>
                        <p>You need to create an account to like or download images.</p>
                        <div className="modal-buttons">
                            <button className="close-btn-modal" onClick={() => setModalShow(false)}>Close</button>
                            <button onClick={() => navigate('/signup')}>Sign Up</button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}

export default Explore;
