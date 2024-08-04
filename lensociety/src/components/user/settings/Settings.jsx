import React, { useState } from "react"
import { EyeSlashFill, BoxArrowLeft, EyeFill } from "react-bootstrap-icons"
import './Settings.css'
import { useSelector, useDispatch } from "react-redux"
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserSuccess, signOutUserStart } from "../../../redux/user/userSlice"

const Settings = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`http://localhost:3001/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('http://localhost:3001/api/auth/signout', {
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    return (
        <section style={{ background: 'white' }}>
            {currentUser && currentUser.usertype === 'admin' ? (
                <a href="/admin">
                    <BoxArrowLeft className="arrow-css" />
                </a>
            ) : (
                <a href="/user">
                    <BoxArrowLeft className="arrow-css" />
                </a>)}
            <div className="sectionPadding row">
                <div className="settings-wrapper">
                    <div className="settings-container">
                        <div className="settings-heading-cont">
                            <span className="settings-heading-css">
                                Settings
                            </span>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="css-1rnwfjn eqclr3s0">
                                    <span className="css-1tqol5y eulhdfc0">Profile</span>
                                    <div className="css-1vazft9 eqclr3s0">
                                        <span className="css-244rfk eulhdfc0">Change your account's username, email or password.</span>
                                    </div>
                                    <div className="epmjgr52 css-hkafop eqclr3s0">
                                        <div className="css-q8i84z eqclr3s0">
                                            <div className="css-89mxvk eqclr3s0">
                                                <span className="css-17zw2ed eulhdfc0">Username</span>
                                            </div>
                                        </div>
                                        <input id="username"
                                            type="text"
                                            placeholder="Username"
                                            className="css-mdtn5s e1nk0n9v0"
                                            defaultValue={currentUser ? currentUser.username : ''}
                                            onChange={handleChange} />
                                    </div>
                                    <div className="epmjgr52 css-hkafop eqclr3s0">
                                        <div className="css-q8i84z eqclr3s0">
                                            <div className="css-17iuz34">
                                                <label for="email" className="css-17zw2ed ">Email</label>
                                            </div>
                                        </div>
                                        <input id="email"
                                            type="email"
                                            placeholder="Email"
                                            className="css-mdtn5s e1nk0n9v0"
                                            defaultValue={currentUser ? currentUser.email : ''}
                                            onChange={handleChange} />
                                    </div>
                                    <div className="css-bjn8wh ecpo7hp0">
                                        <div className="epmjgr52 css-hkafop eqclr3s0">
                                            <div className="css-q8i84z eqclr3s0">
                                                <div className="css-17iuz34">
                                                    <label for="password" className="css-17zw2ed ">Password</label>
                                                    <div className="css-rb0ibf">
                                                        <div className="css-fgprh6">
                                                            <div className="css-1rbv0ty eqclr3s0" onClick={togglePasswordVisibility}>
                                                                {showPassword ? <EyeSlashFill /> : <EyeFill />}
                                                            </div>
                                                            <label className="css-nj6w1l ">{showPassword ? "Hide" : "Show"}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="New Password" className="css-mdtn5s e1nk0n9v0" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="css-21h7b2">
                                        <button disabled={loading} className="css-1wteb6q" type="submit">
                                            <div className="css-w3icib">
                                                {loading ? 'Loading...' : 'Save changes'}
                                            </div>
                                        </button>
                                    </div>
                                    <p className='text-red-700 mt-5'>{error ? error : ''}</p>
                                    <p className='text-green-700 mt-5'>
                                        {updateSuccess ? 'User is updated successfully!' : ''}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="btn-logout-div">
                    <button className="btn-logout">
                        <div className="admin-sign">
                            <svg viewBox="0 0 512 512">
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                            </svg>
                        </div>
                        <div onClick={handleSignOut} className="text">Logout</div>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Settings;
