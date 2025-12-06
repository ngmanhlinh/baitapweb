import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const studentApi = {
  getAll: () => axios.get(API_URL),
  create: (data) => axios.post(API_URL, data),
  update: (id, data) => axios.put(`${API_URL}/${id}`, data),
  remove: (id) => axios.delete(`${API_URL}/${id}`),
};

export default studentApi;