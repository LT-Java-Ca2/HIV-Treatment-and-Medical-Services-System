import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assests/History.css';

const History = () => {
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
                    <h2>THEO DÕI LỊCH SỬ KHÁM BỆNH</h2>
                    <div className="history-section-title">Bảng lịch sử khám bệnh</div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ngày khám</th>
                                    <th>Bác sĩ phụ trách</th>
                                    <th>Triệu chứng ghi nhận</th>
                                    <th>Xét nghiệm đã thực hiện</th>
                                    <th>Kê đơn thuốc</th>
                                    <th>Đánh giá từ bác sĩ</th>
                                    <th>Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01/01/2024</td>
                                    <td>THẾ</td>
                                    <td>Mệt mỏi kéo dài</td>
                                    <td>CD4: 280 cells/mm³ (thấp)</td>
                                    <td>Tenofovir Disoproxil Fumarate (TDF)</td>
                                    <td>Nhiễm HIV giai đoạn sớm</td>
                                    <td>Bắt đầu điều trị ARV</td>
                                </tr>
                                <tr>
                                    <td>01/03/2024</td>
                                    <td>HIỀN</td>
                                    <td>Xuất hiện hạch cổ bên phải (kích thước ~1cm)</td>
                                    <td>Tải lượng HIV (VL): 18,000 copies/mL</td>
                                    <td>Lamivudine (3TC)</td>
                                    <td>Chưa có biểu hiện tổn thương cơ nội</td>
                                    <td>Được tư vấn thêm về việc ngủ nghỉ</td>
                                </tr>
                                <tr>
                                    <td>01/06/2024</td>
                                    <td>BÌNH</td>
                                    <td>Hay sốt nhẹ vào chiều</td>
                                    <td>HIV kháng nguyên/kháng thể combo test: Dương tính</td>
                                    <td>Dolutegravir (DTG)</td>
                                    <td>Chưa có tổn thương cơ quan, cần tái khám sớm</td>
                                    <td>Tải lượng virus đang có xu hướng tăng</td>
                                </tr>
                                <tr>
                                    <td>01/09/2024</td>
                                    <td>KÍNH</td>
                                    <td>Ăn kém, chán ăn</td>
                                    <td>Xét nghiệm lao: Âm tính</td>
                                    <td>Zidovudine (AZT)</td>
                                    <td>Chưa đủ chỉ số chẩn đoán AIDS</td>
                                    <td>Theo dõi chức năng gan thận</td>
                                </tr>
                                <tr>
                                    <td>01/01/2025</td>
                                    <td>HIỀN</td>
                                    <td>Ngủ hay thức dậy, đau đầu tăng</td>
                                    <td>Xét nghiệm chức năng gan thận: Bình thường</td>
                                    <td>Lopinavir/Ritonavir (LPV/r)</td>
                                    <td>Giai đoạn ổn định, đáp ứng thuốc tốt</td>
                                    <td>Tư vấn thêm liệu pháp tâm lý</td>
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
};

export default History;