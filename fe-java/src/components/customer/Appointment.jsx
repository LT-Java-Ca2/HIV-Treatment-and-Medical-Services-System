import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assests/Appointment.css';

const Appointment = () => {
    const [userInfo, setUserInfo] = useState({ name: 'Guest' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = localStorage.getItem('isLoggedIn') === 'true';
        if (loggedStatus) {
            setIsLoggedIn(true);
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo && (storedUserInfo.name || storedUserInfo.firstName || storedUserInfo.username || storedUserInfo.email)) {
                setUserInfo({
                    name: storedUserInfo.name ||
                          (storedUserInfo.firstName && storedUserInfo.lastName ? `${storedUserInfo.lastName} ${storedUserInfo.firstName}` : storedUserInfo.firstName) ||
                          storedUserInfo.username ||
                          (storedUserInfo.email ? storedUserInfo.email.split('@')[0] : 'Người dùng')
                });
            } else {
                setUserInfo({ name: 'Người dùng' });
            }
        } else {
            setIsLoggedIn(false);
            setUserInfo({ name: 'Guest' });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const doctor = document.getElementById('doctor').value || 'Hệ thống chỉ định';
        const reason = document.getElementById('reason').value;
        const anonymous = document.getElementById('anonymous').checked;
        const resultDiv = document.getElementById('bookingResult');

        if (!date || !time || !reason) {
            resultDiv.style.display = 'block';
            resultDiv.style.color = '#e53935';
            resultDiv.innerHTML = 'Vui lòng nhập đầy đủ thông tin bắt buộc!';
            return;
        }

        let code = '';
        if (anonymous) {
            code = 'MS' + Math.floor(100000 + Math.random() * 900000);
        }

        resultDiv.style.display = 'block';
        resultDiv.style.color = '#1976d2';
        resultDiv.innerHTML =
            `<b>Đặt lịch thành công!</b><br>
            Ngày hẹn: <b>${date}</b><br>
            Giờ hẹn: <b>${time}</b><br>
            Bác sĩ: <b>${doctor}</b><br>
            Lý do: <b>${reason}</b><br>` +
            (anonymous
                ? `<span style="color:#e53935;">Bạn đã đặt lịch ẩn danh.<br>Mã tra cứu của bạn là: <b>${code}</b></span>`
                : '');

        document.getElementById('bookingForm').reset();
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
                    <h2>ĐẶT LỊCH HẸN</h2>
                    <div className="form-container">
                        <form id="bookingForm" onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <div className="form-group">
                                <label htmlFor="date">Chọn ngày hẹn:</label>
                                <input type="date" id="date" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Chọn giờ hẹn:</label>
                                <input type="time" id="time" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor">Chọn Bác sĩ (Tùy chọn):</label>
                                <select id="doctor">
                                    <option>--Chọn Bác Sĩ--</option>
                                    <option>BS.Nguyễn Duy Thế</option>
                                    <option>BS.Phạm Bá Hiền</option>
                                    <option>BS.Bùi Thanh Bình</option>
                                    <option>BS.Nguyễn Văn Kính</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="reason">Lý do cuộc hẹn:</label>
                                <textarea id="reason" rows="4" required></textarea>
                            </div>
                            <div className="anonymous-note">
                                <strong>Đặt lịch ẩn danh</strong><br />
                                Nếu bạn chọn ẩn danh, thông tin cá nhân của bạn sẽ được bảo mật tuyệt đối với bác sĩ. Bạn sẽ được cấp một mã số để tra cứu lịch hẹn và kết quả sau này
                                <div style={{ marginTop: '8px' }}>
                                    <input type="checkbox" id="anonymous" style={{ verticalAlign: 'middle' }} />
                                    <label htmlFor="anonymous" style={{ fontWeight: 'normal', verticalAlign: 'middle' }}>Đặt lịch ẩn danh</label>
                                </div>
                            </div>
                            <button type="submit">Xác nhận đặt lịch</button>
                        </form>
                        <div id="bookingResult" style={{ marginTop: '18px', fontSize: '1.1em', textAlign: 'center', color: '#1976d2', display: 'none' }}></div>
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

export default Appointment;