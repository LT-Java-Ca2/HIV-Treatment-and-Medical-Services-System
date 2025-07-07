import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assests/Patient.css';

const getInitialAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : '';
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

const Patient = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [patientData, setPatientData] = useState({
        name: '',
        code: 'BN001',
        dob: '07/04/2005',
        gender: '',
        phone: '',
        doctor: 'BS. Nguyễn Duy Thế',
        arvRegimen: '',
        registrationDate: '',
        revisitDate: '',
        cd4: '',
        viralLoad: '',
        medicationReminder: '',
        avatarUrl: null,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [tempPatientData, setTempPatientData] = useState({});

    const [userInfo, setUserInfo] = useState({ name: 'Guest' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const mockPatientApi = {
        fetchPatientProfile: async (userId) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
                    const fetchedData = {
                        name: storedUserInfo.name ||
                            (storedUserInfo.firstName && storedUserInfo.lastName ? `${storedUserInfo.lastName} ${storedUserInfo.firstName}` : storedUserInfo.firstName) ||
                            storedUserInfo.username ||
                            (storedUserInfo.email ? storedUserInfo.email.split('@')[0] : ''),
                        phone: storedUserInfo.phone || null,
                        gender: storedUserInfo.gender || null,
                        code: storedUserInfo.code || 'BN001',
                        dob: storedUserInfo.dob || '07/04/2005',
                        doctor: storedUserInfo.doctor || 'BS. Nguyễn Duy Thế',
                        arvRegimen: 'TDF + 3TC + DTG',
                        registrationDate: '01/01/2024',
                        revisitDate: '01/08/2025',
                        cd4: '550 cells/mm³ (20/06/2025)',
                        viralLoad: 'Dưới ngưỡng phát hiện',
                        medicationReminder: '19:00 hàng ngày',
                        avatarUrl: storedUserInfo.avatarUrl || null,
                    };

                    for (const key in fetchedData) {
                        if (fetchedData[key] === null || fetchedData[key] === '') {
                            fetchedData[key] = '';
                        }
                    }
                    resolve(fetchedData);
                }, 0);
            });
        },
        updatePatientProfile: async (data) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("Mô phỏng cập nhật dữ liệu bệnh nhân vào SQL Server:", data);
                    const currentUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
                    localStorage.setItem('userInfo', JSON.stringify({
                        ...currentUserInfo,
                        name: data.name,
                        phone: data.phone,
                        gender: data.gender,
                        code: data.code,
                        dob: data.dob,
                        doctor: data.doctor,
                        avatarUrl: data.avatarUrl,
                    }));
                    resolve(data);
                }, 0);
            });
        }
    };

    useEffect(() => {
        const checkLoginAndLoadData = async () => {
            const loggedStatus = localStorage.getItem('isLoggedIn') === 'true';
            if (loggedStatus) {
                setIsLoggedIn(true);
                const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

                if (storedUserInfo) {
                    const userName = storedUserInfo.name ||
                        (storedUserInfo.firstName && storedUserInfo.lastName ? `${storedUserInfo.lastName} ${storedUserInfo.firstName}` : storedUserInfo.firstName) ||
                        storedUserInfo.username ||
                        (storedUserInfo.email ? storedUserInfo.email.split('@')[0] : '');
                    setUserInfo({ name: userName });

                    try {
                        const fetchedProfileData = await mockPatientApi.fetchPatientProfile(storedUserInfo.userId || 'default_user_id');

                        setPatientData(prevData => ({
                            ...prevData,
                            ...fetchedProfileData,
                            name: userName,
                        }));

                    } catch (error) {
                        console.error("Lỗi khi tải hồ sơ bệnh nhân:", error);
                        alert('Có lỗi xảy ra khi tải hồ sơ bệnh nhân. Vui lòng thử lại.');
                        setPatientData(prevData => ({
                            ...prevData,
                            name: userName,
                        }));
                    }
                } else {
                    setIsLoggedIn(false);
                    setUserInfo({ name: 'Guest' });
                    navigate('/register');
                }

            } else {
                setIsLoggedIn(false);
                setUserInfo({ name: 'Guest' });
                alert('Bạn cần đăng nhập để truy cập trang này.');
                navigate('/register');
            }
        };

        checkLoginAndLoadData();
    }, [navigate]);

    const handleEditClick = () => {
        setTempPatientData({ ...patientData });
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempPatientData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempPatientData(prevData => ({
                    ...prevData,
                    avatarUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveClick = async () => {
        const updatedData = { ...tempPatientData };

        try {
            const savedData = await mockPatientApi.updatePatientProfile(updatedData);
            console.log("Hồ sơ bệnh nhân đã được lưu:", savedData);
            setPatientData(prevData => ({
                ...prevData,
                ...savedData,
                name: (JSON.parse(localStorage.getItem('userInfo')) || {}).name || prevData.name
            }));
            setIsEditing(false);
            alert('Hồ sơ bệnh nhân đã được lưu thành công!');
        } catch (error) {
            console.error("Lỗi khi lưu hồ sơ bệnh nhân:", error);
            alert('Có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại.');
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleAvatarClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
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
                    <div className="profile-wrapper">
                        <div className="profile-container">
                            <h2>HỒ SƠ BỆNH NHÂN</h2>
                            <div className="patient-profile-card">
                                <div className="profile-header">
                                    <img
                                        src={tempPatientData.avatarUrl || patientData.avatarUrl || getInitialAvatar(patientData.name)}
                                        alt="Profile Picture"
                                        className="profile-pic"
                                        onClick={handleAvatarClick}
                                        style={{ cursor: isEditing ? 'pointer' : 'default' }}
                                    />
                                    {isEditing && (
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleAvatarChange}
                                            accept="image/*"
                                        />
                                    )}
                                    <h3>{patientData.name || ''}</h3>
                                </div>
                                <div className="profile-section">
                                    <h3>Thông tin cá nhân</h3>
                                    <div className="section-content">
                                        <div>
                                            <b>Mã bệnh nhân:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={tempPatientData.code}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.code}</span>
                                            )}
                                        </div>
                                        <div>
                                            <b>Ngày sinh:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="dob"
                                                    value={tempPatientData.dob}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.dob}</span>
                                            )}
                                        </div>
                                        <div><b>Giới tính:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="gender"
                                                    value={tempPatientData.gender}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.gender || ''}</span>
                                            )}
                                        </div>
                                        <div><b>SĐT:</b>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={tempPatientData.phone}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.phone || ''}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-section">
                                    <h3>Thông tin điều trị</h3>
                                    <div className="section-content">
                                        <div>
                                            <b>Bác sĩ điều trị:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="doctor"
                                                    value={tempPatientData.doctor}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.doctor}</span>
                                            )}
                                        </div>
                                        <div><b>Phác đồ ARV:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="arvRegimen"
                                                    value={tempPatientData.arvRegimen}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.arvRegimen || ''}</span>
                                            )}
                                        </div>
                                        <div><b>Ngày đăng ký khám:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="registrationDate"
                                                    value={tempPatientData.registrationDate}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.registrationDate || ''}</span>
                                            )}
                                        </div>
                                        <div><b>Lịch tái khám:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="revisitDate"
                                                    value={tempPatientData.revisitDate}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.revisitDate || ''}</span>
                                            )}
                                        </div>
                                        <div><b>CD4:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="cd4"
                                                    value={tempPatientData.cd4}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.cd4 || 'Chưa cập nhật'}</span>
                                            )}
                                        </div>
                                        <div><b>Tải lượng HIV:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="viralLoad"
                                                    value={tempPatientData.viralLoad}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.viralLoad || ''}</span>
                                            )}
                                        </div>
                                        <div><b>Nhắc uống thuốc:</b>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="medicationReminder"
                                                    value={tempPatientData.medicationReminder}
                                                    onChange={handleInputChange}
                                                    style={{ marginLeft: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbb', width: '220px' }}
                                                />
                                            ) : (
                                                <span>{patientData.medicationReminder || ''}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="actions">
                                    {isEditing ? (
                                        <>
                                            <button className="btn primary" onClick={handleSaveClick}>Lưu</button>
                                            <button className="btn secondary" onClick={handleCancelClick}>Hủy</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn primary" onClick={handleEditClick}>Chỉnh sửa hồ sơ</button>
                                        </>
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

export default Patient;