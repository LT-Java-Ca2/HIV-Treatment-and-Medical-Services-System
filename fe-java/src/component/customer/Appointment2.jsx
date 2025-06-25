import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../assests/Appointment2.css'; // Assuming you have a CSS file for styling

const Appointment2 = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const doctor = document.getElementById('doctor').value || 'Hệ thống chỉ định';
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const reason = document.getElementById('reason').value.trim();
        const anonymous = document.getElementById('anonymous').checked;
        const resultDiv = document.getElementById('bookingResult');

        // Validate
        if (!date || !time || !reason || (!anonymous && (!name || !phone))) {
            resultDiv.style.display = 'block';
            resultDiv.style.color = '#e53935';
            resultDiv.innerHTML = 'Vui lòng nhập đầy đủ thông tin bắt buộc!';
            return;
        }

        let code = '';
        if (anonymous) {
            code = 'MS' + Math.floor(100000 + Math.random() * 900000);
        }

        resultDiv.style.display = 'block';
        resultDiv.style.color = '#1976d2';
        resultDiv.innerHTML =
            `<b>Đặt lịch thành công!</b><br>
            Ngày khám: <b>${date}</b><br>
            Giờ khám: <b>${time}</b><br>
            Bác sĩ: <b>${doctor}</b><br>
            Lý do: <b>${reason}</b><br>` +
            (anonymous
                ? `<span style="color:#e53935;">Bạn đã đặt lịch ẩn danh.<br>Mã tra cứu của bạn là: <b>${code}</b></span>`
                : `<br>Họ tên: <b>${name}</b><br>Số điện thoại: <b>${phone}</b>`);

        // Reset form after booking
        document.getElementById('bookingForm').reset();
    };

    return (
        <>
             {/* Navbar Section */}
             <nav className="navbar">
               <div className="navbar-left">
                 <span className="nav-brand">HIV - MTSS</span>
               </div>
               <ul className="nav-links">
                  <li><Link to="/homecustomer">Trang chủ</Link></li>
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
                    <h2>ĐẶT LỊCH KHÁM HIV</h2>
                    <div className="form-container">
                        <form id="bookingForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Họ và tên</label>
                                <input type="text" id="name" placeholder="Nguyễn Văn A" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input type="text" id="phone" placeholder="09xxxxxxxx" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor">Chọn bác sĩ điều trị</label>
                                <select id="doctor">
                                    <option>--Chọn Bác Sĩ--</option>
                                    <option>BS.Nguyễn Duy Thế</option>
                                    <option>BS.Phạm Bá Hiền</option>
                                    <option>BS.Bùi Thanh Bình</option>
                                    <option>BS.Nguyễn Văn Kính</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Ngày khám</label>
                                <input type="date" id="date" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Giờ khám</label>
                                <input type="time" id="time" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reason">Lý do khám / Ghi chú</label>
                                <textarea id="reason" rows="3" placeholder="Ví dụ: Tư vấn phác đồ điều trị, theo dõi CD4..." required></textarea>
                            </div>
                            <div className="form-group checkbox-group">
                                <input type="checkbox" id="anonymous" />
                                <label htmlFor="anonymous">Đặt lịch ẩn danh (không lưu thông tin cá nhân)</label>
                            </div>
                            <button type="submit">Xác nhận đặt lịch</button>
                        </form>
                        <div id="bookingResult" style={{ marginTop: '18px', fontSize: '1.1em', textAlign: 'center', color: '#1976d2', display: 'none' }}></div>
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

export default Appointment2;
