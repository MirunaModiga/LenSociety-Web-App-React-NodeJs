import { React, useState, useEffect } from "react";
import { CloudUploadFill, Gear, GearFill, EnvelopeExclamation, Images, Download, CheckCircle } from "react-bootstrap-icons";
import './User.css';
import { useSelector } from "react-redux";
import { saveAs } from 'file-saver';

const User = () => {
    const [activeMenuItem, setActiveMenuItem] = useState("Photos");
    const { currentUser } = useSelector(state => state.user);
    const [requests, setRequests] = useState([]);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [likedPhotos, setLikedPhotos] = useState([]);

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };

    const filteredRequests = requests.filter(request => request.status === "Confirmed" && request.assignedPhotographer === currentUser.username);
    const noRequests = filteredRequests.length === 0;
    const noLikedPhotos = likedPhotos.length === 0;

    const handleDownloadClick = async (imageUrl, imageName, photoId) => {
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

    useEffect(() => {
        fetchRequests();
        fetchUploadedPhotos();
        fetchLikedPhotos();
    }, []);

    const fetchUploadedPhotos = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/photo/uploaded/${currentUser.username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch uploaded photos');
            }
            const data = await response.json();
            const updatedData = data.map(photo => ({
                ...photo,
                url: `${photo.url.split('\\').pop()}`
            }));
            console.log(updatedData);
            setUploadedPhotos(updatedData);
        } catch (error) {
            console.error('Error fetching uploaded photos:', error);
        }
    };
    const fetchLikedPhotos = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/photo', { credentials: 'include' });
            if (!response.ok) {
                throw new Error('Failed to fetch photos');
            }
            const data = await response.json();
            const likedPhotos = data.filter(photo => photo.likes.includes(currentUser.username));
            console.log(likedPhotos);
            setLikedPhotos(likedPhotos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/request');
            if (!response.ok) {
                throw new Error('Failed to fetch requests');
            }
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleCompleteRequest = async (requestId) => {
        const confirmation = window.confirm("Are you sure you want to mark this request as completed?");
        if (!confirmation) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/api/request/update/${requestId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Completed' }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            alert("The request was successfully marked as completed");
            fetchRequests();
        } catch (error) {
            console.error('Error completing request:', error);
        }
    };

    return (
        <section style={{ backgroundColor: 'black' }}>
            <div className="user-body">
                <div className="top-wrapper">
                    <div style={{ height: '50%' }}></div>
                    <div className="top-container">
                        <div className="username-container">
                            <h3 className="user-title">
                                {currentUser.username}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="subnav subnav-night">{currentUser.usertype === "admin" ? (
                        <div className="lp_maxWidth">
                            <a href="/admin"
                                className={`g_link subnav_item typo_cap g_link-white subnav_item-largerMargin`} 
                            >Dashboard </a>
                            <button className="button-gear-css">
                                <a href="/user/settings">
                                    <Gear className="gear-icon" />
                                    <GearFill className="gear-fill-icon" />
                                </a>
                            </button>
                        </div>
                    ) : currentUser.usertype === "contributor" ? (
                        <div className="lp_maxWidth">
                            <p
                                className={`g_link subnav_item typo_cap g_link-white subnav_item-largerMargin ${activeMenuItem === "Photos" ? "subnav_item-active" : ""}`}
                                onClick={() => handleMenuItemClick("Photos")}
                            >Photos </p>
                            <p
                                className={`g_link subnav_item typo_cap g_link-white subnav_item-largerMargin ${activeMenuItem === "Requests" ? "subnav_item-active" : ""}`}
                                onClick={() => handleMenuItemClick("Requests")}
                            > Requests </p>
                            <button className="button-gear-css">
                                <a href="/user/settings">
                                    <Gear className="gear-icon" />
                                    <GearFill className="gear-fill-icon" />
                                </a>
                            </button>
                        </div>
                    ) : (
                        <div className="lp_maxWidth">
                            <p
                                className={`g_link subnav_item typo_cap g_link-white subnav_item-largerMargin ${activeMenuItem === "Photos" ? "subnav_item-active" : ""}`}
                                onClick={() => handleMenuItemClick("Photos")}
                            >Liked Photos </p>
                            <button className="button-gear-css">
                                <a href="/user/settings">
                                    <Gear className="gear-icon" />
                                    <GearFill className="gear-fill-icon" />
                                </a>
                            </button>
                        </div>
                    )}
                </div>
                {currentUser.usertype === "contributor" && (
                    <div>
                        {activeMenuItem === "Photos" && (
                            <div className="upload-wrapper">
                                <div className="upload-container">{uploadedPhotos.length > 0 ? (
                                    <div className="photos-container">
                                        <a href="/user/upload/upload-wrapper">
                                            <button className="button-upload" style={{ margin: '20px' }}>
                                                <div className="css-button-upload-text">
                                                    Upload
                                                </div>
                                            </button>
                                        </a>
                                        {uploadedPhotos.map(photo => (
                                            <figure key={photo._id} className="photoCard">
                                                <div className="photoContainer">
                                                    <img src={photo.url} alt={photo.title} className="photo" loading="lazy" />
                                                </div>
                                                <figcaption>
                                                    <p className="photoCard_caption">{photo.title}</p>
                                                </figcaption>
                                            </figure>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="upload-container">
                                        <CloudUploadFill className="upload-icon" />
                                        <div className="text1-container">
                                            <span className="css-text1">
                                                You haven't uploaded anything yet.
                                            </span>
                                        </div>
                                        <div className="text2-container">
                                            <span className="css-text2">
                                                Join millions of creatives and share your work on LenSociety.
                                            </span>
                                        </div>
                                        <a href="/user/upload/upload-wrapper">
                                            <button className="button-upload" >
                                                <div className="css-button-upload-text">
                                                    Upload
                                                </div>
                                            </button>
                                        </a>
                                    </div>
                                )}
                                </div>
                            </div>
                        )}

                        {activeMenuItem === "Requests" && (
                            <div className="requests-wrapper">
                                {noRequests ? (
                                    <div className="no-photos-container">
                                        <EnvelopeExclamation className="no-photos-icon" width={150} height={150} style={{ marginBottom: '20px' }} />
                                        <span className="no-photos-text">There are no requests for you.</span>
                                    </div>
                                ) : (
                                    filteredRequests.map(request => (
                                        <div key={request._id} className="request">
                                            <div className="fullname">{request.username}</div>
                                            <div className="service">{request.serviceType}</div>
                                            <button onClick={() => handleCompleteRequest(request._id)}>
                                                <CheckCircle size={20} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}
                {currentUser.usertype === "viewer" && (
                    <div className="photos">
                        <div className="lp_fullWidth">
                            {noLikedPhotos ? (
                                <div className="no-photos-container">
                                    <div className="no-images-icon">
                                        <Images size={200} color="gray" />
                                    </div>
                                    <p className="no-photos-text">No photos yet</p>
                                </div>
                            ) : (
                                <div className="photos-container">
                                    {likedPhotos.map(photo => (
                                        <figure key={photo._id} className="photoCard">
                                            <div className="photoContainer">
                                                <img src={photo.url} alt={photo.title} className="photo" loading="lazy" />
                                                <div className="actionsBar">
                                                    <button className="actionButton downloadButton" onClick={() => handleDownloadClick(photo.url, photo.title, photo._id)}>
                                                        <Download size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="user-card">
                                                <span className="user-card-text">By {photo.uploader}</span>
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
                )}
            </div>
        </section >
    )
}

export default User;