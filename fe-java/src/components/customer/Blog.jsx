import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../assests/Blog.css';

const Blog = () => {
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
    
        {/* Blog Posts Main Content */}
        <main className="main-content">
          <h2>Blog chia sẻ bệnh nhân</h2>
          <div className="post">
            <div className="post-header">
              <div className="author-date">
                <div className="avatar">H</div>
                <div>
                  <div className="author-name">Hà Thị Mai</div>
                </div>
              </div>
              <div className="date">20/05/2025</div>
            </div>
            <div className="post-title"><a href="#">Hành trình vượt qua mặc cảm và kì thị</a></div>
            <div className="post-content">
              Tôi muốn chia sẻ câu chuyện của mình để mọi người hiểu hơn về những khó khăn, nỗi đau khi sống chung với HIV và làm sao tôi tìm được niềm tin và sự yêu thương từ gia đình cũng như cộng đồng.
              Điều quan trọng là đừng để kỳ thị làm mình gục ngã, hãy tự tin và tin rằng bạn xứng đáng được hạnh phúc và chăm sóc tốt nhất.
            </div>
          </div>
          <div className="post">
            <div className="post-header">
              <div className="author-date">
                <div className="avatar">T</div>
                <div>
                  <div className="author-name">Trần Văn Nam</div>
                </div>
              </div>
              <div className="date">15/05/2025</div>
            </div>
            <div className="post-title"><a href="#">Chia sẻ kinh nghiệm giữ gìn sức khỏe khi điều trị</a></div>
            <div className="post-content">
              Trong quá trình điều trị HIV, tôi đã học cách duy trì chế độ ăn uống lành mạnh, luyện tập thể dục đều đặn và giữ tinh thần lạc quan. Điều này giúp tôi có sức khỏe tốt và ít gặp tác dụng phụ từ thuốc.
            </div>
          </div>
          <div className="post">
            <div className="post-header">
              <div className="author-date">
                <div className="avatar">M</div>
                <div>
                  <div className="author-name">Nguyễn Quốc Minh</div>
                </div>
              </div>
              <div className="date">12/05/2025</div>
            </div>
            <div className="post-title"><a href="#">Vượt qua HIV để sống khỏe mạnh và có ích</a></div>
            <div className="post-content">
              Tôi một người trẻ tuổi đầy nghị lực, phát hiện nhiễm HIV cách đây 5 năm. Thay vì gục ngã, Tôi đã chọn đối mặt và tìm kiếm sự hỗ trợ.
              Qua quá trình điều trị ARV đều đặn và nhận được sự động viên, tư vấn nhiệt tình từ đội ngũ bác sĩ cùng tình yêu thương từ gia đình, Tôi không chỉ vượt qua khó khăn mà còn sống khỏe mạnh, tích cực.
            </div>
          </div>
          <div className="post">
            <div className="post-header">
              <div className="author-date">
                <div className="avatar">N</div>
                <div>
                  <div className="author-name">Lê Thùy Nga</div>
                </div>
              </div>
              <div className="date">07/05/2025</div>
            </div>
            <div className="post-title"><a href="#">Hành trình điều trị ARV</a></div>
            <div className="post-content">
              Tôi đã trải qua nhiều khó khăn khi mới bắt đầu điều trị ARV, từ những tác dụng phụ như mệt mỏi, buồn nôn đến cảm giác lo sợ và mất niềm tin.
              Việc tuân thủ đúng phác đồ điều trị không chỉ giúp tôi giữ vững sức khỏe mà còn mang lại sự bình yên trong tâm hồn.
            </div>
          </div>
        </main>
      </div>

      {/* Footer Section */}
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

export default Blog;