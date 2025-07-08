import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from '../../assests/Blogdoc.module.css';

const Blogdoc = () => {
    const navigate = useNavigate(); 

    const [userInfo, setUserInfo] = useState({
        name: '',
        role: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        console.log("Logged Status (Blogdoc):", loggedStatus);
        console.log("Stored User Info (Blogdoc):", storedUserInfo);

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

                <main className={styles.content}>
                    <h2>Blog chia sẻ bệnh nhân</h2>
                    <div className={styles.post}>
                        <div className={styles.postHeader}>
                            <div className={styles.authorDate}>
                                <div className={styles.avatar}>H</div>
                                <div>
                                    <div className={styles.authorName}>Hà Thị Mai</div>
                                </div>
                            </div>
                            <div className={styles.date}>20/05/2025</div>
                        </div>
                        <div className={styles.postTitle}><a href="#">Hành trình vượt qua mặc cảm và kì thị</a></div>
                        <div className={styles.postContent}>
                            Tôi muốn chia sẻ câu chuyện của mình để mọi người hiểu hơn về những khó khăn, nỗi đau khi sống chung với HIV và làm sao tôi tìm được niềm tin và sự yêu thương từ gia đình cũng như cộng đồng.
                            Điều quan trọng là đừng để kỳ thị làm mình gục ngã, hãy tự tin và tin rằng bạn xứng đáng được hạnh phúc và chăm sóc tốt nhất.
                        </div>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.postHeader}>
                            <div className={styles.authorDate}>
                                <div className={styles.avatar}>T</div>
                                <div>
                                    <div className={styles.authorName}>Trần Văn Nam</div>
                                </div>
                            </div>
                            <div className={styles.date}>15/05/2025</div>
                        </div>
                        <div className={styles.postTitle}><a href="#">Chia sẻ kinh nghiệm giữ gìn sức khỏe khi điều trị</a></div>
                        <div className={styles.postContent}>
                            Trong quá trình điều trị HIV, tôi đã học cách duy trì chế độ ăn uống lành mạnh, luyện tập thể dục đều đặn và giữ tinh thần lạc quan. Điều này giúp tôi có sức khỏe tốt và ít gặp tác dụng phụ từ thuốc.
                        </div>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.postHeader}>
                            <div className={styles.authorDate}>
                                <div className={styles.avatar}>M</div>
                                <div>
                                    <div className={styles.authorName}>Nguyễn Quốc Minh</div>
                                </div>
                            </div>
                            <div className={styles.date}>12/05/2025</div>
                        </div>
                        <div className={styles.postTitle}><a href="#">Vượt qua HIV để sống khỏe mạnh và có ích</a></div>
                        <div className={styles.postContent}>
                            Tôi một người trẻ tuổi đầy nghị lực, phát hiện nhiễm HIV cách đây 5 năm. Thay vì gục ngã, Tôi đã chọn đối mặt và tìm kiếm sự hỗ trợ.
                            Qua quá trình điều trị ARV đều đặn và nhận được sự động viên, tư vấn nhiệt tình từ đội ngũ bác sĩ cùng tình yêu thương từ gia đình, Tôi không chỉ vượt qua khó khăn mà còn sống khỏe mạnh, tích cực.
                        </div>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.postHeader}>
                            <div className={styles.authorDate}>
                                <div className={styles.avatar}>N</div>
                                <div>
                                    <div className={styles.authorName}>Lê Thùy Nga</div>
                                </div>
                            </div>
                            <div className={styles.date}>07/05/2025</div>
                        </div>
                        <div className={styles.postTitle}><a href="#">Hành trình điều trị ARV</a></div>
                        <div className={styles.postContent}>
                            Tôi đã trải qua nhiều khó khăn khi mới bắt đầu điều trị ARV, từ những tác dụng phụ như mệt mỏi, buồn nôn đến cảm giác lo sợ và mất niềm tin.
                            Việc tuân thủ đúng phác đồ điều trị không chỉ giúp tôi giữ vững sức khỏe mà còn mang lại sự bình yên trong tâm hồn.
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

export default Blogdoc;