import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assests/Advise.css';

const  Advise= () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [resultMessage, setResultMessage] = useState({ text: '', color: '' });
    // Thêm trạng thái mới để kiểm soát việc hiển thị form
    const [showForm, setShowForm] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !message) {
            setResultMessage({
                text: 'Vui lòng nhập đầy đủ họ tên, số điện thoại và nội dung tư vấn!',
                color: '#e53935'
            });
            return;
        }

        setResultMessage({
            text: `Cảm ơn bạn <b>${name}</b>! Chúng tôi sẽ liên hệ tư vấn miễn phí qua số <b>${phone}</b>.<br>Nội dung tư vấn: <i>${message}</i>`,
            color: '#1976d2'
        });

        // Ẩn form sau khi gửi thành công
        setShowForm(false);
    };

    // Hàm để reset form và hiển thị lại
    const handleNewConsultation = () => {
        setName('');
        setPhone('');
        setMessage('');
        setResultMessage({ text: '', color: '' }); // Xoá thông báo cũ
        setShowForm(true); // Hiển thị lại form
    };

    return (
        <>
             {/* Navbar Section */}
             <nav className="navbar">
               <div className="navbar-left">
                 <span className="nav-brand">HIV - MTSS</span>
               </div>
               <ul className="nav-links">
                 <li><Link to="/homecustommer">Trang chủ</Link></li>
                 <li><Link to="/document">Tài liệu</Link></li>
                 <li><Link to="/blog">Blog</Link></li>
                 <li><Link to="/service">Dịch vụ</Link></li> {/* This links to the current component */}
                 <li><Link to="/result">Kết quả</Link></li>
               </ul>
               <div className="navbar-right">
                 <Link to="/personal"><i className="material-icons">account_circle</i></Link>
                 <i className="material-icons">arrow_drop_down</i>
               </div>
             </nav>
       
             {/* Main Content & Sidebar Container */}
             <div className="container">
               {/* Sidebar Section */}
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
                    <div className="profile-wrapper">
                        <div className="profile-container">
                            <h2>TƯ VẤN TRỰC TUYẾN</h2>
                            <div className="patient-profile-card">
                                <div className="profile-section">
                                    <h3>Đăng ký tư vấn miễn phí</h3>

                                    {/* Hiển thị form hoặc thông báo tùy thuộc vào trạng thái showForm */}
                                    {showForm ? (
                                        <form onSubmit={handleSubmit} className="section-content" autoComplete="off">
                                            <label htmlFor="adviceName">Họ tên:</label>
                                            <input
                                                type="text"
                                                id="adviceName"
                                                placeholder="Nhập họ tên..."
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <label htmlFor="advicePhone">Số điện thoại:</label>
                                            <input
                                                type="tel"
                                                id="advicePhone"
                                                placeholder="Nhập số điện thoại..."
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <label htmlFor="adviceMsg">Nội dung cần tư vấn:</label>
                                            <textarea
                                                id="adviceMsg"
                                                rows="3"
                                                placeholder="Nhập nội dung cần tư vấn..."
                                                required
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1em', marginBottom: '14px' }}
                                            ></textarea>
                                            <button type="submit">Gửi</button>
                                        </form>
                                    ) : (
                                        <div className="section-content" style={{ textAlign: 'center' }}>
                                            {resultMessage.text && (
                                                <div
                                                    className="result-message"
                                                    style={{ display: 'block', color: resultMessage.color, marginBottom: '20px' }}
                                                    dangerouslySetInnerHTML={{ __html: resultMessage.text }}
                                                ></div>
                                            )}
                                            <button onClick={handleNewConsultation} className="btn primary">
                                                Tạo yêu cầu tư vấn mới
                                            </button>
                                        </div>
                                    )}
                                </div>
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

export default Advise;