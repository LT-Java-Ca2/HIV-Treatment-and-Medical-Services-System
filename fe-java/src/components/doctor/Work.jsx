import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../assests/Work.module.css';

function Work() {
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

            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarMenuBox}>
                        <div className={styles.sidebarTitle}>BÁC SĨ</div>
                        <div className={styles.sidebarMenu}>
                            <Link to="/overview" className={styles.sidebarLink}>Tổng quan</Link>
                            <Link to="/list" className={styles.sidebarLink}>Danh sách bệnh nhân</Link>
                            <Link to="/arv" className={styles.sidebarLink}>Phác đồ ARV</Link>
                            <Link to="/work" className={`${styles.sidebarLink} ${styles.active}`}>Lịch làm việc</Link>
                            <Link to="/mess" className={styles.sidebarLink}>Tin nhắn</Link>
                        </div>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    <div className={styles.calendarContainer}>
                        <h2>Lịch làm việc Tháng 5 - BS.Nguyễn Duy Thế </h2>
                        <table className={styles.calendarTable}>
                            <thead>
                                <tr>
                                    <th>Thứ 2</th>
                                    <th>Thứ 3</th>
                                    <th>Thứ 4</th>
                                    <th>Thứ 5</th>
                                    <th>Thứ 6</th>
                                    <th>Thứ 7</th>
                                    <th>Chủ nhật</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <span>1</span>
                                        <div className={`${styles.event} ${styles.green}`}>9:00 - Khám Tư Vấn</div>
                                    </td>
                                    <td><span>2</span></td>
                                    <td>
                                        <span>3</span>
                                        <div className={`${styles.event} ${styles.green}`}>17:00 - Tái khám HIV</div>
                                    </td>
                                    <td><span>4</span></td>
                                    <td><span>5</span></td>
                                    <td><span>6</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>7</span>
                                        <div className={`${styles.event} ${styles.green}`}>8:00 - Khám ARV</div>
                                    </td>
                                    <td><span>8</span></td>
                                    <td>
                                        <span>9</span>
                                        <div className={`${styles.event} ${styles.green}`}>16:00 - Khám Tư Vấn</div>
                                    </td>
                                    <td><span>10</span></td>
                                    <td>
                                        <span>11</span>
                                        <div className={`${styles.event} ${styles.green}`}>10:00 - Khám tổng quát</div>
                                    </td>
                                    <td><span>12</span></td>
                                    <td><span>13</span></td>
                                </tr>
                                <tr>
                                    <td><span>14</span></td>
                                    <td><span>15</span></td>
                                    <td>
                                        <span>16</span>
                                        <div className={`${styles.event} ${styles.green}`}>15:00 - Khám HIV</div>
                                    </td>
                                    <td><span>17</span></td>
                                    <td><span>18</span></td>
                                    <td><span>19</span></td>
                                    <td><span>20</span></td>
                                </tr>
                                <tr>
                                    <td><span>21</span></td>
                                    <td>
                                        <span>22</span>
                                        <div className={`${styles.event} ${styles.green}`}>14:00 - Xét nghiệm CD4</div>
                                    </td>
                                    <td><span>23</span></td>
                                    <td><span>24</span></td>
                                    <td>
                                        <span>25</span>
                                        <div className={`${styles.event} ${styles.blue}`}>18:00 - Công Tác</div>
                                    </td>
                                    <td><span>26</span></td>
                                    <td><span>27</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>28</span>
                                        <div className={`${styles.event} ${styles.green}`}>11:00 - Tái khám ARV</div>
                                    </td>
                                    <td><span>29</span></td>
                                    <td><span>30</span></td>
                                    <td>
                                        <span>31</span>
                                        <div className={`${styles.event} ${styles.blue}`}>12:00 - Họp hội đồng</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
}

export default Work;