import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assests/Remind.css';

const Remind = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: 'Guest',
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (loggedStatus) {
            setIsLoggedIn(true);
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo && storedUserInfo.name) {
                setUserInfo(prevInfo => ({
                    ...prevInfo,
                    name: storedUserInfo.name
                }));
            }
        } 
    }, [navigate]);

    const handleLogoutClick = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUserInfo({ name: 'Guest' });
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
                    <div className="content-area">
                        <h2 className="title">NHẮC NHỞ CỦA BẠN</h2>
                        <div className="section-title">Lịch tái khám sắp tới</div>
                        <div className="appointment-card">
                            <div className="appointment-icon">
                                <i className="material-icons">event_repeat</i>
                            </div>
                            <div className="appointment-content">
                                <div className="appointment-title">Tái khám định kỳ</div>
                                <div className="appointment-subtitle">BS.Nguyễn Duy Thế - Khoa Truyền nhiễm</div>
                            </div>
                            <div className="appointment-time">15/06/2025 - 10:00 SA</div>
                        </div>
                        <div className="appointment-card">
                            <div className="appointment-icon">
                                <i className="material-icons">vaccines</i>
                            </div>
                            <div className="appointment-content">
                                <div className="appointment-title">Xét nghiệm định kỳ CD4 & Tải lượng HIV</div>
                                <div className="appointment-subtitle">Tại phòng xét nghiệm A</div>
                            </div>
                            <div className="appointment-time">20/07/2025 - 09:00 SA</div>
                        </div>
                        <div className="medicine-section">
                            <div className="section-title">Nhắc nhở uống thuốc</div>
                            <div className="medicine-card">
                                <div className="medicine-icon">
                                    <i className="material-icons">notifications_active</i>
                                </div>
                                <div className="medicine-content">
                                    <div className="medicine-title">Uống thuốc ARV (TDF + 3TC + DTG)</div>
                                    <div className="medicine-subtitle">Liều: 1 viên buổi sáng</div>
                                </div>
                                <div className="medicine-time">Hàng ngày - 08:00 SA</div>
                            </div>
                            <div className="medicine-card">
                                <div className="medicine-icon">
                                    <i className="material-icons">notifications_active</i>
                                </div>
                                <div className="medicine-content">
                                    <div className="medicine-title">Uống thuốc hỗ trợ (Vitamin D)</div>
                                    <div className="medicine-subtitle">Liều: 1 viên buổi tối</div>
                                </div>
                                <div className="medicine-time">Hàng ngày - 20:00 SA</div>
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
                                <i className="fab fa-github"></i>
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

export default Remind;