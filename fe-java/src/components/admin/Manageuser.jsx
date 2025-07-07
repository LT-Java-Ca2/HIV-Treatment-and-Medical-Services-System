import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../../assests/Manageuser.css';
import { Link } from 'react-router-dom';

function Manageuser() {
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
    const [medicalModalOpen, setMedicalModalOpen] = useState(false);
    const [treatmentModalOpen, setTreatmentModalOpen] = useState(false);

    const [userFormMode, setUserFormMode] = useState('add');
    const [currentUserId, setCurrentUserId] = useState('');
    const [appointmentFormMode, setAppointmentFormMode] = useState('add');
    const [currentAppointmentId, setCurrentAppointmentId] = useState('');
    const [medicalFormMode, setMedicalFormMode] = useState('add');
    const [currentMedicalId, setCurrentMedicalId] = useState('');
    const [treatmentFormMode, setTreatmentFormMode] = useState('add');
    const [currentTreatmentId, setCurrentTreatmentId] = useState('');

    const [users, setUsers] = useState([
        { id: 'BN001', hoTen: 'Phạm Huỳnh Gia Bảo', sdt: '0912345678', gioiTinh: 'Nam' },
        { id: 'BN002', hoTen: 'Lương Quốc An', sdt: '0984579543', gioiTinh: 'Nam' },
        { id: 'BN003', hoTen: 'Khang Trương', sdt: '0776543210', gioiTinh: 'Nam' },
    ]);

    const [appointments, setAppointments] = useState([
        { id: 'A001', hoTen: 'Phạm Huỳnh Gia Bảo', sdt: '0912345678', gioiTinh: 'Nam', ngayDat: '28/5/2025', thoiGian: '14:00 - 14:30', tinhTrang: 'Đã xác nhận' },
        { id: 'A002', hoTen: 'Lương Quốc An', sdt: '0984579543', gioiTinh: 'Nam', ngayDat: '29/5/2025', thoiGian: '09:00 - 09:30', tinhTrang: 'Chờ xác nhận' },
        { id: 'A003', hoTen: 'Khang Trương', sdt: '0776543210', gioiTinh: 'Nam', ngayDat: '26/5/2025', thoiGian: '10:00 - 10:30', tinhTrang: 'Đã hoàn thành' },
    ]);

    const [medicals, setMedicals] = useState([
        { id: 'MP001', maBN: 'BN001', hoTen: 'Phạm Huỳnh Gia Bảo', sdt: '0912345678', gioiTinh: 'Nam', ngayDat: '12/5/2025', thoiGian: '14:30 - 15:00', khoa: 'Truyền nhiễm', phong: 'H001' },
        { id: 'MP002', maBN: 'BN002', hoTen: 'Lương Quốc An', sdt: '0984579543', gioiTinh: 'Nam', ngayDat: '15/5/2025', thoiGian: '10:00 - 11:00', khoa: 'Truyền nhiễm', phong: 'H002' },
        { id: 'MP003', maBN: 'BN003', hoTen: 'Khang Trương', sdt: '0776543210', gioiTinh: 'Nam', ngayDat: '8/5/2025', thoiGian: '15:00 - 16:00', khoa: 'Truyền nhiễm', phong: 'H003' },
    ]);

    const [treatments, setTreatments] = useState([
        { id: 'DT001', maDT: 'DT001', hoTen: 'Phạm Huỳnh Gia Bảo', gioiTinh: 'Nam', bacSi: 'BS.Nguyễn Duy Thế', ngay: '20/5/2025', ghiChu: 'ABC + 3TC + EFV' },
        { id: 'DT002', maDT: 'DT002', hoTen: 'Lương Quốc An', gioiTinh: 'Nam', bacSi: 'BS.Phạm Bá Hiền', ngay: '25/5/2025', ghiChu: 'TDF + 3TC + DTG' },
        { id: 'DT003', maDT: 'DT003', hoTen: 'Khang Trương', gioiTinh: 'Nam', bacSi: 'BS.Nguyễn Văn Kính', ngay: '10/5/2025', ghiChu: 'Kiểm tra định kỳ' },
    ]);

    const formatDateForInput = useCallback((dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return '';
    }, []);

    const formatDateFromInput = useCallback((dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${parseInt(day)}/${parseInt(month)}/${year}`;
        }
        return dateString;
    }, []);

    const openModal = (setter) => {
        setter(true);
    };

    const closeModal = (setter, formRef) => {
        setter(false);
        if (formRef && formRef.current) {
            formRef.current.reset();
        }
    };

    const userFormRef = useRef(null);
    const openUserModal = (mode, id = '') => {
        setUserFormMode(mode);
        setCurrentUserId(id);
        openModal(setUserModalOpen);
    };

    useEffect(() => {
        if (userModalOpen && userFormRef.current) {
            if (userFormMode === 'edit') {
                const user = users.find(u => u.id === currentUserId);
                if (user) {
                    userFormRef.current.elements.userMa.value = user.id;
                    userFormRef.current.elements.userMa.readOnly = true;
                    userFormRef.current.elements.userHoTen.value = user.hoTen;
                    userFormRef.current.elements.userSDT.value = user.sdt;
                    userFormRef.current.elements.userGioiTinh.value = user.gioiTinh;
                }
            } else {
                userFormRef.current.reset();
                const newIdNum = users.length + 1;
                let newId = `BN${String(newIdNum).padStart(3, '0')}`;
                while (users.some(u => u.id === newId)) {
                    newIdNum++;
                    newId = `BN${String(newIdNum).padStart(3, '0')}`;
                }
                userFormRef.current.elements.userMa.value = newId;
                userFormRef.current.elements.userMa.readOnly = false;
            }
        }
    }, [userModalOpen, userFormMode, currentUserId, users]);

    const handleUserSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const newUserData = {
            id: form.elements.userMa.value,
            hoTen: form.elements.userHoTen.value,
            sdt: form.elements.userSDT.value,
            gioiTinh: form.elements.userGioiTinh.value,
        };

        if (userFormMode === 'edit') {
            setUsers(users.map(user => user.id === currentUserId ? newUserData : user));
            alert('Đã cập nhật hồ sơ người dùng!');
        } else {
            if (users.some(u => u.id === newUserData.id)) {
                alert('Mã BN đã tồn tại. Vui lòng chọn mã khác.');
                return;
            }
            setUsers([...users, newUserData]);
            alert('Đã thêm hồ sơ người dùng mới!');
        }
        closeModal(setUserModalOpen, userFormRef);
    };

    const deleteUser = (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa hồ sơ người dùng có mã ${id} không?`)) {
            setUsers(users.filter(user => user.id !== id));
            alert(`Đã xóa hồ sơ người dùng ${id}!`);
        }
    };

    const appointmentFormRef = useRef(null);
    const openAppointmentModal = (mode, id = '') => {
        setAppointmentFormMode(mode);
        setCurrentAppointmentId(id);
        openModal(setAppointmentModalOpen);
    };

    useEffect(() => {
        if (appointmentModalOpen && appointmentFormRef.current) {
            if (appointmentFormMode === 'edit') {
                const appointment = appointments.find(a => a.id === currentAppointmentId);
                if (appointment) {
                    appointmentFormRef.current.elements.appointmentMa.value = appointment.id;
                    appointmentFormRef.current.elements.appointmentMa.readOnly = true;
                    appointmentFormRef.current.elements.appointmentHoTen.value = appointment.hoTen;
                    appointmentFormRef.current.elements.appointmentSDT.value = appointment.sdt;
                    appointmentFormRef.current.elements.appointmentGioiTinh.value = appointment.gioiTinh;
                    appointmentFormRef.current.elements.appointmentNgayDat.value = formatDateForInput(appointment.ngayDat);
                    appointmentFormRef.current.elements.appointmentThoiGian.value = appointment.thoiGian;
                    appointmentFormRef.current.elements.appointmentTinhTrang.value = appointment.tinhTrang;
                }
            } else {
                appointmentFormRef.current.reset();
                const newIdNum = appointments.length + 1;
                let newId = `A${String(newIdNum).padStart(3, '0')}`;
                while (appointments.some(a => a.id === newId)) {
                    newIdNum++;
                    newId = `A${String(newIdNum).padStart(3, '0')}`;
                }
                appointmentFormRef.current.elements.appointmentMa.value = newId;
                appointmentFormRef.current.elements.appointmentMa.readOnly = false;
            }
        }
    }, [appointmentModalOpen, appointmentFormMode, currentAppointmentId, appointments, formatDateForInput]);

    const handleAppointmentSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const newAppointmentData = {
            id: form.elements.appointmentMa.value,
            hoTen: form.elements.appointmentHoTen.value,
            sdt: form.elements.appointmentSDT.value,
            gioiTinh: form.elements.appointmentGioiTinh.value,
            ngayDat: formatDateFromInput(form.elements.appointmentNgayDat.value),
            thoiGian: form.elements.appointmentThoiGian.value,
            tinhTrang: form.elements.appointmentTinhTrang.value,
        };

        if (appointmentFormMode === 'edit') {
            setAppointments(appointments.map(app => app.id === currentAppointmentId ? newAppointmentData : app));
            alert('Đã cập nhật cuộc hẹn!');
        } else {
            if (appointments.some(a => a.id === newAppointmentData.id)) {
                alert('Mã hẹn đã tồn tại. Vui lòng chọn mã khác.');
                return;
            }
            setAppointments([...appointments, newAppointmentData]);
            alert('Đã thêm cuộc hẹn mới!');
        }
        closeModal(setAppointmentModalOpen, appointmentFormRef);
    };

    const deleteAppointment = (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa cuộc hẹn có mã ${id} không?`)) {
            setAppointments(appointments.filter(app => app.id !== id));
            alert(`Đã xóa cuộc hẹn ${id}!`);
        }
    };

    const medicalFormRef = useRef(null);
    const openMedicalModal = (mode, id = '') => {
        setMedicalFormMode(mode);
        setCurrentMedicalId(id);
        openModal(setMedicalModalOpen);
    };

    useEffect(() => {
        if (medicalModalOpen && medicalFormRef.current) {
            if (medicalFormMode === 'edit') {
                const medical = medicals.find(m => m.id === currentMedicalId);
                if (medical) {
                    medicalFormRef.current.elements.medicalMaBN.value = medical.maBN;
                    medicalFormRef.current.elements.medicalMaBN.readOnly = true;
                    medicalFormRef.current.elements.medicalHoTen.value = medical.hoTen;
                    medicalFormRef.current.elements.medicalSDT.value = medical.sdt;
                    medicalFormRef.current.elements.medicalGioiTinh.value = medical.gioiTinh;
                    medicalFormRef.current.elements.medicalNgayDat.value = formatDateForInput(medical.ngayDat);
                    medicalFormRef.current.elements.medicalThoiGian.value = medical.thoiGian;
                    medicalFormRef.current.elements.medicalKhoa.value = medical.khoa;
                    medicalFormRef.current.elements.medicalPhong.value = medical.phong;
                }
            } else {
                medicalFormRef.current.reset();
                const newIdNum = medicals.length + 1;
                let newId = `MP${String(newIdNum).padStart(3, '0')}`;
                while (medicals.some(m => m.id === newId)) {
                    newIdNum++;
                    newId = `MP${String(newIdNum).padStart(3, '0')}`;
                }
                medicalFormRef.current.elements.medicalMaBN.value = newId;
                medicalFormRef.current.elements.medicalMaBN.readOnly = false;
            }
        }
    }, [medicalModalOpen, medicalFormMode, currentMedicalId, medicals, formatDateForInput]);

    const handleMedicalSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const newMedicalData = {
            id: form.elements.medicalMaBN.value,
            maBN: form.elements.medicalMaBN.value,
            hoTen: form.elements.medicalHoTen.value,
            sdt: form.elements.medicalSDT.value,
            gioiTinh: form.elements.medicalGioiTinh.value,
            ngayDat: formatDateFromInput(form.elements.medicalNgayDat.value),
            thoiGian: form.elements.medicalThoiGian.value,
            khoa: form.elements.medicalKhoa.value,
            phong: form.elements.medicalPhong.value,
        };

        if (medicalFormMode === 'edit') {
            setMedicals(medicals.map(med => med.id === currentMedicalId ? newMedicalData : med));
            alert('Đã cập nhật lịch đặt khám!');
        } else {
            if (medicals.some(m => m.id === newMedicalData.id)) {
                alert('Mã BN (Mã lịch khám) đã tồn tại. Vui lòng chọn mã khác.');
                return;
            }
            setMedicals([...medicals, newMedicalData]);
            alert('Đã thêm lịch đặt khám mới!');
        }
        closeModal(setMedicalModalOpen, medicalFormRef);
    };

    const deleteMedical = (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa lịch đặt khám của bệnh nhân có mã ${id} không?`)) {
            setMedicals(medicals.filter(med => med.id !== id));
            alert(`Đã xóa lịch đặt khám của bệnh nhân ${id}!`);
        }
    };

    const treatmentFormRef = useRef(null);
    const openTreatmentModal = (mode, id = '') => {
        setTreatmentFormMode(mode);
        setCurrentTreatmentId(id);
        openModal(setTreatmentModalOpen);
    };

    useEffect(() => {
        if (treatmentModalOpen && treatmentFormRef.current) {
            if (treatmentFormMode === 'edit') {
                const treatment = treatments.find(t => t.id === currentTreatmentId);
                if (treatment) {
                    treatmentFormRef.current.elements.treatmentMaDT.value = treatment.maDT;
                    treatmentFormRef.current.elements.treatmentMaDT.readOnly = true;
                    treatmentFormRef.current.elements.treatmentHoTen.value = treatment.hoTen;
                    treatmentFormRef.current.elements.treatmentGioiTinh.value = treatment.gioiTinh;
                    treatmentFormRef.current.elements.treatmentBacSi.value = treatment.bacSi;
                    treatmentFormRef.current.elements.treatmentNgay.value = formatDateForInput(treatment.ngay);
                    treatmentFormRef.current.elements.treatmentGhiChu.value = treatment.ghiChu;
                }
            } else {
                treatmentFormRef.current.reset();
                const newIdNum = treatments.length + 1;
                let newId = `DT${String(newIdNum).padStart(3, '0')}`;
                while (treatments.some(t => t.id === newId)) {
                    newIdNum++;
                    newId = `DT${String(newIdNum).padStart(3, '0')}`;
                }
                treatmentFormRef.current.elements.treatmentMaDT.value = newId;
                treatmentFormRef.current.elements.treatmentMaDT.readOnly = false;
            }
        }
    }, [treatmentModalOpen, treatmentFormMode, currentTreatmentId, treatments, formatDateForInput]);

    const handleTreatmentSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const newTreatmentData = {
            id: form.elements.treatmentMaDT.value,
            maDT: form.elements.treatmentMaDT.value,
            hoTen: form.elements.treatmentHoTen.value,
            gioiTinh: form.elements.treatmentGioiTinh.value,
            bacSi: form.elements.treatmentBacSi.value,
            ngay: formatDateFromInput(form.elements.treatmentNgay.value),
            ghiChu: form.elements.treatmentGhiChu.value,
        };

        if (treatmentFormMode === 'edit') {
            setTreatments(treatments.map(t => t.id === currentTreatmentId ? newTreatmentData : t));
            alert('Đã cập nhật lịch sử điều trị!');
        } else {
            if (treatments.some(t => t.id === newTreatmentData.id)) {
                alert('Mã điều trị đã tồn tại. Vui lòng chọn mã khác.');
                return;
            }
            setTreatments([...treatments, newTreatmentData]);
            alert('Đã thêm Bệnh Nhân điều trị mới!');
        }
        closeModal(setTreatmentModalOpen, treatmentFormRef);
    };

    const deleteTreatment = (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa lịch sử điều trị có mã ${id} không?`)) {
            setTreatments(treatments.filter(t => t.id !== id));
            alert(`Đã xóa lịch sử điều trị ${id}!`);
        }
    };

    const pendingAppointments = appointments.filter(app => app.tinhTrang === 'Chờ xác nhận' || app.tinhTrang === 'Đã xác nhận');
    const pendingMedicalAppointments = medicals.length;

    return (
        <div>
            <nav className="mu-main-navbar">
                <div className="mu-navbar-left-section">
                    <span className="mu-navbar-brand-name">HIV - MTSS</span>
                </div>
                <ul className="mu-navbar-nav-links">
                    <li><Link to="/managedoctor">Hệ thống quản lý Bác Sĩ</Link></li>
                    <li><Link to="/admin">Hệ thống quản lý</Link></li>
                </ul>
            </nav>

            <main>
                <h1 className="mu-page-main-title">HỆ THỐNG QUẢN LÝ HỒ SƠ Y TẾ</h1>
                <section className="mu-data-section">
                    <h2 className="mu-section-heading">Thống kê tổng quan</h2>
                    <div className="mu-overview-card-list">
                        <div className="mu-stat-card">
                            <div className="mu-card-heading">Tổng số bệnh nhân</div>
                            <div className="mu-card-value">{users.length}</div>
                            <div className="mu-card-description-text">Tổng số hồ sơ bệnh nhân hiện có</div>
                        </div>
                        <div className="mu-stat-card">
                            <div className="mu-card-heading">Tổng số lịch hẹn</div>
                            <div className="mu-card-value">{pendingAppointments.length}</div>
                            <div className="mu-card-description-text">Số cuộc hẹn chờ xác nhận/sắp tới</div>
                        </div>
                        <div className="mu-stat-card">
                            <div className="mu-card-heading">Tổng số lịch khám</div>
                            <div className="mu-card-value">{pendingMedicalAppointments}</div>
                            <div className="mu-card-description-text">Số lịch khám cần xử lý</div>
                        </div>
                        <div className="mu-stat-card">
                            <div className="mu-card-heading">Bệnh nhân điều trị</div>
                            <div className="mu-card-value">{treatments.length}</div>
                            <div className="mu-card-description-text">Hồ sơ bệnh nhân đang hoạt động</div>
                        </div>
                    </div>
                </section>

                <section className="mu-data-section" id="user-profiles">
                    <div className="mu-section-header-row">
                        <h2 className="mu-section-heading">Hồ sơ bệnh nhân</h2>
                        <button className="mu-action-add-btn" onClick={() => openUserModal('add')}>
                            <span className="material-icons">add</span>Thêm mới
                        </button>
                    </div>
                    <div className="mu-data-table-container">
                        <table id="userTable">
                            <thead>
                                <tr>
                                    <th>Mã BN</th>
                                    <th>Họ tên</th>
                                    <th>SDT</th>
                                    <th>Giới tính</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} data-id={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.hoTen}</td>
                                        <td>{user.sdt}</td>
                                        <td>{user.gioiTinh}</td>
                                        <td className="mu-table-action-buttons">
                                            <span className="material-icons mu-table-edit-icon" onClick={() => openUserModal('edit', user.id)}>edit</span>
                                            <span className="material-icons mu-table-delete-icon" onClick={() => deleteUser(user.id)}>delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mu-data-section" id="consultation-list">
                    <div className="mu-section-header-row">
                        <h2 className="mu-section-heading">Danh sách lịch đặt hẹn</h2>
                        <button className="mu-action-add-btn" onClick={() => openAppointmentModal('add')}>
                            <span className="material-icons">add</span>Thêm mới
                        </button>
                    </div>
                    <div className="mu-data-table-container">
                        <table id="appointmentTable">
                            <thead>
                                <tr>
                                    <th>Mã hẹn</th>
                                    <th>Họ tên</th>
                                    <th>SDT</th>
                                    <th>Giới tính</th>
                                    <th>Ngày đặt</th>
                                    <th>Thời gian</th>
                                    <th>Tình trạng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(app => (
                                    <tr key={app.id} data-id={app.id}>
                                        <td>{app.id}</td>
                                        <td>{app.hoTen}</td>
                                        <td>{app.sdt}</td>
                                        <td>{app.gioiTinh}</td>
                                        <td>{app.ngayDat}</td>
                                        <td>{app.thoiGian}</td>
                                        <td>{app.tinhTrang}</td>
                                        <td className="mu-table-action-buttons">
                                            <span className="material-icons mu-table-edit-icon" onClick={() => openAppointmentModal('edit', app.id)}>edit</span>
                                            <span className="material-icons mu-table-delete-icon" onClick={() => deleteAppointment(app.id)}>delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mu-data-section" id="medical-list">
                    <div className="mu-section-header-row">
                        <h2 className="mu-section-heading">Danh sách lịch đặt khám</h2>
                        <button className="mu-action-add-btn" onClick={() => openMedicalModal('add')}>
                            <span className="material-icons">add</span>Thêm mới
                        </button>
                    </div>
                    <div className="mu-data-table-container">
                        <table id="medicalTable">
                            <thead>
                                <tr>
                                    <th>Mã BN</th>
                                    <th>Họ tên</th>
                                    <th>SDT</th>
                                    <th>Giới tính</th>
                                    <th>Ngày đặt</th>
                                    <th>Thời gian</th>
                                    <th>Khoa</th>
                                    <th>Phòng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicals.map(med => (
                                    <tr key={med.id} data-id={med.id}>
                                        <td>{med.maBN}</td>
                                        <td>{med.hoTen}</td>
                                        <td>{med.sdt}</td>
                                        <td>{med.gioiTinh}</td>
                                        <td>{med.ngayDat}</td>
                                        <td>{med.thoiGian}</td>
                                        <td>{med.khoa}</td>
                                        <td>{med.phong}</td>
                                        <td className="mu-table-action-buttons">
                                            <span className="material-icons mu-table-edit-icon" onClick={() => openMedicalModal('edit', med.id)}>edit</span>
                                            <span className="material-icons mu-table-delete-icon" onClick={() => deleteMedical(med.id)}>delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mu-data-section" id="treatment-history">
                    <div className="mu-section-header-row">
                        <h2 className="mu-section-heading">Bệnh Nhân điều trị</h2>
                        <button className="mu-action-add-btn" onClick={() => openTreatmentModal('add')}>
                            <span className="material-icons">add</span>Thêm mới
                        </button>
                    </div>
                    <div className="mu-data-table-container">
                        <table id="treatmentTable">
                            <thead>
                                <tr>
                                    <th>Mã điều trị</th>
                                    <th>Họ tên</th>
                                    <th>Giới tính</th>
                                    <th>Bác sĩ</th>
                                    <th>Ngày</th>
                                    <th>Ghi chú</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {treatments.map(t => (
                                    <tr key={t.id} data-id={t.id}>
                                        <td>{t.maDT}</td>
                                        <td>{t.hoTen}</td>
                                        <td>{t.gioiTinh}</td>
                                        <td>{t.bacSi}</td>
                                        <td>{t.ngay}</td>
                                        <td>{t.ghiChu}</td>
                                        <td className="mu-table-action-buttons">
                                            <span className="material-icons mu-table-edit-icon" onClick={() => openTreatmentModal('edit', t.id)}>edit</span>
                                            <span className="material-icons mu-table-delete-icon" onClick={() => deleteTreatment(t.id)}>delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <footer className="mu-main-footer">
                <div className="mu-footer-content-container">
                    <div className="mu-footer-brand-info">
                        <span className="mu-footer-logo-text">HIV - MTTS</span>
                    </div>
                    <div className="mu-footer-contact-links">
                        <div className="mu-social-icon-links">
                            <a href="#" title="Facebook" className="mu-social-icon-link"><span className="material-icons">facebook</span></a>
                            <a href="tel:0123456789" title="Điện thoại" className="mu-social-icon-link"><span className="material-icons">call</span></a>
                            <a href="mailto:hivmtts@gmail.com.vn" title="Email" className="mu-social-icon-link"><span className="material-icons">mail</span></a>
                            <a href="https://github.com/" title="GitHub" className="mu-social-icon-link">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                        <div className="mu-footer-support-email">
                            Hỗ trợ: hivmtts@gmail.com.vn
                        </div>
                        <div className="mu-footer-copyright-text">
                            © 2025 Trung tâm điều trị HIV. Mọi quyền được bảo bảo.
                        </div>
                    </div>
                </div>
            </footer>

            {userModalOpen && (
                <div id="userModal" className="mu-app-modal" onClick={(e) => e.target.id === 'userModal' && closeModal(setUserModalOpen, userFormRef)}>
                    <div className="mu-modal-content-box">
                        <span className="mu-modal-close-btn" onClick={() => closeModal(setUserModalOpen, userFormRef)}>&times;</span>
                        <h3 id="userModalTitle" className="mu-modal-title">{userFormMode === 'add' ? 'Thêm hồ sơ Bệnh Nhân mới' : 'Chỉnh sửa hồ sơ bệnh nhân'}</h3>
                        <form id="userForm" onSubmit={handleUserSubmit} ref={userFormRef}>
                            <input type="hidden" id="userId" name="id" value={currentUserId} />
                            <label htmlFor="userMa">Mã BN:</label>
                            <input type="text" id="userMa" name="userMa" required />

                            <label htmlFor="userHoTen">Họ tên:</label>
                            <input type="text" id="userHoTen" name="userHoTen" required />

                            <label htmlFor="userSDT">SDT:</label>
                            <input type="tel" id="userSDT" name="userSDT" required />

                            <label htmlFor="userGioiTinh">Giới tính:</label>
                            <select id="userGioiTinh" name="userGioiTinh" required>
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>

                            <div className="mu-modal-action-buttons">
                                <button type="button" className="mu-modal-cancel-btn" onClick={() => closeModal(setUserModalOpen, userFormRef)}>Hủy</button>
                                <button type="submit" className="mu-modal-submit-btn">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {appointmentModalOpen && (
                <div id="appointmentModal" className="mu-app-modal" onClick={(e) => e.target.id === 'appointmentModal' && closeModal(setAppointmentModalOpen, appointmentFormRef)}>
                    <div className="mu-modal-content-box">
                        <span className="mu-modal-close-btn" onClick={() => closeModal(setAppointmentModalOpen, appointmentFormRef)}>&times;</span>
                        <h3 id="appointmentModalTitle" className="mu-modal-title">{appointmentFormMode === 'add' ? 'Thêm cuộc hẹn mới' : 'Chỉnh sửa cuộc hẹn'}</h3>
                        <form id="appointmentForm" onSubmit={handleAppointmentSubmit} ref={appointmentFormRef}>
                            <input type="hidden" id="appointmentId" name="id" value={currentAppointmentId} />
                            <label htmlFor="appointmentMa">Mã hẹn:</label>
                            <input type="text" id="appointmentMa" name="appointmentMa" required />

                            <label htmlFor="appointmentHoTen">Họ tên:</label>
                            <input type="text" id="appointmentHoTen" name="appointmentHoTen" required />
                            <label htmlFor="appointmentSDT">SDT:</label>
                            <input type="tel" id="appointmentSDT" name="appointmentSDT" required />
                            <label htmlFor="appointmentGioiTinh">Giới tính:</label>
                            <select id="appointmentGioiTinh" name="appointmentGioiTinh" required>
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>

                            <label htmlFor="appointmentNgayDat">Ngày đặt:</label>
                            <input type="date" id="appointmentNgayDat" name="appointmentNgayDat" required />

                            <label htmlFor="appointmentThoiGian">Thời gian:</label>
                            <input type="text" id="appointmentThoiGian" name="appointmentThoiGian" placeholder="VD: 14:00 - 14:30" required />

                            <label htmlFor="appointmentTinhTrang">Tình trạng:</label>
                            <select id="appointmentTinhTrang" name="appointmentTinhTrang" required>
                                <option value="">Chọn tình trạng</option>
                                <option value="Đã xác nhận">Đã xác nhận</option>
                                <option value="Chờ xác nhận">Chờ xác nhận</option>
                                <option value="Đã hoàn thành">Đã hoàn thành</option>
                                <option value="Đã hủy">Đã hủy</option>
                            </select>

                            <div className="mu-modal-action-buttons">
                                <button type="button" className="mu-modal-cancel-btn" onClick={() => closeModal(setAppointmentModalOpen, appointmentFormRef)}>Hủy</button>
                                <button type="submit" className="mu-modal-submit-btn">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {medicalModalOpen && (
                <div id="medicalModal" className="mu-app-modal" onClick={(e) => e.target.id === 'medicalModal' && closeModal(setMedicalModalOpen, medicalFormRef)}>
                    <div className="mu-modal-content-box">
                        <span className="mu-modal-close-btn" onClick={() => closeModal(setMedicalModalOpen, medicalFormRef)}>&times;</span>
                        <h3 id="medicalModalTitle" className="mu-modal-title">{medicalFormMode === 'add' ? 'Thêm lịch đặt khám mới' : 'Chỉnh sửa lịch đặt khám'}</h3>
                        <form id="medicalForm" onSubmit={handleMedicalSubmit} ref={medicalFormRef}>
                            <input type="hidden" id="medicalId" name="id" value={currentMedicalId} />
                            <label htmlFor="medicalMaBN">Mã BN:</label>
                            <input type="text" id="medicalMaBN" name="medicalMaBN" required />

                            <label htmlFor="medicalHoTen">Họ tên:</label>
                            <input type="text" id="medicalHoTen" name="medicalHoTen" required />

                            <label htmlFor="medicalSDT">SDT:</label>
                            <input type="tel" id="medicalSDT" name="medicalSDT" required />

                            <label htmlFor="medicalGioiTinh">Giới tính:</label>
                            <select id="medicalGioiTinh" name="medicalGioiTinh" required>
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>

                            <label htmlFor="medicalNgayDat">Ngày đặt:</label>
                            <input type="date" id="medicalNgayDat" name="medicalNgayDat" required />

                            <label htmlFor="medicalThoiGian">Thời gian:</label>
                            <input type="text" id="medicalThoiGian" name="medicalThoiGian" placeholder="VD: 14:30 - 15:00" required />

                            <label htmlFor="medicalKhoa">Khoa:</label>
                            <input type="text" id="medicalKhoa" name="medicalKhoa" required />

                            <label htmlFor="medicalPhong">Phòng:</label>
                            <input type="text" id="medicalPhong" name="medicalPhong" required />

                            <div className="mu-modal-action-buttons">
                                <button type="button" className="mu-modal-cancel-btn" onClick={() => closeModal(setMedicalModalOpen, medicalFormRef)}>Hủy</button>
                                <button type="submit" className="mu-modal-submit-btn">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {treatmentModalOpen && (
                <div id="treatmentModal" className="mu-app-modal" onClick={(e) => e.target.id === 'treatmentModal' && closeModal(setTreatmentModalOpen, treatmentFormRef)}>
                    <div className="mu-modal-content-box">
                        <span className="mu-modal-close-btn" onClick={() => closeModal(setTreatmentModalOpen, treatmentFormRef)}>&times;</span>
                        <h3 id="treatmentModalTitle" className="mu-modal-title">{treatmentFormMode === 'add' ? 'Thêm Bệnh Nhân điều trị mới' : 'Chỉnh sửa lịch sử điều trị'}</h3>
                        <form id="treatmentForm" onSubmit={handleTreatmentSubmit} ref={treatmentFormRef}>
                            <input type="hidden" id="treatmentId" name="id" value={currentTreatmentId} />
                            <label htmlFor="treatmentMaDT">Mã điều trị:</label>
                            <input type="text" id="treatmentMaDT" name="treatmentMaDT" required />

                            <label htmlFor="treatmentHoTen">Họ tên:</label>
                            <input type="text" id="treatmentHoTen" name="treatmentHoTen" required />

                            <label htmlFor="treatmentGioiTinh">Giới tính:</label>
                            <select id="treatmentGioiTinh" name="treatmentGioiTinh" required>
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>

                            <label htmlFor="treatmentBacSi">Bác sĩ:</label>
                            <input type="text" id="treatmentBacSi" name="treatmentBacSi" required />

                            <label htmlFor="treatmentNgay">Ngày:</label>
                            <input type="date" id="treatmentNgay" name="treatmentNgay" required />

                            <label htmlFor="treatmentGhiChu">Ghi chú:</label>
                            <input type="text" id="treatmentGhiChu" name="treatmentGhiChu" required />

                            <div className="mu-modal-action-buttons">
                                <button type="button" className="mu-modal-cancel-btn" onClick={() => closeModal(setTreatmentModalOpen, treatmentFormRef)}>Hủy</button>
                                <button type="submit" className="mu-modal-submit-btn">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Manageuser;