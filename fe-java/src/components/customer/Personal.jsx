import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assests/Personal.css';

const getInitialAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : 'U';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;

    context.fillStyle = '#ADD8E6';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#FFFFFF';
    context.font = 'bold 48px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(initial, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL();
};

const Personal = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: 'Guest',
        phone: '',
        email: '',
        gender: '',
        profilePicture: null,
    });

    const [profilePictureDisplay, setProfilePictureDisplay] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [originalUserInfo, setOriginalUserInfo] = useState({});
    const [originalProfilePictureDisplay, setOriginalProfilePictureDisplay] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (loggedStatus) {
            setIsLoggedIn(true);
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo) {
                setUserInfo(prevInfo => ({
                    ...prevInfo,
                    ...storedUserInfo
                }));
                setProfilePictureDisplay(storedUserInfo.profilePicture || getInitialAvatar(storedUserInfo.name));
            } else {
                setProfilePictureDisplay(getInitialAvatar('Guest'));
            }
        } else {
            setIsLoggedIn(false);
            alert('Bạn cần đăng nhập để truy cập trang này.');
            navigate('/register'); 
        }
    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
        setOriginalUserInfo({ ...userInfo });
        setOriginalProfilePictureDisplay(profilePictureDisplay);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUserInfo({ ...originalUserInfo });
        setProfilePictureDisplay(originalProfilePictureDisplay);
        setSelectedFile(null);
    };

    const handleSaveClick = () => {
        let newProfilePictureUrl = userInfo.profilePicture;

        if (selectedFile) {
            newProfilePictureUrl = URL.createObjectURL(selectedFile);
        } else if (!newProfilePictureUrl) {
            newProfilePictureUrl = getInitialAvatar(userInfo.name);
        }

        const updatedUserInfo = {
            ...userInfo,
            profilePicture: newProfilePictureUrl 
        };

        console.log("Saving User Info:", updatedUserInfo);
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setUserInfo(updatedUserInfo);
        setProfilePictureDisplay(newProfilePictureUrl);
        setIsEditing(false);
        setSelectedFile(null);
        alert('Thông tin đã được lưu thành công!');
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserInfo(prevInfo => ({
            ...prevInfo,
            [id]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setProfilePictureDisplay(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setProfilePictureDisplay(originalProfilePictureDisplay); 
        }
    };

    const handleLogoutClick = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        alert('Bạn đã đăng xuất thành công!');
        navigate('/register');
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <span className="nav-brand">HIV - MTSS</span>
                </div>
                <ul className="nav-links">
                    <li><Link to="/homecustomer">Trang chủ</Link></li>
                    <li><Link to="/document">Tài liệu</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/service">Dịch vụ</Link></li>
                    <li><Link to="/result">Kết quả</Link></li>
                </ul>
                <div className="navbar-right">
                    {isLoggedIn && userInfo.name ? (
                        <>
                            <span className="user-name-display">{userInfo.name}</span>
                            <Link to="/personal"><i className="material-icons">account_circle</i></Link>
                        </>
                    ) : (
                        <Link to="/register" title="Đăng nhập / Đăng ký"><i className="material-icons">person_add</i></Link>
                    )}
                </div>
            </nav>

            <div className="container">
                <aside className="sidebar">
                    <div className="sidebar-item">
                        <Link to="/appointment2"><i className="material-icons">calendar_today</i></Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to="/lookup"><i className="material-icons">assignment</i></Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to="/appointment"><i className="material-icons">calendar_month</i></Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to="/advise"><i className="material-icons">chat_bubble_outline</i></Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to="/remind"><i className="material-icons">access_time</i></Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to="/patient"><i className="material-icons">description</i></Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to="/history"><i className="material-icons">history</i></Link>
                    </div>
                </aside>

                <main className="main-content">
                    <div className="personal-info-container">
                        <h2>THÔNG TIN CÁ NHÂN</h2>
                        <div className="personal-info-card">
                            <img src={profilePictureDisplay} alt="Ảnh đại diện" className="profile-pic" />

                            {isEditing && (
                                <div className="file-input-container">
                                    <label htmlFor="profilePictureInput" className="custom-file-upload">
                                        Chọn ảnh mới
                                    </label>
                                    <input
                                        type="file"
                                        id="profilePictureInput"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    {selectedFile && <span className="selected-file-name">{selectedFile.name}</span>}
                                </div>
                            )}

                            {isEditing ? (
                                <input
                                    type="text"
                                    id="name"
                                    value={userInfo.name}
                                    onChange={handleChange}
                                    style={{ width: '220px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', margin: '10px 0' }}
                                />
                            ) : (
                                <h3 id="userName">{userInfo.name}</h3>
                            )}

                            <div className="info-field">
                                <span className="info-label">Số điện thoại:</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        id="phone"
                                        value={userInfo.phone}
                                        onChange={handleChange}
                                        style={{ width: '180px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb' }}
                                    />
                                ) : (
                                    <span className="info-value" id="phoneValue">{userInfo.phone}</span>
                                )}
                            </div>
                            <div className="info-field">
                                <span className="info-label">Gmail:</span>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        id="email"
                                        value={userInfo.email}
                                        onChange={handleChange}
                                        style={{ width: '180px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb' }}
                                    />
                                ) : (
                                    <span className="info-value" id="emailValue">{userInfo.email}</span>
                                )}
                            </div>
                            <div className="info-field">
                                <span className="info-label">Giới tính:</span>
                                {isEditing ? (
                                    <select
                                        id="gender"
                                        value={userInfo.gender}
                                        onChange={handleChange}
                                        style={{ width: '120px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb' }}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                ) : (
                                    <span className="info-value" id="genderValue">{userInfo.gender}</span>
                                )}
                            </div>
                            <div className="actions">
                                {isEditing ? (
                                    <>
                                        <button className="btn info-save" onClick={handleSaveClick}>Lưu</button>
                                        <button className="btn info-cancel" onClick={handleCancelClick} style={{ marginLeft: '10px', backgroundColor: '#dc3545' }}>Hủy</button>
                                    </>
                                ) : (
                                    <button className="btn info-edit" onClick={handleEditClick}>Chỉnh sửa</button>
                                )}
                            </div>
                            <button className="btn logout" onClick={handleLogoutClick}>Đăng xuất</button>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-left">
                        <span className="footer-logo">HIV - MTTS</span>
                    </div>
                    <div className="footer-right">
                        <div className="footer-links">
                            <a href="https://www.facebook.com/nguyen.trung.736763/" title="Facebook" className="footer-icon"><span className="material-icons">facebook</span></a>
                            <a href="tel:0123456789" title="Điện thoại" className="footer-icon"><span className="material-icons">call</span></a>
                            <a href="mailto:hivmtts@gmail.com.vn" title="Email" className="footer-icon"><span className="material-icons">mail</span></a>
                            <a href="https://github.com/" title="GitHub" className="footer-icon">
                                <i className="fab fa-github" style={{ fontSize: '1.7em' }}></i>
                            </a>
                        </div>
                        <div className="footer-support">
                            Hỗ trợ: hivmtts@gmail.com.vn
                        </div>
                        <div className="footer-copyright">
                            © 2025 Trung tâm điều trị HIV. Mọi quyền được bảo lưu.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Personal;