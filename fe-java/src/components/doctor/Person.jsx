import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../assests/Person.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import TheImage from '../../assests/the.png';
import authService from '../../services/auth.service';

const getInitialAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : 'U';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    context.fillStyle = '#ADD8E6';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#FFFFFF';
    context.font = 'bold 48px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(initial, canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL();
};

const Person = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ name: '', role: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const initialDoctorProfile = {
        fullName: 'BS.NGUYỄN DUY THẾ',
        dateOfBirth: '07/04/2005',
        specialization: 'Điều trị ARV, tư vấn bệnh nhân',
        email: 'nt1234@gmail.com',
        gender: 'Nam',
        department: 'Khoa truyền nhiễm',
        experience: 'Điều trị cho bệnh nhân HIV, ARV',
        phoneNumber: '0352493970',
        avatar: null
    };

    const [profileData, setProfileData] = useState(initialDoctorProfile);
    const [originalProfileData, setOriginalProfileData] = useState(initialDoctorProfile);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (loggedStatus && storedUserInfo && storedUserInfo.role === 'doctor') {
            setIsLoggedIn(true);
            setUserInfo(storedUserInfo);

            const doctorName = storedUserInfo.fullName || storedUserInfo.name || initialDoctorProfile.fullName;
            let currentAvatar = storedUserInfo.avatar;

            if (!currentAvatar || currentAvatar === TheImage) {
                currentAvatar = getInitialAvatar(doctorName);
            }

            const currentProfile = {
                fullName: doctorName,
                dateOfBirth: storedUserInfo.dateOfBirth || initialDoctorProfile.dateOfBirth,
                specialization: storedUserInfo.specialization || initialDoctorProfile.specialization,
                email: storedUserInfo.email || initialDoctorProfile.email,
                gender: storedUserInfo.gender || initialDoctorProfile.gender,
                department: storedUserInfo.department || initialDoctorProfile.department,
                experience: storedUserInfo.experience || initialDoctorProfile.experience,
                phoneNumber: storedUserInfo.phoneNumber || initialDoctorProfile.phoneNumber,
                avatar: currentAvatar
            };

            setProfileData(currentProfile);
            setOriginalProfileData(currentProfile);
            localStorage.setItem('userInfo', JSON.stringify({ ...storedUserInfo, ...currentProfile }));
        } else if (loggedStatus && storedUserInfo && storedUserInfo.role === 'patient') {
            alert('Bạn không có quyền truy cập trang này. Đang chuyển hướng về trang bệnh nhân.');
            navigate('/homecustomer');
        } else {
            setIsLoggedIn(false);
            setUserInfo({ name: '', role: '' });
            setProfileData({ ...initialDoctorProfile, avatar: TheImage });
            setOriginalProfileData({ ...initialDoctorProfile, avatar: TheImage });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setOriginalProfileData(profileData);
    };

    const handleSaveClick = () => {
        let finalAvatar = profileData.avatar;
        if (profileData.fullName !== originalProfileData.fullName && !profileData.avatar.startsWith('data:image')) {
            finalAvatar = getInitialAvatar(profileData.fullName);
        } else if (profileData.avatar === TheImage && profileData.fullName) {
            finalAvatar = getInitialAvatar(profileData.fullName);
        }

        const updatedProfileData = {
            ...profileData,
            avatar: finalAvatar,
            role: 'doctor',
            name: profileData.fullName
        };

        localStorage.setItem('userInfo', JSON.stringify(updatedProfileData));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));

        setUserInfo(updatedProfileData);
        setProfileData(updatedProfileData);
        setOriginalProfileData(updatedProfileData);
        alert("Đã lưu hồ sơ cá nhân!");
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setProfileData(originalProfileData);
        setIsEditing(false);
        alert("Đã hủy thay đổi.");
    };

    const handleLogout = () => {
        if (localStorage.getItem('isLoggedIn')) {
            authService.logout();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            alert('Bạn đã đăng xuất thành công!');
            navigate('/login');
        } else {
            alert('Bạn chưa đăng nhập!');
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left"><span className="nav-brand">HIV - MTSS</span></div>
                <ul className="nav-links">
                    <li><Link to="/overview">Trang chủ</Link></li>
                    <li><Link to="/documentdoc">Tài liệu</Link></li>
                    <li><Link to="/blogdoc">Blog</Link></li>
                    <li><Link to="/servicedoc">Dịch vụ</Link></li>
                </ul>
                <div className="navbar-right">
                    {isLoggedIn && userInfo.name && userInfo.role === 'doctor' ? (
                        <>
                            <span className="user-name-display">{userInfo.name}</span>
                            <Link to="/person"><i className="material-icons">account_circle</i></Link>
                        </>
                    ) : (
                        <Link to="/register"><i className="material-icons">person_add</i></Link>
                    )}
                </div>
            </nav>

            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarMenuBox}>
                        <div className={styles.sidebarTitle}>BÁC SĨ</div>
                        <div className={styles.sidebarMenu}>
                            <Link to="/overview" className={styles.sidebarLink}>Tổng quan</Link>
                            <Link to="/list" className={styles.sidebarLink}>Danh sách bệnh nhân</Link>
                            <Link to="/arv" className={styles.sidebarLink}>Phác đồ ARV</Link>
                            <Link to="/work" className={styles.sidebarLink}>Lịch làm việc</Link>
                            <Link to="/mess" className={styles.sidebarLink}>Tin nhắn</Link>
                        </div>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    <div className={styles.profileWrapper}>
                        <h2>Hồ sơ cá nhân</h2>
                        <div className={styles.avatarSection}>
                            <img className={styles.avatar} src={profileData.avatar} alt="Ảnh đại diện" />
                            {isEditing && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const reader = new FileReader();
                                            reader.onload = (upload) => {
                                                setProfileData(prev => ({ ...prev, avatar: upload.target.result }));
                                            };
                                            reader.readAsDataURL(e.target.files[0]);
                                        } else {
                                            setProfileData(prev => ({ ...prev, avatar: originalProfileData.avatar }));
                                        }
                                    }}
                                    className={styles.fileInput}
                                />
                            )}
                        </div>

                        <div className={styles.profileFields}>
                            <div className={styles.profileCol}>
                                <div className={styles.fieldGroup}><div className={styles.fieldLabel}>Họ và tên</div>
                                    <input type="text" name="fullName" value={profileData.fullName} readOnly={!isEditing} onChange={handleChange} className={styles.fieldInput} />
                                </div>
                                <div className={styles.fieldGroup}><div className={styles.fieldLabel}>Ngày sinh</div>
                                    <input type="text" name="dateOfBirth" value={profileData.dateOfBirth} readOnly={!isEditing} onChange={handleChange} className={styles.fieldInput} />
                                </div>
                                <div className={styles.fieldGroup}><div className={styles.fieldLabel}>Chuyên môn</div>
                                    <input type="text" name="specialization" value={profileData.specialization} readOnly={!isEditing} onChange={handleChange} className={styles.fieldInput} />
                                </div>
                                <div className={styles.fieldGroup}><div className={styles.fieldLabel}>Email</div>
                                    <input type="email" name="email" value={profileData.email} readOnly={!isEditing} onChange={handleChange} className={styles.fieldInput} />
                                </div>
                            </div>

                            <div className={styles.profileCol}>
                                <div className={styles.fieldGroup}><div className={styles.fieldLabel}>Giới tính</div>
                                    <input type="text" name="gender" value={profileData.gender} readOnly={!isEditing} onChange={handleChange} className={styles.fieldInput} />
                                </div>
                                <div className={styles.fieldGroup}><div className={styles.fieldLabel}>Khoa</div>
                                    <input type="text" name="department" value={profileData.department} readOnly={!isEditing} onChange={handleChange} className={styles.fieldInput} />
                                </div>
                                <div className={styles.fieldGroup}><div className={styles.fieldLabel}>Kinh nghiệm</div>
                                    <input type="text" name="experience" value={profileData.experience} readOnly={!isEditing} onChange={handleChange} className={styles.fieldInput} />
                                </div>
                                <div className={styles.fieldGroup}><div className={styles.fieldLabel}>Số điện thoại</div>
                                    <input type="text" name="phoneNumber" value={profileData.phoneNumber} readOnly={!isEditing} onChange={handleChange} className={styles.fieldInput} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            {!isEditing ? (
                                <button className={styles.btn} onClick={handleEditClick}>Chỉnh sửa hồ sơ</button>
                            ) : (
                                <>
                                    <button className={styles.bth} onClick={handleSaveClick}>Lưu</button>
                                    <button className={styles.bth} onClick={handleCancelClick}>Hủy</button>
                                </>
                            )}
                            <button className={styles.btn} onClick={handleLogout} style={{ marginTop: '10px' }}>Đăng xuất</button>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-left"><span className="footer-logo">HIV - MTTS</span></div>
                    <div className="footer-right">
                        <div className="footer-links">
                            <a href="https://www.facebook.com/nguyen.trung.736763/" className="footer-icon"><span className="material-icons">facebook</span></a>
                            <a href="tel:0123456789" className="footer-icon"><span className="material-icons">call</span></a>
                            <a href="mailto:hivmtts@gmail.com.vn" className="footer-icon"><span className="material-icons">mail</span></a>
                            <a href="https://github.com/" className="footer-icon"><FontAwesomeIcon icon={faGithub} style={{ fontSize: '1.7em' }} /></a>
                        </div>
                        <div className="footer-support">Hỗ trợ: hivmtts@gmail.com.vn</div>
                        <div className="footer-copyright">© 2025 Trung tâm điều trị HIV. Mọi quyền được bảo lưu.</div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Person;
