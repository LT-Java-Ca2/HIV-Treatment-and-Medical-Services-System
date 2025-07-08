import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../assests/ARV.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ARVImage from '../../assests/ARV.png'


const ARV = () => {
    const navigate = useNavigate();

    const [activeSidebarLink, setActiveSidebarLink] = useState('Phác đồ ARV');

    const [userInfo, setUserInfo] = useState({
        name: '',
        role: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        console.log("Logged Status (ARV):", loggedStatus);
        console.log("Stored User Info (ARV):", storedUserInfo);

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

    const [filterCategory, setFilterCategory] = useState('Tất cả');

    const [arvData] = useState([
        { id: 1, regimen: 'TDF + 3TC + DTG', description: 'Phác đồ điều trị phổ biến hiệu quả cao, ít tác dụng phụ', target: 'Người lớn, thanh thiếu niên' },
        { id: 2, regimen: 'AZT + 3TC + EFV', description: 'Phác đồ thế hệ cũ, thường dùng khi chống chỉ định DTG', target: 'Người lớn' },
        { id: 3, regimen: 'TDF + 3TC + EFV', description: 'Thay thế EFV khi có tác dụng phụ nhẹ', target: 'Người lớn' },
        { id: 4, regimen: 'AZT + 3TC + LPV/r', description: 'Phác đồ dành cho bệnh nhân kháng thuốc hoặc thai phụ', target: 'Phụ nữ mang thai, người kháng thuốc' },
        { id: 5, regimen: 'ABC + 3TC + DTG', description: 'Phác đồ thay thế cho bệnh nhân dị ứng TDF', target: 'Người lớn dị ứng TDF' },
        { id: 6, regimen: 'AZT + 3TC + NVP', description: 'Phác đồ cho trẻ em dưới 3 tuổi', target: 'Trẻ em' },
    ]);

    const filteredArvData = arvData.filter(item =>
        filterCategory === 'Tất cả' || item.target === filterCategory
    );

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const renderMainContent = () => {
        switch (activeSidebarLink) {
            case 'Tổng quan':
                return (
                    <div className={styles.content}>
                        <h2 className={styles.pageTitle}>Tổng quan Bác sĩ</h2>
                        <p>Thông tin tổng quan về các hoạt động và số liệu thống kê.</p>
                    </div>
                );
            case 'Danh sách bệnh nhân':
                return (
                    <div className={styles.content}>
                        <h2 className={styles.pageTitle}>Danh sách bệnh nhân của bạn</h2>
                        <p>Quản lý danh sách bệnh nhân và hồ sơ của họ.</p>
                    </div>
                );
            case 'Phác đồ ARV':
                return (
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <h2 className={styles.pageTitle}>Phác đồ điều trị ARV</h2>
                            <div className={styles.filterSection}>
                                <div className={styles.filterLabel}>Lọc theo đối tượng:</div>
                                <div className={styles.filterGroup}>
                                    <select
                                        className={styles.filterSelect}
                                        id="filterCategory"
                                        value={filterCategory}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="Tất cả">Tất cả</option>
                                        <option value="Người lớn, thanh thiếu niên">Người lớn, thanh thiếu niên</option>
                                        <option value="Trẻ em">Trẻ em</option>
                                        <option value="Người lớn">Người lớn</option>
                                        <option value="Người lớn dị ứng TDF">Người lớn dị ứng TDF</option>
                                        <option value="Phụ nữ mang thai, người kháng thuốc">Phụ nữ mang thai, người kháng thuốc</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={styles.tableContainer}>
                            <table className={styles.arvTable}>
                                <thead className={styles.tableHeader}>
                                    <tr>
                                        <th>Phác đồ chuẩn</th>
                                        <th>Mô tả</th>
                                        <th>Đối tượng áp dụng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredArvData.map(row => (
                                        <tr key={row.id} className={styles.tableRow}>
                                            <td className={styles.tableCell}>{row.regimen}</td>
                                            <td className={styles.tableCell}>{row.description}</td>
                                            <td className={styles.tableCell}>{row.target}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={ARVImage}alt="phác đồ ARV" />
                        </div>
                    </div>
                );
            case 'Lịch làm việc':
                return (
                    <div className={styles.content}>
                        <h2 className={styles.pageTitle}>Lịch làm việc của Bác sĩ</h2>
                        <p>Quản lý lịch hẹn và ca làm việc của bạn.</p>
                    </div>
                );
            case 'Tin nhắn':
                return (
                    <div className={styles.content}>
                        <h2 className={styles.pageTitle}>Tin nhắn & Hỗ trợ</h2>
                        <p>Đây là nơi giao diện trò chuyện của bạn sẽ hiển thị.</p>
                    </div>
                );
            case 'Hồ sơ cá nhân':
                return (
                    <div className={styles.content}>
                        <h2 className={styles.pageTitle}>Hồ sơ cá nhân của Bác sĩ</h2>
                        <p>Xem và chỉnh sửa thông tin cá nhân của bạn.</p>
                    </div>
                );
            default:
                return null;
        }
    };

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
                            <Link to="/arv" className={`${styles.sidebarLink} ${styles.active}`}>Phác đồ ARV</Link>
                            <Link to="/work" className={styles.sidebarLink}>Lịch làm việc</Link>
                            <Link to="/mess" className={styles.sidebarLink}>Tin nhắn</Link>
                        </div>
                    </div>
                </aside>

                <main className={styles.content}>
                    {renderMainContent()}
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

export default ARV;