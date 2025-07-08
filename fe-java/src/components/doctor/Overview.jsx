import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../assests/Overview.module.css';

function Overview() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        role: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        console.log("Logged Status (Overview):", loggedStatus);
        console.log("Stored User Info (Overview):", storedUserInfo);

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
                            <Link to="/overview" className={`${styles.sidebarLink} ${styles.active}`}>Tổng quan</Link>
                            <Link to="/list" className={styles.sidebarLink}>Danh sách bệnh nhân</Link>
                            <Link to="/arv" className={styles.sidebarLink}>Phác đồ ARV</Link>
                            <Link to="/work" className={styles.sidebarLink}>Lịch làm việc</Link>
                            <Link to="/mess" className={styles.sidebarLink}>Tin nhắn</Link>
                        </div>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    <div className={styles.overviewContainer}>
                        <h2>TỔNG QUAN HÔM NAY</h2>
                        <div className={styles.overviewRow}>
                            <div className={styles.overviewBox}>
                                <h3>Cuộc hẹn hôm nay</h3>
                                <div className={styles.overviewNumber}>12</div>
                            </div>
                            <div className={styles.overviewBox}>
                                <h3>Bệnh nhân mới</h3>
                                <ul className={styles.overviewList}>
                                    <li>Nguyễn Văn A</li>
                                    <li>Trần Thị B</li>
                                    <li>Phạm Thị C</li>
                                </ul>
                            </div>
                            <div className={styles.overviewBox}>
                                <h3>Nhắc nhở tái khám & Đơn thuốc</h3>
                                <ul className={styles.overviewList}>
                                    <li>Nguyễn Văn A - tái khám 25/05/2025</li>
                                    <li>Trần Thị B - đơn thuốc mới</li>
                                    <li>Phạm Thị C - tái khám 27/05/2025</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.chartSection}>
                            <div className={styles.chartTitle}>Biểu đồ số bệnh nhân theo phác đồ ARV</div>
                            <div className={styles.barChart}>
                                <div className={styles.barGroup}>
                                    <div className={styles.bar} style={{ height: '120px' }}>120</div>
                                    <div className={styles.barLabel}>TDF + 3TC + DTG<br />(Người lớn)</div>
                                </div>
                                <div className={styles.barGroup}>
                                    <div className={styles.bar} style={{ height: '90px' }}>90</div>
                                    <div className={styles.barLabel}>TDF + 3TC + EFV<br />(Phụ nữ mang thai)</div>
                                </div>
                                <div className={styles.barGroup}>
                                    <div className={styles.bar} style={{ height: '60px' }}>60</div>
                                    <div className={styles.barLabel}>ABC + 3TC + LPV/r<br />(Trẻ em)</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.scheduleSection}>
                            <div className={styles.scheduleTitle}>Lịch làm việc tuần này</div>
                            <table className={styles.scheduleTable}>
                                <thead>
                                    <tr>
                                        <th>Thứ</th>
                                        <th>Buổi sáng</th>
                                        <th>Buổi chiều</th>
                                        <th>Phòng khám</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Thứ 2</td>
                                        <td>8:00 - 12:00</td>
                                        <td>Nghỉ</td>
                                        <td>Phòng Khám B</td>
                                        <td>Khám ARV</td>
                                    </tr>
                                    <tr>
                                        <td>Thứ 3</td>
                                        <td>Nghỉ</td>
                                        <td>14:00 - 18:00</td>
                                        <td>Phòng Khám C</td>
                                        <td>Khám Tư Vấn</td>
                                    </tr>
                                    <tr>
                                        <td>Thứ 4</td>
                                        <td>Nghỉ</td>
                                        <td>14:00 - 18:00</td>
                                        <td>Phòng Khám A</td>
                                        <td>Khám HIV</td>
                                    </tr>
                                    <tr>
                                        <td>Thứ 5</td>
                                        <td>8:00 - 12:00</td>
                                        <td>Nghỉ</td>
                                        <td>Phòng Họp</td>
                                        <td>Họp hội đồng</td>
                                    </tr>
                                    <tr>
                                        <td>Thứ 6</td>
                                        <td>8:00 - 12:00</td>
                                        <td>14:00 - 18:00</td>
                                        <td>Phòng Khám E</td>
                                        <td>Khám tổng quát</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.systemSection}>
                            <div className={styles.systemTitle}>Thông báo hệ thống</div>
                            <ul className={styles.systemList}>
                                <li>Phần mềm sẽ tự động sao lưu dữ liệu mỗi 24 giờ.</li>
                                <li>Cập nhật phiên bản mới sẽ được thông báo qua email.</li>
                                <li>Quý bác sĩ vui lòng kiểm tra lại danh sách bệnh nhân trước khi khám.</li>
                            </ul>
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
}

export default Overview;