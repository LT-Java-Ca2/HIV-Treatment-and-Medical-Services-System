import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../assests/Mess.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Mess = () => {
    const navigate = useNavigate();

    const [activeSidebarLink, setActiveSidebarLink] = useState('Tin nhắn');

    const [chatData, setChatData] = useState({
        'BN001': [
            { sender: 'patient', text: 'Chào bác sĩ, tôi có một số triệu chứng cần tư vấn.' },
            { sender: 'doctor', text: 'Chào bạn, bạn vui lòng mô tả rõ hơn các triệu chứng mà bạn đang gặp phải để tôi hỗ trợ.' },
            { sender: 'patient', text: 'Tôi bị sốt và mệt mỏi kéo dài 4 ngày nay rồi ạ.' }
        ],
        'BN002': [
            { sender: 'doctor', text: 'Chào Quốc An, bạn có khỏe không?' },
            { sender: 'patient', text: 'Chào bác sĩ, tôi thấy khá hơn rồi ạ. Cảm ơn bác sĩ đã hỏi thăm.' }
        ],
        'BN003': [
            { sender: 'patient', text: 'Chào bác sĩ, tôi muốn hỏi về lịch tái khám.' },
            { sender: 'doctor', text: 'Chào Khang Trương, lịch tái khám của bạn là vào thứ 5 tuần sau lúc 10 giờ sáng nhé.' }
        ]
    });
    const [currentPatient, setCurrentPatient] = useState({
        id: 'BN001',
        name: 'BẢO PHẠM'
    });
    const [chatInput, setChatInput] = useState('');

    const messagesEndRef = useRef(null);

    const [userInfo, setUserInfo] = useState({
        name: '',
        role: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (loggedStatus && storedUserInfo && storedUserInfo.role === 'doctor') {
            setIsLoggedIn(true);
            setUserInfo(storedUserInfo);
        } else {
            setIsLoggedIn(false);
            setUserInfo({ name: '', role: '' });

            if (loggedStatus && storedUserInfo && storedUserInfo.role === 'patient') {
                alert('Bạn không có quyền truy cập trang này. Đang chuyển hướng về trang bệnh nhân.');
                navigate('/homecustomer');
            }
        }
    }, [navigate]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [chatData, currentPatient.id]);

    const handleSidebarClick = (linkName) => {
        setActiveSidebarLink(linkName);
    };

    const handlePatientClick = (patientId, patientDisplayName) => {
        setCurrentPatient({ id: patientId, name: patientDisplayName });
    };

    const handleChatInputChange = (e) => {
        setChatInput(e.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (chatInput.trim()) {
            const newMessage = { sender: 'doctor', text: chatInput.trim() };
            setChatData(prevChatData => ({
                ...prevChatData,
                [currentPatient.id]: [...prevChatData[currentPatient.id], newMessage]
            }));
            setChatInput('');
        }
    };

    const getPatientDisplayName = (fullNameWithCode) => {
        return fullNameWithCode.split('(')[0].trim();
    };

    const renderContent = () => {
        switch (activeSidebarLink) {
            case 'Tổng quan':
                return (
                    <div className={styles.contentSection}>
                        <h2>Tổng quan Bác sĩ</h2>
                        <p>Thông tin tổng quan về các hoạt động và số liệu thống kê.</p>
                    </div>
                );
            case 'Danh sách bệnh nhân':
                return (
                    <div className={styles.contentSection}>
                        <h2>Danh sách bệnh nhân của bạn</h2>
                        <p>Quản lý danh sách bệnh nhân và hồ sơ của họ.</p>
                    </div>
                );
            case 'Phác đồ ARV':
                return (
                    <div className={styles.contentSection}>
                        <h2>Phác đồ điều trị ARV</h2>
                        <p>Thông tin và công cụ về phác đồ điều trị ARV.</p>
                    </div>
                );
            case 'Lịch làm việc':
                return (
                    <div className={styles.contentSection}>
                        <h2>Lịch làm việc của Bác sĩ</h2>
                        <p>Quản lý lịch hẹn và ca làm việc của bạn.</p>
                    </div>
                );
            case 'Tin nhắn':
                return (
                    <div className={`${styles.contentSection} ${styles.chatContainer}`}>
                        <h2>Tin nhắn & Hỗ trợ</h2>
                        <div className={styles.chatContent}>
                            <ul className={styles.patientList}>
                                <div className={styles.patientListHeader}>Bệnh nhân</div>
                                {[
                                    { id: 'BN001', display: 'BẢO PHẠM (Mã: BN001)' },
                                    { id: 'BN002', display: 'QUỐC AN (Mã: BN002)' },
                                    { id: 'BN003', display: 'KHANG TRƯƠNG(Mã: BN003)' }
                                ].map((patient) => (
                                    <li
                                        key={patient.id}
                                        className={`${styles.patientListItem} ${currentPatient.id === patient.id ? styles.active : ''}`}
                                        onClick={() => handlePatientClick(patient.id, getPatientDisplayName(patient.display))}
                                        data-patient-id={patient.id}
                                    >
                                        {patient.display}
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.chatArea}>
                                <div className={styles.chatHeader}>Chat với {currentPatient.name}</div>
                                <div className={styles.messages} ref={messagesEndRef}>
                                    {chatData[currentPatient.id]?.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.message} ${msg.sender === 'doctor' ? styles.doctorMessage : ''}`}
                                        >
                                            {msg.text}
                                        </div>
                                    ))}
                                </div>
                                <form className={styles.chatInputArea} onSubmit={handleSendMessage} autoComplete="off">
                                    <input
                                        className={styles.chatInput}
                                        type="text"
                                        placeholder="Nhập tin nhắn.........."
                                        value={chatInput}
                                        onChange={handleChatInputChange}
                                    />
                                    <button className={styles.sendBtn} type="submit">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            case 'Hồ sơ cá nhân':
                return (
                    <div className={styles.contentSection}>
                        <h2>Hồ sơ cá nhân của Bác sĩ</h2>
                        <p>Xem và chỉnh sửa thông tin cá nhân của bạn.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <span className="nav-brand">HIV - MTSS</span>
                </div>
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
                            <Link to="/person" title="Thông tin cá nhân"><i className="material-icons">account_circle</i></Link>
                        </>
                    ) : (
                        <Link to="/register" title="Đăng nhập Bác sĩ"><i className="material-icons">person_add</i></Link>
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
                            <Link to="/mess" className={`${styles.sidebarLink} ${styles.active}`}>Tin nhắn</Link>
                        </div>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    {renderContent()}
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

export default Mess;