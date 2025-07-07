import React, { useState, useRef, useEffect } from 'react';
import '../../assests/Admin.css'; // Giữ nguyên đường dẫn và tên file Admin.css
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate để chuyển hướng

function Admin() {
    const [patients, setPatients] = useState([
        { id: 'BN001', hoTen: 'Phạm Huỳnh Gia Bảo', sdt: '012398745', gioiTinh: 'Nam', ngayDangKy: '2025-05-27', email:'gb@gmail.com' },
        { id: 'BN002', hoTen: 'Lương Quốc An', sdt: '0984579543', gioiTinh: 'Nam', ngayDangKy: '2025-05-20', email:'qa@gmail.com' },
        { id: 'BN003', hoTen: 'Khang Trương', sdt: '0776543210', gioiTinh: 'Nam', ngayDangKy: '2025-05-15', email:'kt@gmail.com' },
    ]);
    const patientFormRef = useRef(null);
    const [patientModalOpen, setPatientModalOpen] = useState(false);
    const [patientFormMode, setPatientFormMode] = useState('add');
    const [currentPatientId, setCurrentPatientId] = useState('');

    const [doctors, setDoctors] = useState([
        { id: 'BS001', hoTen: 'Bùi Thành Bình', sdt: '0900111222', gioiTinh: 'Nam', khoa: 'Truyền nhiễm', ngayThamGia: '2020-05-10', email: 'tb@gmail.com' },
        { id: 'BS002', hoTen: 'Phạm Bá Hiền', sdt: '0911222333', gioiTinh: 'Nam', khoa: 'Truyền nhiễm', ngayThamGia: '2018-11-20', email: 'bh@gmail.com' },
        { id: 'BS003', hoTen: 'Nguyễn Văn Kính', sdt: '0977888999', gioiTinh: 'Nam', khoa: 'Truyền nhiễm', ngayThamGia: '2022-01-05', email: 'vk@gmail.com' },
    ]);
    const doctorFormRef = useRef(null);
    const [doctorModalOpen, setDoctorModalOpen] = useState(false);
    const [doctorFormMode, setDoctorFormMode] = useState('add');
    const [currentDoctorId, setCurrentDoctorId] = useState('');

    const totalAppointments = 1500;
    const successfulTreatments = 850;
    const totalTreatments = 1000;
    const treatmentEfficiency = totalTreatments > 0 ? ((successfulTreatments / totalTreatments) * 100).toFixed(2) : 0;

    // Đọc trạng thái đăng nhập từ localStorage khi component khởi tạo
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn')); // '!!' để chuyển đổi sang boolean
    const navigate = useNavigate(); 

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error("Invalid date string for formatDateForInput:", dateString);
            return '';
        }
        return date.toISOString().split('T')[0];
    };

    const formatDateFromInput = (dateInput) => {
        return dateInput;
    };

    const formatDateToDisplay = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${parseInt(day)}/${parseInt(month)}/${year}`;
        }
        return dateString;
    };

    const openModal = (setModalOpenState) => {
        setModalOpenState(true);
    };

    const closeModal = (setModalOpenState, formRef) => {
        setModalOpenState(false);
        if (formRef && formRef.current) {
            formRef.current.reset();
        }
    };

    const openPatientModal = (mode, id = '') => {
        setPatientFormMode(mode);
        setCurrentPatientId(id);
        openModal(setPatientModalOpen);
    };

    useEffect(() => {
        if (patientModalOpen && patientFormRef.current) {
            if (patientFormMode === 'edit') {
                const patient = patients.find(p => p.id === currentPatientId);
                if (patient) {
                    patientFormRef.current.elements.patientMa.value = patient.id;
                    patientFormRef.current.elements.patientMa.readOnly = true;
                    patientFormRef.current.elements.patientHoTen.value = patient.hoTen;
                    patientFormRef.current.elements.patientSDT.value = patient.sdt;
                    patientFormRef.current.elements.patientGioiTinh.value = patient.gioiTinh;
                    patientFormRef.current.elements.patientNgayDangKy.value = formatDateForInput(patient.ngayDangKy);
                    patientFormRef.current.elements.patientEmail.value = patient.email;
                }
            } else {
                patientFormRef.current.reset();
                const newIdNum = patients.length + 1;
                patientFormRef.current.elements.patientMa.value = `BN${String(newIdNum).padStart(3, '0')}`;
                patientFormRef.current.elements.patientMa.readOnly = false;
            }
        }
    }, [patientModalOpen, patientFormMode, currentPatientId, patients]);

    const handlePatientSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const newPatientData = {
            id: form.elements.patientMa.value,
            hoTen: form.elements.patientHoTen.value,
            sdt: form.elements.patientSDT.value,
            gioiTinh: form.elements.patientGioiTinh.value,
            ngayDangKy: formatDateFromInput(form.elements.patientNgayDangKy.value),
            email: form.elements.patientEmail.value,
        };

        if (patientFormMode === 'edit') {
            setPatients(patients.map(p => p.id === currentPatientId ? newPatientData : p));
            alert('Đã cập nhật tài khoản bệnh nhân!');
        } else {
            setPatients([...patients, newPatientData]);
            alert('Đã thêm tài khoản bệnh nhân mới!');
        }
        closeModal(setPatientModalOpen, patientFormRef);
    };

    const deletePatient = (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản bệnh nhân có mã ${id} không?`)) {
            setPatients(patients.filter(p => p.id !== id));
            alert(`Đã xóa tài khoản bệnh nhân ${id}!`);
        }
    };

    const openDoctorModal = (mode, id = '') => {
        setDoctorFormMode(mode);
        setCurrentDoctorId(id);
        openModal(setDoctorModalOpen);
    };

    useEffect(() => {
        if (doctorModalOpen && doctorFormRef.current) {
            if (doctorFormMode === 'edit') {
                const doctor = doctors.find(d => d.id === currentDoctorId);
                if (doctor) {
                    doctorFormRef.current.elements.doctorMa.value = doctor.id;
                    doctorFormRef.current.elements.doctorMa.readOnly = true;
                    doctorFormRef.current.elements.doctorHoTen.value = doctor.hoTen;
                    doctorFormRef.current.elements.doctorSDT.value = doctor.sdt;
                    doctorFormRef.current.elements.doctorGioiTinh.value = doctor.gioiTinh;
                    doctorFormRef.current.elements.doctorKhoa.value = doctor.khoa;
                    doctorFormRef.current.elements.doctorNgayThamGia.value = formatDateForInput(doctor.ngayThamGia);
                    doctorFormRef.current.elements.doctorEmail.value = doctor.email;
                }
            } else {
                doctorFormRef.current.reset();
                const newIdNum = doctors.length + 1;
                doctorFormRef.current.elements.doctorMa.value = `BS${String(newIdNum).padStart(3, '0')}`;
                doctorFormRef.current.elements.doctorMa.readOnly = false;
            }
        }
    }, [doctorModalOpen, doctorFormMode, currentDoctorId, doctors]);

    const handleDoctorSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const newDoctorData = {
            id: form.elements.doctorMa.value,
            hoTen: form.elements.doctorHoTen.value,
            sdt: form.elements.doctorSDT.value,
            gioiTinh: form.elements.doctorGioiTinh.value,
            khoa: form.elements.doctorKhoa.value,
            ngayThamGia: formatDateFromInput(form.elements.doctorNgayThamGia.value),
            email: form.elements.doctorEmail.value,
        };

        if (doctorFormMode === 'edit') {
            setDoctors(doctors.map(d => d.id === currentDoctorId ? newDoctorData : d));
            alert('Đã cập nhật tài khoản bác sĩ!');
        } else {
            setDoctors([...doctors, newDoctorData]);
            alert('Đã thêm tài khoản bác sĩ mới!');
        }
        closeModal(setDoctorModalOpen, doctorFormRef);
    };

    const deleteDoctor = (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản bác sĩ có mã ${id} không?`)) {
            setDoctors(doctors.filter(d => d.id !== id));
            alert(`Đã xóa tài khoản bác sĩ ${id}!`);
        }
    };
    
    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        // Kiểm tra xem có đang đăng nhập không dựa vào trạng thái isLoggedIn
        if (isLoggedIn) {
            localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập khỏi localStorage
            // Nếu bạn lưu token, hãy xóa token: localStorage.removeItem('userToken');
            setIsLoggedIn(false); // Cập nhật trạng thái trong component
            alert('Đăng xuất thành công!');
            // Chuyển hướng người dùng về trang đăng nhập sau khi đăng xuất
            navigate('/login'); // Đảm bảo bạn có route '/login' trong App.js
        } else {
            alert('Bạn chưa đăng nhập.');
            navigate('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
            // Tùy chọn: chuyển hướng người dùng đến trang đăng nhập nếu họ cố gắng đăng xuất khi chưa đăng nhập
            // navigate('/login'); 
        }
    };

    return (
        <div>
            <nav className="admin-main-navbar">
                <div className="admin-navbar-left-section">
                    <span className="admin-navbar-brand-name">HIV - MTSS</span>
                </div>
                <ul className="admin-navbar-nav-links">
                    <li><Link to="/managedoctor">Hệ thống quản lý Bác Sĩ</Link></li>
                    <li><Link to="/manageuser">Hệ thống quản lý hồ sơ y tế</Link></li>
                    {/* Nút Đăng xuất - Luôn hiển thị (hoặc có thể tùy biến hiển thị nếu muốn) */}
                    <li>
                        <button onClick={handleLogout} className="admin-logout-btn">
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </nav>

            <main>
                <h1 className="admin-page-main-title">HỆ THỐNG QUẢN LÝ DÀNH CHO ADMIN</h1>

                <section className="admin-data-section" id="dashboard-overview">
                    <h2 className="admin-section-heading">Dashboard Tổng Quan</h2>
                    <div className="admin-overview-card-list">
                        <div className="admin-stat-card">
                            <div className="admin-card-heading">Tổng số tài khoản Bệnh Nhân</div>
                            <div className="admin-card-value">{patients.length}</div>
                            <div className="admin-card-description-text">Tài khoản bệnh nhân đang hoạt động</div>
                        </div>
                        <div className="admin-stat-card">
                            <div className="admin-card-heading">Tổng số tài khoản Bác Sĩ</div>
                            <div className="admin-card-value">{doctors.length}</div>
                            <div className="admin-card-description-text">Tài khoản bác sĩ đang hoạt động</div>
                        </div>
                        <div className="admin-stat-card">
                            <div className="admin-card-heading">Tổng lượt Khám bệnh</div>
                            <div className="admin-card-value">{totalAppointments}</div>
                            <div className="admin-card-description-text">Tổng số lượt khám đã ghi nhận</div>
                        </div>
                        <div className="admin-stat-card">
                            <div className="admin-card-heading">Hiệu quả Điều trị</div>
                            <div className="admin-card-value">{treatmentEfficiency}%</div>
                            <div className="admin-card-description-text">Tỷ lệ điều trị thành công</div>
                        </div>
                    </div>
                </section>

                <section className="admin-data-section" id="manage-patients">
                    <div className="admin-section-header-row">
                        <h2 className="admin-section-heading">Quản lý tài khoản Bệnh Nhân</h2>
                        <button className="admin-action-add-btn" onClick={() => openPatientModal('add')}>
                            <span className="material-icons">add</span>Thêm mới
                        </button>
                    </div>
                    <div className="admin-data-table-container">
                        <table id="patientTable">
                            <thead>
                                <tr>
                                    <th>Mã BN</th>
                                    <th>Họ tên</th>
                                    <th>SDT</th>
                                    <th>Giới tính</th>
                                    <th>Ngày đăng ký</th>
                                    <th>Email</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map(patient => (
                                    <tr key={patient.id} data-id={patient.id}>
                                        <td>{patient.id}</td>
                                        <td>{patient.hoTen}</td>
                                        <td>{patient.sdt}</td>
                                        <td>{patient.gioiTinh}</td>
                                        <td>{formatDateToDisplay(patient.ngayDangKy)}</td>
                                        <td>{patient.email}</td>
                                        <td className="admin-table-action-buttons">
                                            <span className="material-icons admin-table-edit-icon" onClick={() => openPatientModal('edit', patient.id)}>edit</span>
                                            <span className="material-icons admin-table-delete-icon" onClick={() => deletePatient(patient.id)}>delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="admin-data-section" id="manage-doctors">
                    <div className="admin-section-header-row">
                        <h2 className="admin-section-heading">Quản lý tài khoản Bác Sĩ</h2>
                        <button className="admin-action-add-btn" onClick={() => openDoctorModal('add')}>
                            <span className="material-icons">add</span>Thêm mới
                        </button>
                    </div>
                    <div className="admin-data-table-container">
                        <table id="doctorTable">
                            <thead>
                                <tr>
                                    <th>Mã BS</th>
                                    <th>Họ tên</th>
                                    <th>SDT</th>
                                    <th>Giới tính</th>
                                    <th>Khoa</th>
                                    <th>Ngày tham gia</th>
                                    <th>Email</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map(doctor => (
                                    <tr key={doctor.id} data-id={doctor.id}>
                                        <td>{doctor.id}</td>
                                        <td>{doctor.hoTen}</td>
                                        <td>{doctor.sdt}</td>
                                        <td>{doctor.gioiTinh}</td>
                                        <td>{doctor.khoa}</td>
                                        <td>{formatDateToDisplay(doctor.ngayThamGia)}</td>
                                        <td>{doctor.email}</td>
                                        <td className="admin-table-action-buttons">
                                            <span className="material-icons admin-table-edit-icon" onClick={() => openDoctorModal('edit', doctor.id)}>edit</span>
                                            <span className="material-icons admin-table-delete-icon" onClick={() => deleteDoctor(doctor.id)}>delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <footer className="admin-main-footer">
                <div className="admin-footer-content-container">
                    <div className="admin-footer-brand-info">
                        <span className="admin-footer-logo-text">HIV - MTTS</span>
                    </div>
                    <div className="admin-footer-contact-links">
                        <div className="admin-footer-social-links">
                            <a href="#" title="Facebook" className="admin-social-icon-link"><span className="material-icons">facebook</span></a>
                            <a href="tel:0123456789" title="Điện thoại" className="admin-social-icon-link"><span className="material-icons">call</span></a>
                            <a href="mailto:hivmtts@gmail.com.vn" title="Email" className="admin-social-icon-link"><span className="material-icons">mail</span></a>
                            <a href="https://github.com/" title="GitHub" className="admin-social-icon-link">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                        <div className="admin-footer-support-email">
                            Hỗ trợ: hivmtts@gmail.com.vn
                        </div>
                        <div className="admin-footer-copyright-text">
                            © 2025 Trung tâm điều trị HIV. Mọi quyền được bảo lưu.
                        </div>
                    </div>
                </div>
            </footer>

            {patientModalOpen && (
                <div id="patientModal" className="admin-app-modal" onClick={(e) => e.target.id === 'patientModal' && closeModal(setPatientModalOpen, patientFormRef)}>
                    <div className="admin-modal-content-box">
                        <span className="admin-modal-close-btn" onClick={() => closeModal(setPatientModalOpen, patientFormRef)}>&times;</span>
                        <h3 id="patientModalTitle" className="admin-modal-title">{patientFormMode === 'add' ? 'Thêm tài khoản Bệnh nhân mới' : 'Chỉnh sửa tài khoản Bệnh nhân'}</h3>
                        <form id="patientForm" onSubmit={handlePatientSubmit} ref={patientFormRef}>
                            <input type="hidden" id="patientId" name="id" value={currentPatientId} />
                            <label htmlFor="patientMa">Mã BN:</label>
                            <input type="text" id="patientMa" name="patientMa" required />

                            <label htmlFor="patientHoTen">Họ tên:</label>
                            <input type="text" id="patientHoTen" name="patientHoTen" required />

                            <label htmlFor="patientSDT">SDT:</label>
                            <input type="tel" id="patientSDT" name="patientSDT" required />

                            <label htmlFor="patientGioiTinh">Giới tính:</label>
                            <select id="patientGioiTinh" name="patientGioiTinh" required>
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>

                            <label htmlFor="patientNgayDangKy">Ngày đăng ký:</label>
                            <input type="date" id="patientNgayDangKy" name="patientNgayDangKy" required />

                            <label htmlFor="patientEmail">Email:</label>
                            <input type="email" id="patientEmail" name="patientEmail" required />

                            <div className="admin-modal-action-buttons">
                                <button type="button" className="admin-modal-cancel-btn" onClick={() => closeModal(setPatientModalOpen, patientFormRef)}>Hủy</button>
                                <button type="submit" className="admin-modal-submit-btn">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {doctorModalOpen && (
                <div id="doctorModal" className="admin-app-modal" onClick={(e) => e.target.id === 'doctorModal' && closeModal(setDoctorModalOpen, doctorFormRef)}>
                    <div className="admin-modal-content-box">
                        <span className="admin-modal-close-btn" onClick={() => closeModal(setDoctorModalOpen, doctorFormRef)}>&times;</span>
                        <h3 id="doctorModalTitle" className="admin-modal-title">{doctorFormMode === 'add' ? 'Thêm tài khoản Bác sĩ mới' : 'Chỉnh sửa tài khoản Bác sĩ'}</h3>
                        <form id="doctorForm" onSubmit={handleDoctorSubmit} ref={doctorFormRef}>
                            <input type="hidden" id="doctorId" name="id" value={currentDoctorId} />
                            <label htmlFor="doctorMa">Mã BS:</label>
                            <input type="text" id="doctorMa" name="doctorMa" required />

                            <label htmlFor="doctorHoTen">Họ tên:</label>
                            <input type="text" id="doctorHoTen" name="doctorHoTen" required />

                            <label htmlFor="doctorSDT">SDT:</label>
                            <input type="tel" id="doctorSDT" name="doctorSDT" required />

                            <label htmlFor="doctorGioiTinh">Giới tính:</label>
                            <select id="doctorGioiTinh" name="doctorGioiTinh" required>
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>

                            <label htmlFor="doctorKhoa">Khoa:</label>
                            <input type="text" id="doctorKhoa" name="doctorKhoa" required />

                            <label htmlFor="doctorNgayThamGia">Ngày tham gia:</label>
                            <input type="date" id="doctorNgayThamGia" name="doctorNgayThamGia" required />

                            <label htmlFor="doctorEmail">Email:</label>
                            <input type="email" id="doctorEmail" name="doctorEmail" required />

                            <div className="admin-modal-action-buttons">
                                <button type="button" className="admin-modal-cancel-btn" onClick={() => closeModal(setDoctorModalOpen, doctorFormRef)}>Hủy</button>
                                <button type="submit" className="admin-modal-submit-btn">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;