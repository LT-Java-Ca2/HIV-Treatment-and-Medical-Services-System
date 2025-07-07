import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assests/Register.css';

const BACKEND_BASE_URL = 'http://localhost:8081/hospital';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        country: '',
        userType: 'PATIENT',
        specialization: '',
        bloodGroup: '',
        joiningDate: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName || formData.firstName.length < 2 || formData.firstName.length > 50) {
            newErrors.firstName = 'Họ phải từ 2 đến 50 ký tự';
        }

        if (!formData.lastName || formData.lastName.length < 2 || formData.lastName.length > 50) {
            newErrors.lastName = 'Tên phải từ 2 đến 50 ký tự';
        }

        if (!formData.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Số điện thoại phải có 10 chữ số';
        }

        if (formData.userType === 'PATIENT' || formData.userType === 'DOCTOR') {
            if (!formData.gender) {
                newErrors.gender = 'Vui lòng chọn giới tính';
            }

            if (!formData.dateOfBirth) {
                newErrors.dateOfBirth = 'Vui lòng chọn ngày sinh';
            } else {
                const birthDate = new Date(formData.dateOfBirth);
                const today = new Date();
                if (birthDate > today) {
                    newErrors.dateOfBirth = 'Ngày sinh không thể là ngày trong tương lai';
                }
            }
        }

        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        if (formData.userType === 'DOCTOR') {
            if (!formData.specialization || formData.specialization.trim() === '') {
                newErrors.specialization = 'Chuyên môn là bắt buộc';
            }
            if (!formData.bloodGroup || formData.bloodGroup.trim() === '') {
                newErrors.bloodGroup = 'Nhóm máu là bắt buộc';
            }
            if (!formData.joiningDate || formData.joiningDate.trim() === '') {
                newErrors.joiningDate = 'Ngày tham gia là bắt buộc';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        if (name === 'userType') {
            setFormData(prevState => ({
                ...prevState,
                userType: value,
                specialization: value !== 'DOCTOR' ? '' : prevState.specialization,
                bloodGroup: value !== 'DOCTOR' ? '' : prevState.bloodGroup,
                joiningDate: value !== 'DOCTOR' ? '' : prevState.joiningDate,
                dateOfBirth: value === 'ADMIN' ? '' : prevState.dateOfBirth,
                gender: value === 'ADMIN' ? '' : prevState.gender,
                address: value === 'ADMIN' ? '' : prevState.address,
                city: value === 'ADMIN' ? '' : prevState.city,
                state: value === 'ADMIN' ? '' : prevState.state,
                country: value === 'ADMIN' ? '' : prevState.country,
            }));
            setErrors({});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Vui lòng kiểm tra lại thông tin bạn đã nhập.');
            return;
        }

        let finalRegistrationDetails = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
        };

        let endpoint = '';

        if (formData.userType === 'PATIENT') {
            endpoint = `${BACKEND_BASE_URL}/api/patients/register`;
            finalRegistrationDetails = {
                ...finalRegistrationDetails,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                address: formData.address || null,
                city: formData.city || null,
                state: formData.state || null,
                country: formData.country || null,
            };
        } else if (formData.userType === 'DOCTOR') {
            endpoint = `${BACKEND_BASE_URL}/api/doctors/register`;
            finalRegistrationDetails = {
                ...finalRegistrationDetails,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                address: formData.address || null,
                city: formData.city || null,
                state: formData.state || null,
                country: formData.country || null,
                specialization: formData.specialization,
                bloodGroup: formData.bloodGroup,
                joiningDate: formData.joiningDate,
            };
        } else if (formData.userType === 'ADMIN') {
            endpoint = `${BACKEND_BASE_URL}/api/admin/register`;
        } else {
            alert('Vui lòng chọn loại người dùng.');
            return;
        }

        try {
            console.log('Đang gửi yêu cầu đăng ký với dữ liệu:', finalRegistrationDetails);
            console.log('Đến endpoint:', endpoint);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(finalRegistrationDetails),
            }).catch(error => {
                console.error('Lỗi mạng:', error);
                throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại sau.');
            });

            if (!response) {
                throw new Error('Không nhận được phản hồi từ máy chủ.');
            }

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                data = await response.text();
            }
            console.log('Phản hồi từ máy chủ:', data);

            if (!response.ok) {
                console.log('Phản hồi không OK. Trạng thái:', response.status);
                if (response.status === 400) {
                    if (data && data.errors) {
                        console.log('Lỗi xác thực:', data.errors);
                        const newErrors = {};
                        data.errors.forEach(error => {
                            newErrors[error.field] = error.message;
                        });
                        setErrors(newErrors);
                        throw new Error('Vui lòng kiểm tra lại thông tin đăng ký');
                    } else if (data && typeof data === 'object' && data.message) {
                        throw new Error(data.message);
                    } else {
                        throw new Error(data || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
                    }
                }
                if (response.status === 409) {
                    console.log('Lỗi trùng lặp email');
                    setErrors(prev => ({
                        ...prev,
                        email: 'Email đã được đăng ký'
                    }));
                    if (data && typeof data === 'object' && data.message) {
                        throw new Error(data.message);
                    } else {
                        throw new Error(data || 'Email đã được đăng ký.');
                    }
                }
                if (data && typeof data === 'object' && data.message) {
                    throw new Error(data.message);
                }
                throw new Error('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
            }

            alert('Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.');
            navigate('/login');
            console.log('Đăng ký thành công:', data);
        } catch (error) {
            console.error('Chi tiết lỗi đăng ký:', error);
            alert(error.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="login-c">
            <div className="rainbow-bg"></div>
            <h2 className="form-title">ĐĂNG KÝ</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userType" className="form-label">Đăng ký với tư cách:</label>
                    <select
                        id="userType"
                        className="form-input"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                    >
                        <option value="PATIENT">Bệnh nhân</option>
                        <option value="DOCTOR">Bác sĩ</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={`form-input ${errors.firstName ? 'error' : ''}`}
                        placeholder="Họ"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-input ${errors.lastName ? 'error' : ''}`}
                        placeholder="Tên"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className={`form-input ${errors.password ? 'error' : ''}`}
                        placeholder="Mật khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                        placeholder="Xác nhận mật khẩu"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                        placeholder="Số điện thoại (10 chữ số)"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                </div>

                {(formData.userType === 'PATIENT' || formData.userType === 'DOCTOR') && (
                    <>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth" className="form-label"></label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                max={new Date().toISOString().split('T')[0]}
                                required={formData.userType !== 'ADMIN'}
                            />
                            {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender" className="form-label"></label>
                            <select
                                id="gender"
                                className={`form-input ${errors.gender ? 'error' : ''}`}
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required={formData.userType !== 'ADMIN'}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                                <option value="OTHER">Khác</option>
                            </select>
                            {errors.gender && <span className="error-message">{errors.gender}</span>}
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Địa chỉ (Address)"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Thành phố (City)"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Tỉnh/Bang (State)"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Quốc gia (Country)"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}

                {formData.userType === 'DOCTOR' && (
                    <>
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-input ${errors.specialization ? 'error' : ''}`}
                                placeholder="Chuyên môn (Specialization)"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                required
                            />
                            {errors.specialization && <span className="error-message">{errors.specialization}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-input ${errors.bloodGroup ? 'error' : ''}`}
                                placeholder="Nhóm máu (Blood Group)"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                required
                            />
                            {errors.bloodGroup && <span className="error-message">{errors.bloodGroup}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="joiningDate" className="form-label"></label>
                            <input
                                type="date"
                                id="joiningDate"
                                className={`form-input ${errors.joiningDate ? 'error' : ''}`}
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                                max={new Date().toISOString().split('T')[0]}
                                required
                            />
                            {errors.joiningDate && <span className="error-message">{errors.joiningDate}</span>}
                        </div>
                    </>
                )}

                <button type="submit" className="login-btn">Đăng ký</button>
            </form>
            <div className="login-redirect">
                <p>Bạn đã có tài khoản?</p>
                <button type="button" className="register-link-btn" onClick={handleLoginRedirect}>Đăng nhập</button>
            </div>
        </div>
    );
};

export default Register;