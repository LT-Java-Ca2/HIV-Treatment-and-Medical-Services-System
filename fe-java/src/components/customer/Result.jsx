import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assests/Result.css';
import CanhanImage from '../../assests/canhan.jpg';

const getInitialAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : '';
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

const Result = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: 'Guest',
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatarSrc, setAvatarSrc] = useState('');

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (loggedStatus) {
            setIsLoggedIn(true);
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo) {
                const userName = storedUserInfo.name ||
                    (storedUserInfo.firstName && storedUserInfo.lastName
                        ? `${storedUserInfo.lastName} ${storedUserInfo.firstName}`
                        : storedUserInfo.firstName) ||
                    storedUserInfo.username ||
                    (storedUserInfo.email ? storedUserInfo.email.split('@')[0] : '');
                setUserInfo(prevInfo => ({
                    ...prevInfo,
                    name: userName
                }));
                setAvatarSrc(getInitialAvatar(userName));
            }
        }else {
            setIsLoggedIn(false);
            alert('Bạn cần đăng nhập để truy cập trang này.');
            navigate('/register'); 
        }
    }, [navigate]);

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
                            <Link to="/personal">
                                <i className="material-icons">account_circle</i>
                            </Link>
                        </>
                    ) : (
                        <Link to="/register" title="Đăng nhập / Đăng ký">
                            <i className="material-icons">person_add</i>
                        </Link>
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
                    <div className="profile-wrapper">
                        <div className="profile-container">
                            <h2>KẾT QUẢ XÉT NGHIỆM</h2>

                            <div className="results-image-banner">
                                <img
                                    src={isLoggedIn && avatarSrc ? avatarSrc : CanhanImage}
                                    alt="Ảnh đại diện người dùng"
                                    className="full-width-image-banner"
                                />
                            </div>

                            <div className="result-profile-card">
                                <h3>Thông tin bệnh nhân</h3>
                                <div className="result-section-content">
                                    <div><label>Họ và tên: <span>{userInfo.name}</span></label></div>
                                    <div><label>Giới tính: <span>Nam</span></label></div>
                                    <div><label>Ngày sinh: <span>07/04/2005</span></label></div>
                                </div>
                                <h3 style={{ marginTop: '32px' }}>Kết quả</h3>
                                <div className="result-row">
                                    <div className="result-option">
                                        <span className="result-label">Dương tính</span>
                                        <input className="result-checkbox" type="checkbox" checked disabled />
                                    </div>
                                    <div className="result-option">
                                        <span className="result-label">Âm tính</span>
                                        <input className="result-checkbox" type="checkbox" disabled />
                                    </div>
                                </div>
                            </div>
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

export default Result;
