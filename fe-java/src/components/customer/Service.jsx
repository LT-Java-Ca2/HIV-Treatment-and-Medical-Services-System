import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assests/Service.css';

const Service = () => {
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
                    <h2>Dịch vụ của chúng tôi</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-title">Khám &amp; Điều trị HIV</div>
                            <div className="service-desc">
                                Cung cấp dịch vụ khám sức khỏe toàn diện và điều trị chuyên sâu cho bệnh nhân HIV, theo dõi sát sao và cập nhật phương pháp điều trị tiên tiến nhất.
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="service-title">Tư vấn tâm lý &amp; Hỗ trợ</div>
                            <div className="service-desc">
                                Hỗ trợ tâm lý cho bệnh nhân và gia đình, giúp giảm căng thẳng, lo lắng, đồng thời cung cấp các giải pháp nâng cao chất lượng cuộc sống.
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="service-title">Giáo dục &amp; Phòng chống Kỳ thị</div>
                            <div className="service-desc">
                                Tổ chức các chương trình giáo dục, tuyên truyền nhằm nâng cao nhận thức cộng đồng về HIV và giảm thiểu định kiến, kỳ thị đối với người nhiễm HIV.
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="service-title">Hỗ trợ Dinh dưỡng &amp; Sức khỏe</div>
                            <div className="service-desc">
                                Tư vấn dinh dưỡng hợp lý cho bệnh nhân HIV, giúp xây dựng chế độ ăn uống phù hợp và nâng cao hệ miễn dịch và cải thiện sức khỏe tổng thể.
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="service-title">Quản lý &amp; Theo dõi Điều trị</div>
                            <div className="service-desc">
                                Cập nhật và lưu hồ sơ bệnh án, theo dõi theo dõi điều trị hiệu quả và phản ứng thuốc, nhằm tối ưu hoá kết quả và sức khỏe bệnh nhân.
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="service-title">Hỗ trợ Cộng đồng &amp; Kết nối</div>
                            <div className="service-desc">
                                Tạo cầu nối giữa bệnh nhân với cộng đồng, tổ chức các hoạt động hỗ trợ và chia sẻ kinh nghiệm, nhằm phát triển mạng lưới hỗ trợ và giảm thiểu mặc cảm.
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

export default Service;