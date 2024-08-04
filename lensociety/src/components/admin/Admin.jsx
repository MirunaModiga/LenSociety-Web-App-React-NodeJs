import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { location } from "../data/Data";
import { Trash3Fill, PencilSquare } from "react-bootstrap-icons";
import "./Admin.css";
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequestFailure, deleteRequestStart, deleteRequestSuccess, updateRequestFailure, updateRequestStart, updateRequestSuccess } from "../../redux/request/requestSlice";
import { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};
class Dashboard extends PureComponent {
    state = {
        activeIndex: 0,
    };

    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    render() {
        const { photoCountsByCategory, photoDownloadCountsByCategory } = this.props;
        const uploadData = Object.entries(photoCountsByCategory).map(([category, count]) => ({ name: category, value: count }));
        const downloadData = Object.entries(photoDownloadCountsByCategory).map(([category, count]) => ({ name: category, value: count }));
        return (
            <ResponsiveContainer className="responsive-container">
                <div className="chart-css" >
                    <h2 className="title-admin">Uploads by Category</h2>
                    <PieChart width={600} height={600}>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={uploadData}
                            cx="50%"
                            cy="50%"
                            innerRadius={100}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={this.onPieEnter}
                        />
                    </PieChart>
                </div>
                <div className="chart-css">
                    <h2 className="title-admin">Downloads by Category</h2>
                    <PieChart width={600} height={600}>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={downloadData}
                            cx="50%"
                            cy="50%"
                            innerRadius={100}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={this.onPieEnter}
                        />
                    </PieChart>
                </div>
            </ResponsiveContainer>
        );
    }
};

