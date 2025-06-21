import React from 'react';
import { Link } from 'react-router-dom'; // Keep Link if you use it elsewhere, otherwise it can be removed
import '../../assests/Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="rainbow-bg"></div>
            <h2 className="form-title">ĐĂNG NHẬP</h2>

            <form>
                <div className="form-group">
                    <input type="email" className="form-input" placeholder="Email" required />
                </div>

                <div className="form-group">
                    <input type="password" className="form-input" placeholder="Mật khẩu" required />
                </div>

                {/* This section is now properly styled with CSS classes */}
                <div className="remember-me-forgot-password">
                    <label className="remember-me-label">
                        <input type="checkbox" /> Nhớ mật khẩu
                    </label>
                    <a href="#" className="forgot-password-link">Quên mật khẩu?</a>
                </div>

                <button type="submit" className="login-btn">Đăng nhập</button>

                <div className="divider">Hoặc</div> {/* Consistent Vietnamese translation */}

                <div className="social-login">
                    <button type="button" className="social-btn email-btn" title="Đăng nhập với Gmail">
                        <i className="fab fa-google"></i>
                    </button>
                    <button type="button" className="social-btn facebook-btn" title="Đăng nhập với Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </button>
                    {/* Assuming you want an Instagram button, as its style is in your CSS */}
                </div>
            </form>
        </div>
    );
};

export default Login;