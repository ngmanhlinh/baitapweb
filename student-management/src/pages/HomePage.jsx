import React, { useState, useEffect } from 'react';
import studentApi from '../api/studentApi';
import StudentForm from '../components/StudentForm';
import SearchBar from '../components/SearchBar';
import StudentList from '../components/StudentList';

const HomePage = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setClass] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await studentApi.getAll();
      setStudents(res.data);
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = { name, age: Number(age), class: stuClass };
    try {
      if (editingId) {
        const res = await studentApi.update(editingId, studentData);
        setStudents(students.map(s => s._id === editingId ? res.data : s));
      } else {
        const res = await studentApi.create(studentData);
        setStudents([...students, res.data]);
      }
      resetForm();
    } catch (err) {
      console.error("Lỗi lưu:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa học sinh này không?")) {
      try {
        await studentApi.remove(id);
        setStudents(students.filter(s => s._id !== id));
      } catch (err) {
        console.error("Lỗi xóa:", err);
      }
    }
  };

  const startEditing = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setClass(student.class);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setAge("");
    setClass("");
  };

  // === 1. Hàm xóa dấu tiếng Việt (MỚI) ===
  const removeAccents = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  };

  // === 2. Áp dụng vào bộ lọc (SỬA LẠI) ===
  const filteredStudents = students.filter(student => {
    const nameNoAccents = removeAccents(student.name.toLowerCase());
    const searchNoAccents = removeAccents(searchTerm.toLowerCase());
    return nameNoAccents.includes(searchNoAccents);
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = removeAccents(a.name.toLowerCase()); // Sắp xếp cũng nên bỏ dấu cho chuẩn
    const nameB = removeAccents(b.name.toLowerCase());
    return sortAsc 
      ? (nameA < nameB ? -1 : (nameA > nameB ? 1 : 0))
      : (nameA > nameB ? -1 : (nameA < nameB ? 1 : 0));
  });

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Quản Lý Học Sinh</h1>
      
      <StudentForm 
        onSubmit={handleSubmit}
        editingId={editingId}
        resetForm={resetForm}
        name={name} setName={setName}
        age={age} setAge={setAge}
        stuClass={stuClass} setClass={setClass}
      />

      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
      />

      <StudentList 
        students={sortedStudents}
        onEdit={startEditing}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default HomePage;