function Admin() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [editingRequest, setEditingRequest] = useState(null);
    const [assignedPhotographer, setAssignedTo] = useState("");
    const [editingPhoto, setEditingPhoto] = useState(null);
    const [photoCategory, setPhotoCategory] = useState("");
    const [photoCountsByCategory, setPhotoCountsByCategory] = useState({});
    const [photoDownloadCountsByCategory, setPhotoDownloadCountsByCategory] = useState({});
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchRequests();
        fetchPhotos();
        if (!currentUser || currentUser.usertype !== 'admin') {
            navigate('/signup');
        }
    }, [currentUser,navigate]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/user', { credentials: 'include' });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/request', { credentials: 'include' });
            if (!response.ok) {
                throw new Error('Failed to fetch requests');
            }
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };
    const fetchPhotos = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/photo', { credentials: 'include' });
            if (!response.ok) {
                throw new Error('Failed to fetch photos');
            }
            const data = await response.json();
            setPhotos(data);
            const counts = data.reduce((counts, photo) => {
                counts[photo.category] = (counts[photo.category] || 0) + 1;
                return counts;
            }, {});
            setPhotoCountsByCategory(counts);

            const counts2 = data.reduce((counts2, photo) => {
                counts2[photo.category] = (counts2[photo.category] || 0) + photo.downloads;
                return counts2;
            }, {});
            setPhotoDownloadCountsByCategory(counts2);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const handleDeletePhoto = async (id) => {
        const confirmation = window.confirm("Are you sure you want to delete the photo?");

        if (confirmation) {
            try {
                console.log(`Deleting photo with id: ${id}`);
                const res = await fetch(`http://localhost:3001/api/photo/delete/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                } else {
                    setPhotos((prev) => prev.filter((photo) => photo._id !== id));
                    alert("The photo was successfully deleted");
                }
            } catch (error) {
                console.error('Error deleting photo:', error);
            }
        }
    };
    const handleUpdatePhoto = async (photo) => {
        try {
            console.log(`Updating photo with id: ${photo._id}`);
            const res = await fetch(`http://localhost:3001/api/photo/update/${photo._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category: photoCategory }),
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            alert("The photo was successfully updated");
            setEditingPhoto(null);
            fetchPhotos();
        } catch (error) {
            console.error('Error updating photo:', error);
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
    const handleDeleteUser = async (id) => {
        const confirmation = window.confirm("Are you sure you want to delete the account?");

        if (confirmation) {
            try {
                console.log(`Deleting user with id: ${id}`);
                const res = await fetch(`http://localhost:3001/api/user/delete/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                } else {
                    setUsers((prev) => prev.filter((user) => user._id !== id));
                    alert("The account was successfully deleted");
                }
            } catch (error) {
                console.error('Error deleting user:', error); // Log the error
                dispatch(deleteUserFailure(error.message));
            }
        }
    };
    const handleDeleteRequest = async (id) => {
        const confirmation = window.confirm("Are you sure you want to delete the request?");

        if (confirmation) {
            try {
                console.log(`Deleting request with id: ${id}`);
                dispatch(deleteRequestStart());
                const res = await fetch(`http://localhost:3001/api/request/delete/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                } else {
                    dispatch(deleteRequestSuccess(id));
                    setRequests((prev) => prev.filter((request) => request._id !== id));
                    alert("The request was successfully deleted");
                }
            } catch (error) {
                console.error('Error deleting request:', error);
                dispatch(deleteRequestFailure(error.message));
            }
        }
    };
    const handleAssignRequest = async (request) => {
        dispatch(updateRequestStart());
        const assignedPhotographerUsername = users.find(user => user._id === request.assignedPhotographer).username;
        try {
            console.log(`Assigning request with id: ${request._id} to user: ${assignedPhotographerUsername}`);
            const res = await fetch(`http://localhost:3001/api/request/update/${request._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assignedPhotographer: assignedPhotographerUsername, status: 'Confirmed' }),
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            dispatch(updateRequestSuccess({ id: request._id, assignedPhotographer: assignedPhotographerUsername }));
            alert("The request was successfully assigned");
            setEditingRequest(null);
            fetchRequests();
        } catch (error) {
            console.error('Error assigning request:', error);
            dispatch(updateRequestFailure(error.message));
        }
    };

    const handleEditRequest = (request) => {
        setEditingRequest(request);
    };
    const handleEditPhoto = (photo) => {
        setEditingPhoto(photo);
        setPhotoCategory(photo.category);
    };

    const rendersUsers = (id) => (
        <div className="action-buttons">
            <button className="action-button delete" onClick={() => handleDeleteUser(id)}>
                <Trash3Fill width={20} height={20} />
            </button>
        </div>
    );
    const renderPhotos = (photo) => (
        <div className="action-buttons">
            <button className="action-button edit" onClick={() => handleEditPhoto(photo)}>
                <PencilSquare width={20} height={20} />
            </button>
            <button className="action-button delete" onClick={() => handleDeletePhoto(photo._id)}>
                <Trash3Fill width={20} height={20} />
            </button>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "users":
                return (
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>UserType</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.usertype}</td>
                                        <td>{rendersUsers(user._id)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case "photos":
                return (
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Photo ID</th>
                                    <th>Title</th>
                                    <th>URL</th>
                                    <th>Category</th>
                                    <th>Uploader</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {photos.map((photo) => (
                                    <tr key={photo._id}>
                                        <td>{photo._id}</td>
                                        <td>{photo.title}</td>
                                        <td>{photo.url}</td>
                                        <td>{photo.category}</td>
                                        <td>{photo.uploader}</td>
                                        <td>{renderPhotos(photo)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case "requests":
                return (
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Full Name</th>
                                    <th>Status</th>
                                    <th>Type of Service</th>
                                    <th>assignedPhotographer</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request._id}>
                                        <td>{request._id}</td>
                                        <td>{request.username}</td>
                                        <td>
                                            <span className={`request-status ${request.status.toLowerCase()}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td>{request.serviceType}</td>
                                        <td>{request.assignedPhotographer} </td>
                                        <td style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                            <button className="action-button edit" onClick={() => handleEditRequest(request)}>
                                                <PencilSquare width={20} height={20} />
                                            </button>
                                            <button className="action-button delete" onClick={() => handleDeleteRequest(request._id)}>
                                                <Trash3Fill width={20} height={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case "dashboard":
                return <Dashboard photoCountsByCategory={photoCountsByCategory} photoDownloadCountsByCategory={photoDownloadCountsByCategory} />
            default:
                return null;
        }
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <ul>
                    <li className={activeTab === "dashboard" ? "active" : ""}>
                        <button onClick={() => handleTabChange("dashboard")}>Dashboard</button>
                    </li>
                    <li className={activeTab === "users" ? "active" : ""}>
                        <button onClick={() => handleTabChange("users")}>Users</button>
                    </li>
                    <li className={activeTab === "photos" ? "active" : ""}>
                        <button onClick={() => handleTabChange("photos")}>Photos</button>
                    </li>
                    <li className={activeTab === "requests" ? "active" : ""}>
                        <button onClick={() => handleTabChange("requests")}>Requests</button>
                    </li>
                    <div className="btn-logout-div">
                        <a href="/">
                            <button className="btn-logout">
                                <div className="admin-sign">
                                    <svg viewBox="0 0 512 512">
                                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                    </svg>
                                </div>
                                <div onClick={handleSignOut} className="text">Logout</div>
                            </button>
                        </a>
                    </div>
                </ul>
            </div>
            <div className="content">
                {renderTabContent()}
                {editingRequest && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Edit Request {editingRequest._id}</h2>
                            <select value={assignedPhotographer} onChange={(e) => setAssignedTo(e.target.value)}>
                                <option value="">Selectează un utilizator</option>
                                {users.filter(user => user.usertype === 'contributor').map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.username}
                                    </option>
                                ))}
                            </select>
                            <div className="modal-buttons">
                                <button onClick={() => handleAssignRequest({ _id: editingRequest._id, assignedPhotographer })}>Save Changes</button>
                                <button onClick={() => setEditingRequest(null)} className="close-btn-modal">Close</button>
                            </div>
                        </div>
                    </div>
                )}
                {editingPhoto && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Edit Photo {editingPhoto._id}</h2>
                            <select value={photoCategory} onChange={(e) => setPhotoCategory(e.target.value)}>
                                <option value="">Select a category</option>
                                {location.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <div className="modal-buttons">
                                <button onClick={() => handleUpdatePhoto({ _id: editingPhoto._id, category: photoCategory })}>Save Changes</button>
                                <button onClick={() => setEditingPhoto(null)} className="close-btn-modal">Close</button>
                            </div>
                        </div>
                    </div>
                )}

            </div >
        </div >
    );
}

export default Admin;
