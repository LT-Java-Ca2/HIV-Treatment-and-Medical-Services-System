import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assests/Homecustomer.css';
import HIVImage from '../../assests/HIV.jpg'
import YteImage from '../../assests/yte.jpg'
import TheImage from '../../assests/the.png'
import HienImage from '../../assests/hien.png'
import BinhImage from '../../assests/binh.png'
import KinhImage from '../../assests/kinh.png'

const Homecustomer = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [submitMessage, setSubmitMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const [userInfo, setUserInfo] = useState({ name: 'Guest' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (loggedStatus) {
            setIsLoggedIn(true);
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo && storedUserInfo.name) {
                setUserInfo(storedUserInfo);
            } else {
                setUserInfo({ name: 'Người dùng' }); 
            }
        } else {
            setIsLoggedIn(false);
            setUserInfo({ name: 'Guest' }); 
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Dữ liệu form được gửi:', formData);

        try {
            setTimeout(() => {
                setSubmitMessage('Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm.');
                setIsSuccess(true);
                setFormData({ name: '', phone: '', email: '', message: '' });
            }, 1000);
        } catch (error) {
            console.error('Lỗi khi gửi form:', error);
            setSubmitMessage('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
            setIsSuccess(false);
        }

        setTimeout(() => {
            setSubmitMessage('');
        }, 5000);
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

                <main className='cc'>
                    <section id="home" className="hero">
                        <div className="hero-c">
                            <h1>HIV-TREATMENT</h1>
                            <p className="subtitle">Dịch vụ y tế chuyên nghiệp và tận tâm</p>
                        </div>
                    </section>

                    <section id="about" className="section about">
                        <div className="container">
                            <div className="section-wrapper">
                                <h2 className="section-title">Giới Thiệu Cơ Sở</h2>
                                <div className="about-content">
                                    <div className="about-text">
                                        Chúng tôi là một cơ sở y tế hàng đầu, chuyên sâu trong việc cung cấp dịch vụ chăm sóc và điều trị toàn diện cho người nhiễm HIV. Với phương châm lấy bệnh nhân làm trung tâm, đội ngũ y bác sĩ của chúng tôi luôn tận tâm, giàu kinh nghiệm và được đào tạo bài bản về các phác đồ điều trị mới nhất. Chúng tôi cam kết tạo ra một môi trường thân thiện, an toàn và đảm bảo bảo mật thông tin tuyệt đối cho mỗi bệnh nhân, giúp họ vượt qua những rào cản tâm lý và sống khỏe mạnh, tích cực.
                                        <br /><br />
                                        Cơ sở vật chất hiện đại cùng trang thiết bị y tế tiên tiến giúp chúng tôi thực hiện các xét nghiệm chính xác và cung cấp dịch vụ y tế chất lượng cao nhất. Chúng tôi không chỉ tập trung vào điều trị y khoa mà còn chú trọng đến hỗ trợ tâm lý và xã hội, đồng hành cùng bệnh nhân trên mọi chặng đường.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="services" className="section services">
                        <div className="container">
                            <div className="section-wrapper">
                                <h2 className="section-title">Dịch Vụ Nổi Bật</h2>
                                <div className="services-grid">
                                    <div className="service-card">
                                        <div className="service-icon"><i className="fas fa-pills"></i></div>
                                        <h3>Khám & Điều trị HIV</h3>
                                    </div>
                                    <div className="service-card">
                                        <div className="service-icon"><i className="fas fa-comments"></i></div>
                                        <h3>Tư vấn tâm lý & Hỗ trợ</h3>
                                    </div>
                                    <div className="service-card">
                                        <div className="service-icon"><i className="fas fa-book-medical"></i></div>
                                        <h3>Giáo dục & Phòng chống kỳ thị</h3>
                                    </div>
                                    <div className="service-card">
                                        <div className="service-icon"><i className="fas fa-apple-alt"></i></div>
                                        <h3>Hỗ trợ sức khỏe và dinh dưỡng</h3>
                                    </div>
                                    <div className="service-card">
                                        <div className="service-icon"><i className="fas fa-file-medical"></i></div>
                                        <h3>Quản lý & Theo dõi điều trị</h3>
                                    </div>
                                    <div className="service-card">
                                        <div className="service-icon"><i className="fas fa-users"></i></div>
                                        <h3>Hỗ trợ cộng đồng & Kết nối</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="blog" className="section blog">
                        <div className="container">
                            <div className="section-wrapper">
                                <h2 className="section-title">Tài liệu & Blog</h2>
                                <div className="blog-grid">
                                    <div className="blog-card">
                                        <div className="blog-image">
                                            <img src={HIVImage} alt="Hiểu đúng về HIV/AIDS" />
                                        </div>
                                        <div className="blog-content">
                                            <h3>Hiểu đúng về HIV/AIDS</h3>
                                            <a href="https://www.vinmec.com/vie/bai-viet/hiv-va-aids-nhung-dieu-ban-can-nho-vi" className="btn-primary">Xem chi tiết</a>
                                        </div>
                                    </div>
                                    <div className="blog-card">
                                        <div className="blog-image">
                                            <img src={YteImage} alt="Chăm sóc sức khỏe cho người nhiễm HIV" />
                                        </div>
                                        <div className="blog-content">
                                            <h3>Chăm sóc sức khỏe cho người nhiễm HIV</h3>
                                            <a href="https://hiv.com.vn/thuoc-dieu-tri-hiv/luu-y-cham-soc-dieu-tri-cho-nguoi-nhiem-hiv-aids-449483" className="btn-primary">Xem chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-blog-post">
                                    <div className="author-info">
                                        <span className="author-initial">M</span>
                                        <div className="author-details">
                                            <span className="name">Nguyễn Quốc Minh</span>
                                            <span className="date">12/05/2025</span>
                                        </div>
                                    </div>
                                    <h3>Vượt qua HIV để sống khỏe mạnh và có ích</h3>
                                    <p>Tôi một người trẻ tuổi đầy nghị lực, phát hiện nhiễm HIV cách đây 5 năm. Thay vì gục ngã, Tôi đã chọn đối mặt và tìm kiếm sự hỗ trợ. Qua quá trình điều trị ARV đều đặn và nhận được sự động viên, tư vấn nhiệt tình từ đội ngũ bác sĩ cùng tình yêu thương từ gia đình, Tôi không chỉ vượt qua khó khăn mà còn sống khỏe mạnh, tích cực.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="team" className="section team">
                        <div className="container">
                            <div className="section-wrapper">
                                <h2 className="section-title">Đội Ngũ Bác Sĩ</h2>
                                <div className="team-grid">
                                    <div className="team-card">
                                        <div className="doctor-image">
                                            <img src={TheImage} alt="BS. Nguyễn Duy Thế" />
                                        </div>
                                        <div className="team-info">
                                            <h3>BS. Nguyễn Duy Thế</h3>
                                            <p>Có nhiều năm kinh nghiệm trong việc điều trị cho bệnh nhân HIV, hướng dẫn bệnh nhân điều trị bằng ARV đúng liệu trình, giúp kéo dài tuổi thọ và nâng cao chất lượng cuộc sống cho người nhiễm HIV.</p>
                                        </div>
                                    </div>
                                    <div className="team-card">
                                        <div className="doctor-image">
                                            <img src={HienImage} alt="BS. Phạm Bá Hiền" />
                                        </div>
                                        <div className="team-info">
                                            <h3>BS. Phạm Bá Hiền</h3>
                                            <p>Có chuyên môn sâu về quản lý chương trình ARV, điều trị HIV ở phụ nữ mang thai, trẻ em và người cao tuổi, hỗ trợ bệnh nhân HIV vượt qua kỳ thị, tái hòa nhập xã hội và duy trì điều trị đều đặn.</p>
                                        </div>
                                    </div>
                                    <div className="team-card">
                                        <div className="doctor-image">
                                            <img src={BinhImage} alt="BS. Bùi Thanh Bình" />
                                        </div>
                                        <div className="team-info">
                                            <h3>BS. Bùi Thành Bình</h3>
                                            <p>Người đi đầu trong việc tư vấn HIV qua kênh online, hỗ trợ nhiều trường hợp, chuyên điều trị dự phòng trước phơi nhiễm (PrEP), điều trị sau phơi nhiễm (PEP), HIV giai đoạn sớm.</p>
                                        </div>
                                    </div>
                                    <div className="team-card">
                                        <div className="doctor-image">
                                            <img src={KinhImage} alt="BS. Nguyễn Văn Kính" />
                                        </div>
                                        <div className="team-info">
                                            <h3>BS. Nguyễn Văn Kính</h3>
                                            <p>Là một trong những chuyên gia cao cấp nhất về HIV/AIDS tại Việt Nam, tập trung vào phát triển phác đồ điều trị ARV tối ưu, chăm sóc toàn diện người nhiễm HIV và hướng dẫn đào tạo đội ngũ bác sĩ trẻ.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="contact" className="section contact">
                        <div className="container">
                            <div className="section-wrapper">
                                <h2 className="section-title">Liên Hệ Chúng Tôi</h2>
                                <div className="contact-content">
                                    <div className="contact-info">
                                        <h3>Thông Tin Liên Hệ</h3>
                                        <div className="contact-item">
                                            <span className="contact-icon material-icons">location_on</span>
                                            <p> Số 75, Tô Ký, Quận 12, Thành phố Hồ Chí Minh, Việt Nam</p>
                                        </div>
                                        <div className="contact-item">
                                            <span className="contact-icon material-icons">phone</span>
                                            <p>0123 456 789</p>
                                        </div>
                                        <div className="contact-item">
                                            <span className="contact-icon material-icons">email</span>
                                            <p>hivmtts@gmail.com.vn</p>
                                        </div>
                                        <div className="contact-item">
                                            <span className="contact-icon material-icons">schedule</span>
                                            <p>Thứ Hai - Thứ Sáu: 8:00 - 17:00</p>
                                        </div>
                                    </div>
                                    <div className="contact-form">
                                        <h3>Gửi Yêu Cầu</h3>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="name">Họ và Tên</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Số Điện Thoại</label>
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="message">Nội Dung</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>
                                            </div>
                                            <button type="submit" className="btn-primary">Gửi Tin Nhắn</button>
                                            {submitMessage && (
                                                <p className={`submit-message ${isSuccess ? 'success' : 'error'}`}>
                                                    {submitMessage}
                                                </p>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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

export default Homecustomer;