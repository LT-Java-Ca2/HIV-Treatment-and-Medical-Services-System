import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import styles from '../../assests/Documentdoc.module.css'; // Import CSS Module
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import HIVImage from '../../assests/HIV.jpg';
import GiamKyThiImage from '../../assests/giamkithi.jpg';
import YteImage from '../../assests/yte.jpg';
import ARVttImage from '../../assests/ARV tt.jpeg';

const Documentdoc = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        role: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        console.log("Logged Status (Documentdoc):", loggedStatus);
        console.log("Stored User Info (Documentdoc):", storedUserInfo);

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
                    <h2>Tài liệu giáo dục</h2>
                    <div className={styles.cardList}>
                        <div className={styles.card}>
                            <img src={HIVImage} alt="HIV/AIDS" className={styles.cardImg} />
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle} style={{ marginLeft: '20px' }}>Hiểu đúng về HIV/AIDS</h2>
                                <p className={styles.cardDesc}>Tài liệu giúp bạn hiểu rõ HIV là gì, cách lây truyền, và cách phòng tránh đúng cách để bảo vệ bản thân và cộng đồng.</p>
                                <a href="https://www.vinmec.com/vie/bai-viet/hiv-va-aids-nhung-dieu-ban-can-nho-vi" target="_blank" rel="noopener noreferrer">
                                    <button className={styles.cardBtn}>Xem chi tiết »</button>
                                </a>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <img src={GiamKyThiImage} alt="Giảm kỳ thị" className={styles.cardImg} />
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>Giảm kỳ thị & Phân biệt đối xử người nhiễm HIV</h2>
                                <p className={styles.cardDesc}>Hướng dẫn các cách tiếp cận tích cực nhằm giảm kỳ thị, giúp người nhiễm HIV hòa nhập cộng đồng nâng cao chất lượng cuộc sống.</p>
                                <a href="https://yte.nghean.gov.vn/tin-chuyen-nganh/giam-ky-thi-voi-hiv-don-bay-huong-toi-ket-thuc-dai-dich-aids-vao-nam-2030-606319" target="_blank" rel="noopener noreferrer">
                                    <button className={styles.cardBtn}>Xem chi tiết »</button>
                                </a>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <img src={YteImage} alt="Chăm sóc sức khỏe" className={styles.cardImg} />
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>Chăm sóc sức khỏe cho người nhiễm HIV</h2>
                                <p className={styles.cardDesc}>Tài liệu hướng dẫn chế độ dinh dưỡng, luyện tập và cách theo dõi sức khỏe để hỗ trợ điều trị hiệu quả cho người nhiễm HIV.</p>
                                <a href="https://hiv.com.vn/thuoc-dieu-tri-hiv/luu-y-cham-soc-dieu-tri-cho-nguoi-nhiem-hiv-aids-449483" target="_blank" rel="noopener noreferrer">
                                    <button className={styles.cardBtn}>Xem chi tiết »</button>
                                </a>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <img src={ARVttImage} alt="Lợi ích của ARV" className={styles.cardImg} />
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle} style={{ marginLeft: '20px' }}>Lợi ích của ARV</h2>
                                <p className={styles.cardDesc}>Tài liệu cung cấp kiến thức về lợi ích của thuốc ARV trong việc kiểm soát HIV, kéo dài tuổi thọ và giảm nguy cơ lây truyền cho người khác.</p>
                                <a href="https://www.pharmacity.vn/dieu-tri-arv-hieu-qua-phac-do-chuan-tac-dung-phu-can-biet.htm" target="_blank" rel="noopener noreferrer">
                                    <button className={styles.cardBtn}>Xem chi tiết »</button>
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
                            © 2025 Trung tâm điều trị HIV. Mọi quyền được bảo riserv.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Documentdoc;