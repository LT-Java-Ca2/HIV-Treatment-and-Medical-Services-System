import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assests/Document.css';
import HIVImage from '../../assests/HIV.jpg';
import GiamKyThiImage from '../../assests/giamkithi.jpg';
import YteImage from '../../assests/yte.jpg';
import ARVttImage from '../../assests/ARV tt.jpeg';

const Document = () => {
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
                    <h2 className="main-title">Tài liệu giáo dục</h2>
                    <div className="card-list">
                        <div className="card">
                           <img src={HIVImage} alt="Giảm kỳ thị" className="card-img" />
                            <div className="card-content">
                                <h2 className="card-title">Hiểu đúng về HIV/AIDS</h2>
                                <p className="card-desc">Tài liệu giúp bạn hiểu rõ HIV là gì, cách lây truyền, và cách phòng tránh đúng cách để bảo vệ bản thân và cộng đồng.</p>
                                <a href="https://www.vinmec.com/vie/bai-viet/hiv-va-aids-nhung-dieu-ban-can-nho-vi">
                                    <button className="card-btn">Xem chi tiết »</button>
                                </a>
                            </div>
                        </div>
                        <div className="card">
                            <img src={GiamKyThiImage} alt="Giảm kỳ thị" className="card-img" />
                            <div className="card-content">
                                <h2 className="card-title">Giảm kỳ thị & Phân biệt đối xử người nhiễm HIV</h2>
                                <p className="card-desc">Hướng dẫn các cách tiếp cận tích cực nhằm giảm kỳ thị, giúp người nhiễm HIV hòa nhập cộng đồng nâng cao chất lượng cuộc sống.</p>
                                <a href="https://yte.nghean.gov.vn/tin-chuyen-nganh/giam-ky-thi-voi-hiv-don-bay-huong-toi-ket-thuc-dai-dich-aids-vao-nam-2030-606319">
                                    <button className="card-btn">Xem chi tiết »</button>
                                </a>
                            </div>
                        </div>
                        <div className="card">
                            <img src={YteImage} alt="Chăm sóc sức khỏe" className="card-img" />
                            <div className="card-content">
                                <h2 className="card-title">Chăm sóc sức khỏe cho người nhiễm HIV</h2>
                                <p className="card-desc">Tài liệu hướng dẫn chế độ dinh dưỡng, luyện tập và cách theo dõi sức khỏe để hỗ trợ điều trị hiệu quả cho người nhiễm HIV.</p>
                                <a href="https://hiv.com.vn/thuoc-dieu-tri-hiv/luu-y-cham-soc-dieu-tri-cho-nguoi-nhiem-hiv-aids-449483">
                                    <button className="card-btn">Xem chi tiết »</button>
                                </a>
                            </div>
                        </div>
                        <div className="card">
                            <img src={ARVttImage} alt="Lợi ích của ARV" className="card-img" />
                            <div className="card-content">
                                <h2 className="card-title" style={{ marginLeft: '20px' }}>Lợi ích của ARV</h2>
                                <p className="card-desc">Tài liệu cung cấp kiến thức về lợi ích của thuốc ARV trong việc kiểm soát HIV, kéo dài tuổi thọ và giảm nguy cơ lây truyền cho người khác.</p>
                                <a href="https://www.pharmacity.vn/dieu-tri-arv-hieu-qua-phac-do-chuan-tac-dung-phu-can-biet.htm">
                                    <button className="card-btn">Xem chi tiết »</button>
                                </a>
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

export default Document;