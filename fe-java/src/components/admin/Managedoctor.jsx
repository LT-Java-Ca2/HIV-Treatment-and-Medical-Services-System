import React, { useState, useEffect } from 'react';
import '../../assests/Managedoctor.css'; // Assuming you'll create a corresponding CSS file
import { Link } from 'react-router-dom';


const Managedoctor = () => {
    const [doctorName, setDoctorName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('Nam');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [trainingSchool, setTrainingSchool] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [experience, setExperience] = useState('');
    const [notes, setNotes] = useState('');
    const [scheduleMonFri, setScheduleMonFri] = useState('');
    const [scheduleSat, setScheduleSat] = useState('');
    const [scheduleSun, setScheduleSun] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);

    // Initial dummy data (from your HTML table)
    useEffect(() => {
        setDoctors([
            {
                name: 'BS.Nguyễn Duy Thế',
                specialty: 'Truyền nhiễm',
                phone: '0977777777',
                email: 'ndt123@gmail.com',
                dob: '01/01/1984',
                gender: 'Nam',
                educationLevel: 'Đại học',
                trainingSchool: 'ĐH Y Hà Nội',
                graduationYear: '2005',
                experience: '5 năm',
                notes: 'Tốt bụng',
                scheduleMonFri: '07:00 - 17:00',
                scheduleSat: '07:00 - 12:00',
                scheduleSun: 'Nghỉ',
            },
            {
                name: 'BS.Phạm Bá Hiền',
                specialty: 'Truyền nhiễm',
                phone: '0966666666',
                email: 'pbh123@gmail.com',
                dob: '1979-05-20',
                gender: 'Nam',
                educationLevel: 'Thạc sĩ',
                trainingSchool: 'ĐH Y Dược TPHCM',
                graduationYear: '2000',
                experience: '10 năm',
                notes: 'Nhiệt tình',
                scheduleMonFri: '08:00 - 18:00',
                scheduleSat: '08:00 - 13:00',
                scheduleSun: 'Làm việc',
            },
            {
                name: 'BS.Bùi Thanh Bình',
                specialty: 'Truyền nhiễm',
                phone: '0955555555',
                email: 'btb123@gmail.com',
                dob: '1970-11-10',
                gender: 'Nam',
                educationLevel: 'BS CKII',
                trainingSchool: 'Học viện Quân Y',
                graduationYear: '1995',
                experience: '15 năm',
                notes: 'Kinh nghiệm lâu năm',
                scheduleMonFri: '07:30 - 17:30',
                scheduleSat: 'Nghỉ',
                scheduleSun: 'Nghỉ',
            },
        ]);
    }, []);

    const clearForm = () => {
        setDoctorName('');
        setDob('');
        setGender('Nam');
        setPhone('');
        setEmail('');
        setEducationLevel('');
        setTrainingSchool('');
        setGraduationYear('');
        setSpecialty('');
        setExperience('');
        setNotes('');
        setScheduleMonFri('');
        setScheduleSat('');
        setScheduleSun('');
        setCurrentEditIndex(null);
    };

    const addOrUpdateDoctor = (event) => {
        event.preventDefault();

        if (!doctorName || !phone || !specialty) {
            alert('Vui lòng điền đầy đủ Họ và tên, Điện thoại và Chuyên khoa.');
            return;
        }

        const newDoctor = {
            name: doctorName,
            dob,
            gender,
            phone,
            email,
            educationLevel,
            trainingSchool,
            graduationYear,
            specialty,
            experience,
            notes,
            scheduleMonFri,
            scheduleSat,
            scheduleSun,
        };

        if (currentEditIndex !== null) {
            const updatedDoctors = [...doctors];
            updatedDoctors[currentEditIndex] = newDoctor;
            setDoctors(updatedDoctors);
        } else {
            setDoctors([...doctors, newDoctor]);
        }
        clearForm();
    };

    const editDoctor = (index) => {
        const doctorToEdit = doctors[index];
        setDoctorName(doctorToEdit.name);
        setDob(doctorToEdit.dob);
        setGender(doctorToEdit.gender);
        setPhone(doctorToEdit.phone);
        setEmail(doctorToEdit.email);
        setEducationLevel(doctorToEdit.educationLevel);
        setTrainingSchool(doctorToEdit.trainingSchool);
        setGraduationYear(doctorToEdit.graduationYear);
        setSpecialty(doctorToEdit.specialty);
        setExperience(doctorToEdit.experience);
        setNotes(doctorToEdit.notes);
        setScheduleMonFri(doctorToEdit.scheduleMonFri);
        setScheduleSat(doctorToEdit.scheduleSat);
        setScheduleSun(doctorToEdit.scheduleSun);
        setCurrentEditIndex(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteDoctor = (index) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này?')) {
            const updatedDoctors = doctors.filter((_, i) => i !== index);
            setDoctors(updatedDoctors);
            if (index === currentEditIndex) {
                clearForm();
            }
        }
    };

    return (
        <>
            <nav className="doc-navbar">
                <div className="doc-navbar-left">
                    <span className="doc-nav-brand">HIV - MTSS</span>
                </div>
                <ul className="doc-nav-links">
                    <li><Link to="/manageuser">Hệ thống quản lý hồ sơ y tế</Link></li>
                    <li><Link to="/admin">Hệ thống quản lý</Link></li>
                </ul>
            </nav>

            <div className="doc-container">
                <main className="doc-main-content">
                    <div className="doc-doctor-info-container">
                        <div className="doc-main-title">HỆ THỐNG QUẢN LÝ THÔNG TIN BÁC SĨ</div>
                        <form id="docDoctorForm" onSubmit={addOrUpdateDoctor}>
                            <div className="doc-form-section">
                                <div className="doc-section-title">Thông tin chung</div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Họ tên:</label>
                                    <input className="doc-form-input" type="text" id="docDoctorName" placeholder="Nhập họ tên bác sĩ" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Ngày sinh:</label>
                                    <input className="doc-form-input" type="date" id="docDob" placeholder="mm/dd/yyyy" value={dob} onChange={(e) => setDob(e.target.value)} />
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Giới tính:</label>
                                    <select className="doc-form-select" id="docGender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">SĐT:</label>
                                    <input className="doc-form-input" type="tel" id="docPhone" placeholder="Nhập số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Email:</label>
                                    <input className="doc-form-input" type="email" id="docEmail" placeholder="Nhập Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="doc-form-section">
                                <div className="doc-section-title">Bằng cấp</div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Trình độ học vấn:</label>
                                    <input className="doc-form-input" type="text" id="docEducationLevel" placeholder="Ví dụ: Đại học, Thạc sĩ, Tiến sĩ" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} />
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Trường đào tạo:</label>
                                    <input className="doc-form-input" type="text" id="docTrainingSchool" placeholder="Nhập tên trường" value={trainingSchool} onChange={(e) => setTrainingSchool(e.target.value)} />
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Năm tốt nghiệp:</label>
                                    <input className="doc-form-input" type="text" id="docGraduationYear" placeholder="Nhập năm" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} />
                                </div>
                            </div>
                            <div className="doc-form-section">
                                <div className="doc-section-title">Chuyên môn</div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Chuyên khoa:</label>
                                    <input className="doc-form-input" type="text" id="docSpecialty" placeholder="Ví dụ: Truyền nhiễm, Tai - Mũi - Họng..." value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Kinh nghiệm:</label>
                                    <input className="doc-form-input" type="text" id="docExperience" placeholder="Nhập số năm" value={experience} onChange={(e) => setExperience(e.target.value)} />
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Ghi chú:</label>
                                    <input className="doc-form-input" type="text" id="docNotes" placeholder="Thông tin thêm (nếu có)" value={notes} onChange={(e) => setNotes(e.target.value)} />
                                </div>
                            </div>
                            <div className="doc-form-section">
                                <div className="doc-section-title">Lịch làm việc</div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Thứ 2 - Thứ 6:</label>
                                    <input className="doc-form-input" type="text" id="docScheduleMonFri" placeholder="07:00 - 17:00" value={scheduleMonFri} onChange={(e) => setScheduleMonFri(e.target.value)} />
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Thứ 7:</label>
                                    <input className="doc-form-input" type="text" id="docScheduleSat" placeholder="07:00 - 12:00" value={scheduleSat} onChange={(e) => setScheduleSat(e.target.value)} />
                                </div>
                                <div className="doc-form-row">
                                    <label className="doc-form-label">Chủ nhật:</label>
                                    <input className="doc-form-input" type="text" id="docScheduleSun" placeholder="Nghỉ / Làm việc" value={scheduleSun} onChange={(e) => setScheduleSun(e.target.value)} />
                                </div>
                            </div>
                            <div className="doc-action-buttons">
                                <button className="doc-btn doc-primary" type="submit" id="docSubmitDoctorBtn">
                                    {currentEditIndex !== null ? 'Cập nhật bác sĩ' : 'Thêm bác sĩ mới'}
                                </button>
                                <button className="doc-btn doc-secondary" type="button" id="docClearFormBtn" onClick={clearForm}>
                                    Xóa form
                                </button>
                            </div>
                        </form>

                        <div className="doc-doctor-list-section">
                            <h2>DANH SÁCH BÁC SĨ</h2>
                            <div className="doc-table-responsive">
                                <table className="doc-doctor-table" id="docDoctorTable">
                                    <thead>
                                        <tr>
                                            <th>Họ và tên</th>
                                            <th>Chuyên khoa</th>
                                            <th>Điện thoại</th>
                                            <th>Email</th>
                                            <th>Ngày sinh</th>
                                            <th>Giới tính</th>
                                            <th>Trình độ</th>
                                            <th>Trường đào tạo</th>
                                            <th>Năm tốt nghiệp</th>
                                            <th>Kinh nghiệm</th>
                                            <th>Ghi chú</th>
                                            <th>Lịch làm việc (T2-T6)</th>
                                            <th>Lịch làm việc (T7)</th>
                                            <th>Lịch làm việc (CN)</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctors.map((doctor, index) => (
                                            <tr key={index}>
                                                <td>{doctor.name}</td>
                                                <td>{doctor.specialty}</td>
                                                <td>{doctor.phone}</td>
                                                <td>{doctor.email}</td>
                                                <td>{doctor.dob}</td>
                                                <td>{doctor.gender}</td>
                                                <td>{doctor.educationLevel}</td>
                                                <td>{doctor.trainingSchool}</td>
                                                <td>{doctor.graduationYear}</td>
                                                <td>{doctor.experience}</td>
                                                <td>{doctor.notes}</td>
                                                <td>{doctor.scheduleMonFri}</td>
                                                <td>{doctor.scheduleSat}</td>
                                                <td>{doctor.scheduleSun}</td>
                                                <td>
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                                        <button className="doc-btn doc-primary doc-btn-small doc-edit-btn" onClick={() => editDoctor(index)}>Sửa</button>
                                                        <button className="doc-btn doc-secondary doc-btn-small doc-delete-btn" onClick={() => deleteDoctor(index)}>Xóa</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="doc-footer">
                <div className="doc-footer-container">
                    <div className="doc-footer-left">
                        <span className="doc-footer-logo">HIV - MTTS</span>
                    </div>
                    <div className="doc-footer-right">
                        <div className="doc-footer-links">
                            <a href="#" title="Facebook" className="doc-footer-icon"><span className="material-icons">facebook</span></a>
                            <a href="tel:0123456789" title="Điện thoại" className="doc-footer-icon"><span className="material-icons">call</span></a>
                            <a href="mailto:hivmtts@gmail.com.vn" title="Email" className="doc-footer-icon"><span className="material-icons">mail</span></a>
                            <a href="https://github.com/" title="GitHub" className="doc-footer-icon">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                        <div className="doc-footer-support">
                            Hỗ trợ: hivmtts@gmail.com.vn
                        </div>
                        <div className="doc-footer-copyright">
                            © 2025 Trung tâm điều trị HIV. Mọi quyền được bảo lưu.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Managedoctor;