import Select from 'react-select';
import { HddFill } from "react-bootstrap-icons"
import { BoxArrowInUpLeft } from "react-bootstrap-icons"
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../Upload.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'center'
};
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: '20%',
    height: '20%',
    padding: 4,
    boxSizing: 'border-box',
    justifyContent: 'center'
};
const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};
const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const UploadWrapper = () => {

    const options = [
        { value: 'Landscape', label: 'Landscape' },
        { value: 'Animals', label: 'Animals' },
        { value: 'People', label: 'People' },
        { value: 'Black and White', label: 'Black and White' },
        { value: 'Architecture', label: 'Architecture' },
        { value: 'Fashion', label: 'Fashion' },
        { value: 'Food', label: 'Food' },
        { value: 'Macro', label: 'Macro' },
        { value: 'Other', label: 'Other' }
    ]

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        useFsAccessApi: false,
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            acceptedFiles.forEach(file => {
                console.log("Preview URL:", URL.createObjectURL(file));
            });
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    const [formData, setFormData] = useState({ title: '', category: '' });
    const { currentUser } = useSelector(state => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.usertype !== 'contributor') {
            navigate('/signup'); 
        }
    }, [currentUser, navigate]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Please select a photo to upload.');
            return;
        }
    
        const data = new FormData();
        data.append('file', files[0]);
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('uploader', currentUser.username);

        const response = await fetch('http://localhost:3001/api/photo/upload', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to upload photo');
        }

        const photo = await response.json();
        console.log('Uploaded photo:', photo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/user');
    };

    return (
        <section className="upload_wrapper css-upload_wrapper">
            <div className="upload_container">
                <div className="page_upload_container">
                    <div className="upload_container_left">
                        <div className="upload_dropzone filepicker dropzone upload_dragAndDrop-available">
                            <div className="filepicker dropzone upload_dragAndDrop-available" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="upload_dropzone_content">
                                    <h2 className="typo_headline upload_dropzone_h2">Upload your photo</h2>
                                    <button className="g_btn g_btn-aqua" type="button">
                                        <div className="icon_wrapper">
                                            <div className="icon_container">
                                                <HddFill width={20} height={20} />
                                            </div>
                                            <span>Select from computer</span>
                                        </div>
                                    </button>
                                    <div className="upload_dropzone_content_drophint">
                                        <div className="css-drag-drop">
                                            <div className="icon_container">
                                                <BoxArrowInUpLeft width={20} height={20} />
                                            </div>
                                            <span className="css-text-down">
                                                You can also drag and drop them here
                                            </span>
                                        </div>
                                        <aside style={thumbsContainer}>
                                            {thumbs}
                                        </aside>
                                    </div>
                                </div>
                                <div className="upload_dropzone_dragcover">
                                    <div className="upload_dropzone_dragcover_circle">
                                        <svg width="90" height="90" viewBox="0 0 24 24" className="dragcover_image dragcover_image-backLeft css-8oysku">
                                            <path d="M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm3-10a1 1 0 100-2 1 1 0 000 2zm-5 6l3.729-1.657a2.003 2.003 0 011.555-.03l.842.337a1.999 1.999 0 001.7-.1l3.716-2.028a2 2 0 011.916 0L21 15" fill="transparent" stroke-width="2" stroke="#FFF" stroke-miterlimit="10"></path>
                                        </svg>
                                        <svg width="90" height="90" viewBox="0 0 24 24" className="dragcover_image dragcover_image-backRight css-8oysku">
                                            <path d="M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm3-10a1 1 0 100-2 1 1 0 000 2zm-5 6l3.729-1.657a2.003 2.003 0 011.555-.03l.842.337a1.999 1.999 0 001.7-.1l3.716-2.028a2 2 0 011.916 0L21 15" fill="transparent" stroke-width="2" stroke="#FFF" stroke-miterlimit="10"></path>
                                        </svg>
                                        <svg width="90" height="90" viewBox="0 0 24 24" className="dragcover_image dragcover_image-centered css-8oysku">
                                            <path d="M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm3-10a1 1 0 100-2 1 1 0 000 2zm-5 6l3.729-1.657a2.003 2.003 0 011.555-.03l.842.337a1.999 1.999 0 001.7-.1l3.716-2.028a2 2 0 011.916 0L21 15" fill="transparent" stroke-width="2" stroke="#FFF" stroke-miterlimit="10"></path>
                                        </svg>
                                        <div className="upload_dropzone_dragcover-label">
                                            Drop photos here
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="upload_container_right">
                        <div className="css-upload_container_right">
                            <div>
                                <form className="upload_edit_sidebar_form false">
                                    <span className="css-editing-text">
                                        Editing photo
                                    </span>
                                    <div className="upload_edit_sidebar_discoverBar upload_edit_sidebar_discoverBar_level0" style={{ backgroundPosition: '0% center' }}>
                                    </div>
                                    <div style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                                        <span className="css-text-fill">
                                            Fill out market details to make your photo findable and increase its chances of selling.
                                        </span>
                                    </div>
                                    <div className="add_caption_container">
                                        <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                                            <div className="css-add-caption">
                                                <label for="description" className="css-add-caption-text">
                                                    Add Caption
                                                </label>
                                            </div>
                                        </div>
                                        <textarea className="css-textarea" id="description" placeholder="Add a descriptive caption..." name="title" required onChange={handleInputChange}></textarea>

                                    </div>
                                    <div style={{ marginBottom: '8px' }}>
                                        <div data-reach-combobox data-state="idle">
                                            <div className="add_cat_container">
                                                <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                                                    <div className="css-add-caption">
                                                        <label className="css-add-caption-text">Select Category</label>
                                                    </div>
                                                </div>
                                                <Select options={options} required onChange={(selectedOption) => setFormData({ ...formData, category: selectedOption.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="upload_postButton_wrapper">
                            <button type="button" className="buttonAdd" onClick={handleUpload}>
                                <span className="button__text">Upload</span>
                                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" 
                                className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Upload Successful"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '20px',
                        width: '300px',
                        height: '200px',
                        padding: '20px'
                    }
                }}
            >
                <h2 style={{ textAlign: 'center', color: '#333' }}>Upload Successful!</h2>
                <p style={{ textAlign: 'center', color: '#666' }}>Your photo has been uploaded successfully.</p>
                <button onClick={closeModal} style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    marginTop: '20px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: 'rgb(0, 154, 188)',
                    color: '#fff',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}>OK</button>
            </Modal>

        </section >
    )
}

export default UploadWrapper;