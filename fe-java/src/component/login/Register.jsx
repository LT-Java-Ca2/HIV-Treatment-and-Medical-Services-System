import React from 'react';
import { Link } from 'react-router-dom'; // Keep Link if you use it elsewhere, otherwise it can be removed
import '../../assests/Register.css';

const Register = () => {
    return (
        <div className="login-c">
            <div className="rainbow-bg"></div>
            <h2 className="form-title">ĐĂNG KÍ</h2>

            <form>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder="Họ và tên" required />
                </div>
                
                <div class="form-group">
                    <input type="email" class="form-input" placeholder="Email" required />
                </div>
                
                <div class="form-group">
                    <input type="password" class="form-input" placeholder="Mật khẩu" required />
                </div>
                
                <div class="form-group">
                    <input type="password" class="form-input" placeholder="Xác nhận mật khẩu" required />
                </div>
                

                {/* This section is now properly styled with CSS classes */}

                <Link to="/login"><button type="submit" className="login-btn">Đăng kí</button></Link>

                <div className="divider">Hoặc</div> {/* Consistent Vietnamese translation */}

                <div className="social-login">
                    <button type="button" className="social-btn email-btn" title="Đăng nhập với Gmail">
                        <i className="fab fa-google"></i>
                    </button>
                    <button type="button" className="social-btn facebook-btn" title="Đăng nhập với Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;