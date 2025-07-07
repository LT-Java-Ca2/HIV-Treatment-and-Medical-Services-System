import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import '../../assests/Login.css';

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
        if (storedRememberMe) {
            const storedUsername = localStorage.getItem('usernameOrEmail');
            if (storedUsername) {
                setUsernameOrEmail(storedUsername);
                setRememberMe(true);
            }
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage('');
        setIsSuccess(false);
        setLoading(true);

        try {
            const response = await authService.login(usernameOrEmail, password);

            console.log("Login API Response:", response);

            if (response && response.token) {
                localStorage.setItem('userToken', response.token);

                let displayName = '';
                if (response.lastName && response.firstName) {
                    displayName = `${response.lastName} ${response.firstName}`;
                } else if (response.firstName) {
                    displayName = response.firstName;
                } else if (response.username) {
                    displayName = response.username;
                } else if (response.email) {
                    const emailPrefix = response.email.split('@')[0];
                    displayName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
                } else {
                    displayName = 'Người dùng';
                }

                let userRole = '';
                if (response.role === 'ROLE_DOCTOR') {
                    userRole = 'doctor';
                } else if (response.role === 'ROLE_PATIENT') {
                    userRole = 'patient';
                } else if (response.role === 'ROLE_ADMIN') {
                    userRole = 'admin';
                }
                
                localStorage.setItem('userInfo', JSON.stringify({
                    name: displayName,
                    role: userRole,
                    phone: response.phone || '',
                    email: response.email || '',
                    gender: response.gender || '',
                    profilePicture: response.profilePicture || null
                }));
                
                localStorage.setItem('isLoggedIn', 'true');

                if (rememberMe) {
                    localStorage.setItem('usernameOrEmail', usernameOrEmail);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('usernameOrEmail');
                    localStorage.removeItem('rememberMe');
                }

                if (userRole === 'doctor') {
                    window.alert('ĐĂNG NHẬP THÀNH CÔNG! MỜI BẠN ĐẾN TRANG CHỦ BÁC SĨ.');
                    navigate('/overview');
                } else if (userRole === 'patient') {
                    window.alert('ĐĂNG NHẬP THÀNH CÔNG! MỜI BẠN ĐẾN TRANG CHỦ BỆNH NHÂN.');
                    navigate('/homecustomer');
                } else if (userRole === 'admin') {
                    window.alert('ĐĂNG NHẬP THÀNH CÔNG! MỜI BẠN ĐẾN TRANG QUẢN TRỊ ADMIN.');
                    navigate('/admin');
                } else {
                    window.alert('Đăng nhập tài khoản thành công: bạn có thể truy cập trang chủ ngay bây giờ!');
                    navigate('/homecustomer');
                }

            } else {
                const errorMessage = response.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
                setMessage(errorMessage);
                setIsSuccess(false);
            }
        } catch (error) {
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage || 'Đã xảy ra lỗi trong quá trình đăng nhập.');
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className="rainbow-bg"></div>
            <h2 className="form-title">ĐĂNG NHẬP</h2>

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Tên đăng nhập hoặc Email"
                        required
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Mật khẩu"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="remember-me-forgot-password">
                    <label className="remember-me-label">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        /> Nhớ mật khẩu
                    </label>
                    <a href="/forgot-password" className="forgot-password-link">Quên mật khẩu?</a>
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    )}
                    <span>Đăng nhập</span>
                </button>

                {message && (
                    <div className="form-group">
                        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </form>
            <div className="login-redirect">
                <p>Bạn chưa có tài khoản?</p>
                <button type="button" className="register-link-btn" onClick={handleRegisterRedirect}>Đăng ký ngay</button>
            </div>
        </div>
    );
};

export default Login;