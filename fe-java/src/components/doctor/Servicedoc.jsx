import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../assests/Servicedoc.module.css';

const Servicedoc = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        role: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (loggedStatus && storedUserInfo && storedUserInfo.role === 'doctor') {
            setIsLoggedIn(true);
            setUserInfo(storedUserInfo);
        } else {
            setIsLoggedIn(false);
            setUserInfo({ name: '', role: '' });

            if (loggedStatus && storedUserInfo && storedUserInfo.role === 'patient') {
                alert('Bạn không có quyền truy cập trang này. Đang chuyển hướng về trang bệnh nhân.');
                navigate('/homecustomer');
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
                    <li><Link to="/overview">Trang chủ</Link></li>
                    <li><Link to="/documentdoc">Tài liệu</Link></li>
                    <li><Link to="/blogdoc">Blog</Link></li>
                    <li><Link to="/servicedoc">Dịch vụ</Link></li>
                </ul>
                <div className="navbar-right">
                    {isLoggedIn && userInfo.name && userInfo.role === 'doctor' ? (
                        <>
                            <span className="user-name-display">{userInfo.name}</span>
                            <Link to="/person" title="Thông tin cá nhân"><i className="material-icons">account_circle</i></Link>
                        </>
                    ) : (
                        <Link to="/register" title="Đăng nhập Bác sĩ"><i className="material-icons">person_add</i></Link>
                    )}
                </div>
            </nav>

            <div className={styles.mainContainer}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarMenuBox}>
                        <div className={styles.sidebarTitle}>BÁC SĨ</div>
                        <div className={styles.sidebarMenu}>
                            <Link to="/overview" className={styles.sidebarLink}>Tổng quan</Link>
                            <Link to="/list" className={styles.sidebarLink}>Danh sách bệnh nhân</Link>
                            <Link to="/arv" className={styles.sidebarLink}>Phác đồ ARV</Link>
                            <Link to="/work" className={styles.sidebarLink}>Lịch làm việc</Link>
                            <Link to="/mess" className={styles.sidebarLink}>Tin nhắn</Link>
                        </div>
                    </div>
                </aside>
                <main className={styles.mainContent}>
                    <h2>Dịch vụ của chúng tôi</h2>
                    <div className={styles.servicesGrid}>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceTitle}>Khám & Điều trị HIV</div>
                            <div className={styles.serviceDesc}>
                                Cung cấp dịch vụ khám sức khỏe toàn diện và điều trị chuyên sâu cho bệnh nhân HIV, theo dõi sát sao và cập nhật phương pháp điều trị tiên tiến nhất.
                            </div>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceTitle}>Tư vấn tâm lý & Hỗ trợ</div>
                            <div className={styles.serviceDesc}>
                                Hỗ trợ tâm lý cho bệnh nhân và gia đình, giúp giảm căng thẳng, lo lắng, đồng thời cung cấp các giải pháp nâng cao chất lượng cuộc sống.
                            </div>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceTitle}>Giáo dục & Phòng chống Kỳ thị</div>
                            <div className={styles.serviceDesc}>
                                Tổ chức các chương trình giáo dục, tuyên truyền nhằm nâng cao nhận thức cộng đồng về HIV và giảm thiểu định kiến, kỳ thị đối với người nhiễm HIV.
                            </div>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceTitle}>Hỗ trợ Dinh dưỡng & Sức khỏe</div>
                            <div className={styles.serviceDesc}>
                                Tư vấn dinh dưỡng hợp lý cho bệnh nhân HIV, giúp xây dựng chế độ ăn uống phù hợp và nâng cao hệ miễn dịch và cải thiện sức khỏe tổng thể.
                            </div>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceTitle}>Quản lý & Theo dõi Điều trị</div>
                            <div className={styles.serviceDesc}>
                                Cập nhật và lưu hồ sơ bệnh án, theo dõi theo dõi điều trị hiệu quả và phản ứng thuốc, nhằm tối ưu hoá kết quả và sức khỏe bệnh nhân.
                            </div>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceTitle}>Hỗ trợ Cộng đồng & Kết nối</div>
                            <div className={styles.serviceDesc}>
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

export default Servicedoc;