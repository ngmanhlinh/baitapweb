import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="student-table">
        <thead>
          <tr>
            <th>Họ Tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th style={{ width: "160px" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-message">
                Không tìm thấy dữ liệu nào phù hợp.
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s._id}>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td>{s.age}</td>
                <td>
                  <span style={{ 
                    background: "#e7f5ff", color: "#1c7ed6", 
                    padding: "4px 8px", borderRadius: "4px", fontSize: "0.9em", fontWeight: "bold"
                  }}>
                    {s.class}
                  </span>
                </td>
                <td>
                  <button onClick={() => onEdit(s)} className="btn btn-edit">
                    Sửa
                  </button>
                  <button onClick={() => onDelete(s._id)} className="btn btn-delete">
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;