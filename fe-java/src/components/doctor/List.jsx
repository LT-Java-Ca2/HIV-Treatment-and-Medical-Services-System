import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../assests/List.module.css';
import { FaGithub } from 'react-icons/fa';

const initialPatients = [
    { id: 'p001', name: 'BẢO PHẠM', code: 'BN001', status: 'Đang điều trị', appointment: '2025-05-25', notes: 'Bệnh nhân mới' },
    { id: 'p002', name: 'QUỐC AN', code: 'BN002', status: 'Ngưng điều trị', appointment: '', notes: 'Đã ngừng điều trị theo yêu cầu' },
    { id: 'p003', name: 'KHANG TRƯƠNG', code: 'BN003', status: 'Đã hoàn thành', appointment: '', notes: 'Đã hoàn thành phác đồ' }
];

const List = () => {
    const navigate = useNavigate();

    const [patients, setPatients] = useState(() => {
        try {
            const storedPatients = localStorage.getItem('patients');
            return storedPatients ? JSON.parse(storedPatients) : initialPatients;
        } catch (error) {
            console.error("Error parsing patients from localStorage:", error);
            return initialPatients;
        }
    });

    const [filteredPatients, setFilteredPatients] = useState(patients);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModal, setIsViewModalOpen] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(null);

    const [patientForm, setPatientForm] = useState({
        id: '',
        name: '',
        code: '',
        status: 'Đang điều trị',
        appointment: '',
        notes: ''
    });

    const [filterName, setFilterName] = useState('');
    const [filterId, setFilterId] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterAppointment, setFilterAppointment] = useState('');

    const [userInfo, setUserInfo] = useState({
        name: '',
        role: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        console.log("Logged Status (List):", loggedStatus);
        console.log("Stored User Info (List):", storedUserInfo);

        if (loggedStatus && storedUserInfo && storedUserInfo.role === 'doctor') {
            setIsLoggedIn(true);
            setUserInfo(storedUserInfo);
        } else {
            setIsLoggedIn(false);
            setUserInfo({ name: '', role: '' });

            if (loggedStatus && storedUserInfo && storedUserInfo.role === 'patient') {
                alert('Bạn không có quyền truy cập trang này. Đang chuyển hướng về trang bệnh nhân.');
                navigate('/homecustomer');
            } else {

            }
        }
    }, [navigate]);

    useEffect(() => {
        localStorage.setItem('patients', JSON.stringify(patients));
        const filtered = patients.filter(patient => {
            const matchesName = patient.name.toLowerCase().includes(filterName.toLowerCase());
            const matchesId = patient.code.toLowerCase().includes(filterId.toLowerCase());
            const matchesStatus = filterStatus === '' || patient.status.toLowerCase() === filterStatus.toLowerCase();
            const matchesAppointment = filterAppointment === '' || patient.appointment === filterAppointment;
            return matchesName && matchesId && matchesStatus && matchesAppointment;
        });
        setFilteredPatients(filtered);
    }, [patients, filterName, filterId, filterStatus, filterAppointment]);


    const openAddModal = () => {
        setPatientForm({ id: '', name: '', code: '', status: 'Đang điều trị', appointment: '', notes: '' });
        setCurrentPatient(null);
        setIsAddEditModalOpen(true);
    };

    const openEditModal = (id) => {
        const patientToEdit = patients.find(p => p.id === id);
        if (patientToEdit) {
            setPatientForm(patientToEdit);
            setCurrentPatient(patientToEdit);
            setIsAddEditModalOpen(true);
        }
    };

    const closeAddEditModal = () => {
        setIsAddEditModalOpen(false);
        setPatientForm({ id: '', name: '', code: '', status: 'Đang điều trị', appointment: '', notes: '' });
    };

    const openViewModal = (id) => {
        const patientToView = patients.find(p => p.id === id);
        if (patientToView) {
            setCurrentPatient(patientToView);
            setIsViewModalOpen(true);
        }
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setCurrentPatient(null);
    };

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setPatientForm(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (patientForm.id) {
            setPatients(patients.map(p => p.id === patientForm.id ? patientForm : p));
        } else {
            const newId = 'p' + (patients.length + 1).toString().padStart(3, '0');
            setPatients([...patients, { ...patientForm, id: newId }]);
        }
        closeAddEditModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bệnh nhân này không?')) {
            setPatients(patients.filter(p => p.id !== id));
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Đang điều trị': return styles.statusActive;
            case 'Ngưng điều trị': return styles.statusInactive;
            case 'Đã hoàn thành': return styles.statusCompleted;
            default: return '';
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

            <div className={styles.mainContainer}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarMenuBox}>
                        <div className={styles.sidebarTitle}>BÁC SĨ</div>
                        <div className={styles.sidebarMenu}>
                            <Link to="/overview" className={styles.sidebarLink}>Tổng quan</Link>
                            <Link to="/list" className={`${styles.sidebarLink} ${styles.active}`}>Danh sách bệnh nhân</Link>
                            <Link to="/arv" className={styles.sidebarLink}>Phác đồ ARV</Link>
                            <Link to="/work" className={styles.sidebarLink}>Lịch làm việc</Link>
                            <Link to="/mess" className={styles.sidebarLink}>Tin nhắn</Link>
                        </div>
                    </div>
                </aside>

                <main className={styles.content}>
                    <div className={styles.contentHeader}>
                        <h2>Danh Sách Bệnh Nhân</h2>

                        <div className={styles.searchFilters}>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel} htmlFor="patientNameSearch">Tìm theo tên:</label>
                                <input
                                    type="text"
                                    id="patientNameSearch"
                                    className={styles.filterInput}
                                    placeholder="Nhập tên bệnh nhân"
                                    value={filterName}
                                    onChange={(e) => setFilterName(e.target.value)}
                                />
                            </div>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel} htmlFor="patientIdSearch">Tìm theo mã:</label>
                                <input
                                    type="text"
                                    id="patientIdSearch"
                                    className={styles.filterInput}
                                    placeholder="Nhập mã bệnh nhân"
                                    value={filterId}
                                    onChange={(e) => setFilterId(e.target.value)}
                                />
                            </div>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel} htmlFor="treatmentStatusSearch">Tình trạng điều trị:</label>
                                <select
                                    id="treatmentStatusSearch"
                                    className={styles.filterSelect}
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="">Tất cả</option>
                                    <option value="Đang điều trị">Đang điều trị</option>
                                    <option value="Ngưng điều trị">Ngưng điều trị</option>
                                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                                </select>
                            </div>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel} htmlFor="nextAppointmentSearch">Ngày hẹn gần nhất:</label>
                                <input
                                    type="date"
                                    id="nextAppointmentSearch"
                                    className={styles.filterInput}
                                    value={filterAppointment}
                                    onChange={(e) => setFilterAppointment(e.target.value)}
                                />
                            </div>
                        </div>

                        <button className={styles.addPatientBtn} onClick={openAddModal}>+ Thêm bệnh nhân</button>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.patientTable}>
                            <thead className={styles.tableHeader}>
                                <tr>
                                    <th>Tên bệnh nhân</th>
                                    <th>Mã bệnh nhân</th>
                                    <th>Tình trạng điều trị</th>
                                    <th>Ngày hẹn gần nhất</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map(patient => (
                                        <tr key={patient.id} className={styles.tableRow}>
                                            <td className={styles.tableCell}>{patient.name}</td>
                                            <td className={styles.tableCell}>{patient.code}</td>
                                            <td className={`${styles.tableCell} ${getStatusClass(patient.status)}`}>
                                                {patient.status}
                                            </td>
                                            <td className={styles.tableCell}>{patient.appointment || 'Không có'}</td>
                                            <td className={styles.tableCell}>
                                                <div className={styles.actionButtons}>
                                                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEditModal(patient.id)}>
                                                        ✏
                                                    </button>
                                                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(patient.id)}>
                                                        🗑
                                                    </button>
                                                    <button className={`${styles.actionBtn} ${styles.viewBtn}`} onClick={() => openViewModal(patient.id)}>
                                                        👁
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell} colSpan="5" style={{ textAlign: 'center' }}>
                                            Không có bệnh nhân nào phù hợp.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-left">
                        <span className="footer-logo">HIV - MTSS</span>
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

            {isAddEditModalOpen && (
                <div className={styles.modal} style={{ display: 'flex' }}>
                    <div className={styles.modalContent}>
                        <span className={styles.closeButton} onClick={closeAddEditModal}>&times;</span>
                        <h3 id="modalTitle">{currentPatient ? 'Chỉnh Sửa Thông Tin Bệnh Nhân' : 'Thêm Bệnh Nhân Mới'}</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" id="patientId" value={patientForm.id} />
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Tên bệnh nhân:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={patientForm.name}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="code">Mã bệnh nhân:</label>
                                <input
                                    type="text"
                                    id="code"
                                    value={patientForm.code}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="status">Tình trạng điều trị:</label>
                                <select
                                    id="status"
                                    value={patientForm.status}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="Đang điều trị">Đang điều trị</option>
                                    <option value="Ngưng điều trị">Ngưng điều trị</option>
                                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="appointment">Ngày hẹn gần nhất:</label>
                                <input
                                    type="date"
                                    id="appointment"
                                    value={patientForm.appointment}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="notes">Ghi chú:</label>
                                <textarea
                                    id="notes"
                                    value={patientForm.notes}
                                    onChange={handleFormChange}
                                ></textarea>
                            </div>
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.saveBtn}>Lưu</button>
                                <button type="button" className={styles.cancelBtn} onClick={closeAddEditModal}>Hủy</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isViewModalOpen && currentPatient && (
                <div className={styles.modal} style={{ display: 'flex' }}>
                    <div className={styles.viewModalContent}>
                        <span className={styles.closeButton} onClick={closeViewModal}>&times;</span>
                        <h3>Thông Tin Bệnh Nhân</h3>
                        <div className={styles.viewDetailGroup}>
                            <strong>Tên bệnh nhân:</strong> <span id="viewPatientName">{currentPatient.name}</span>
                        </div>
                        <div className={styles.viewDetailGroup}>
                            <strong>Mã bệnh nhân:</strong> <span id="viewPatientCode">{currentPatient.code}</span>
                        </div>
                        <div className={styles.viewDetailGroup}>
                            <strong>Tình trạng:</strong> <span id="viewTreatmentStatus">{currentPatient.status}</span>
                        </div>
                        <div className={styles.viewDetailGroup}>
                            <strong>Ngày hẹn:</strong> <span id="viewNextAppointment">{currentPatient.appointment || 'Không có'}</span>
                        </div>
                        <div className={styles.viewDetailGroup}>
                            <strong>Ghi chú:</strong> <span id="viewPatientNotes">{currentPatient.notes || 'Không có ghi chú'}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default List;