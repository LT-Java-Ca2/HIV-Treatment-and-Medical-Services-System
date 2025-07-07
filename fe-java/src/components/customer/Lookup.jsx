import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assests/Lookup.css';

const Lookup = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState(null);

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

    const patientData = [
        {
            name: 'BẢO PHẠM',
            code: 'BN001',
            gender: 'Nam',
            cd4: '520 cells/mm<sup>3</sup>',
            cd4date: '15/05/2025',
            viral: 'Không phát hiện',
            viraldate: '15/05/2025',
            regimen: 'TDF+ 3TC + DTG',
            note: 'Phù hợp cho nam trưởng thành, tuân thủ tốt'
        },
        {
            name: 'QUỐC AN',
            code: 'BN002',
            gender: 'Nữ',
            cd4: '410 cells/mm<sup>3</sup>',
            cd4date: '10/05/2025',
            viral: 'Phát hiện (2,000 copies/mL)',
            viraldate: '10/05/2025',
            regimen: 'AZT + 3TC + EFV',
            note: 'Cần theo dõi sát tải lượng virus'
        },
        {
            name: 'KHANG TRUONG',
            code: 'BN003',
            gender: 'Nam',
            cd4: '650 cells/mm<sup>3</sup>',
            cd4date: '05/05/2025',
            viral: 'Không phát hiện',
            viraldate: '05/05/2025',
            regimen: 'TDF + 3TC + DTG',
            note: 'Đáp ứng điều trị tốt'
        }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        const value = searchInput.trim().toLowerCase();

        const foundPatient = patientData.find((item) =>
            value === item.code.toLowerCase() ||
            value === item.name.toLowerCase() ||
            item.name.toLowerCase().includes(value) ||
            item.code.toLowerCase().includes(value)
        );

        setSearchResult(foundPatient);
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
                    <div className="info-profile-card">
                        <h2 className="title">TRA CỨU THÔNG TIN XÉT NGHIỆM</h2>
                        <form className="search-form" onSubmit={handleSearch}>
                            <input
                                type="text"
                                className="search-input"
                                id="searchInput"
                                placeholder="Nhập mã bệnh nhân hoặc họ tên..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="search-btn"
                            >
                                Tra cứu
                            </button>
                        </form>

                        {searchResult ? (
                            <div id="searchResult">
                                <div className="info-section-title">Thông tin cá nhân</div>
                                <div className="info-list">
                                    <div className="info-item">
                                        <span className="info-label">Họ tên:</span>
                                        <span className="info-value">{searchResult.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Mã bệnh nhân:</span>
                                        <span className="info-value">{searchResult.code}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Giới tính:</span>
                                        <span className="info-value">{searchResult.gender}</span>
                                    </div>
                                </div>
                                <div className="info-section-title">Kết quả CD4</div>
                                <div className="info-list">
                                    <div className="info-item">
                                        <span className="info-label">Số lượng tế bào CD4:</span>
                                        <span className="info-value" dangerouslySetInnerHTML={{ __html: searchResult.cd4 }}></span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Ngày xét nghiệm:</span>
                                        <span className="info-value">{searchResult.cd4date}</span>
                                    </div>
                                </div>
                                <div className="info-section-title">Tải lượng HIV (Viral Load)</div>
                                <div className="info-list">
                                    <div className="info-item">
                                        <span className="info-label">Kết quả:</span>
                                        <span className="info-value">{searchResult.viral}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Ngày xét nghiệm:</span>
                                        <span className="info-value">{searchResult.viraldate}</span>
                                    </div>
                                </div>
                                <div className="info-section-title">Phác đồ điều trị hiện tại</div>
                                <div className="info-list">
                                    <div className="info-item">
                                        <span className="info-label">Phác đồ:</span>
                                        <span className="info-value">{searchResult.regimen}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Ghi chú:</span>
                                        <span className="info-value">{searchResult.note}</span>
                                    </div>
                                </div>
                                <div className="footer-note">
                                    Thông tin được cập nhật tự động từ hệ thống xét nghiệm và điều trị HIV của cơ sở y tế.
                                </div>
                            </div>
                        ) : (
                            searchResult === false && (
                                <div style={{ color: '#e53935', textAlign: 'center', fontSize: '1.1em', padding: '24px 0' }}>
                                    Không tìm thấy kết quả phù hợp.
                                </div>
                            )
                        )}
                    </div>
                </main>
            </div>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-left">
                        <span className="footer-logo">HIV - MTSS</span>
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

export default Lookup;