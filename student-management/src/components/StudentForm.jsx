import React from 'react';

const StudentForm = ({ 
  onSubmit, editingId, resetForm, 
  name, setName, age, setAge, stuClass, setClass 
}) => {
  return (
    <div className="form-card">
      <h3 className="form-title">
        {editingId ? "Cập Nhật Thông Tin" : "Thêm Học Sinh Mới"}
      </h3>
      
      <form onSubmit={onSubmit} className="form-row">
        <input 
          className="form-input"
          type="text" placeholder="Họ tên" required 
          value={name} onChange={e => setName(e.target.value)} 
        />
        <input 
          className="form-input"
          type="number" 
          placeholder="Tuổi" 
          required 
          min="1"  
          value={age} 
          onChange={e => setAge(e.target.value)} 
          onKeyDown={(e) => ["-", "+", "e", "E"].includes(e.key) && e.preventDefault()}
          style={{ maxWidth: "100px" }} 
        />
        <input 
          className="form-input"
          type="text" placeholder="Lớp" required 
          value={stuClass} onChange={e => setClass(e.target.value)} 
          style={{ maxWidth: "150px" }}
        />
        
        <button type="submit" className="btn btn-primary">
          {editingId ? "Lưu lại" : "Thêm"}
        </button>
        
        {editingId && (
          <button type="button" onClick={resetForm} className="btn btn-secondary">
            Hủy
          </button>
        )}
      </form>
    </div>
  );
};

export default StudentForm;