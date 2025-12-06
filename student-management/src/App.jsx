import './App.css';
import HomePage from './pages/HomePage'; // Import trang HomePage

function App() {
  return (
    <div className="app-container">
      {/* Sau này nếu có thêm Router (Login, About...), chúng ta sẽ cấu hình ở đây */}
      <HomePage />
    </div>
  );
}

export default App;