import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import RegistrationForm from './components/RegistrationForm';
import MyModal from './components/MyModal';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './App.css';

function AppContent() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const navigate = useNavigate();

  const handleRegistrationSuccess = (userData) => {
    setRegisteredUser(userData);
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/posts');
  };

  const handleCancel = () => {
    navigate('/posts');
  };

  return (
    <>
      {/* Navbar luôn hiển thị ở mọi trang (trừ trang đăng ký) */}
      <Routes>
        <Route path='/' element={null} />
        <Route path='*' element={<AppNavbar />} />
      </Routes>

      {/* Định nghĩa các route */}
      <Routes>
        <Route 
          path='/' 
          element={<RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} onCancel={handleCancel} />} 
        />
        <Route path='/posts'     element={<PostList />} />
        <Route path='/posts/:id' element={<PostDetail />} />
        <Route path='/about'     element={<About />} />
        <Route path='*'          element={<NotFound />} />
      </Routes>

      {/* Modal đăng ký thành công */}
      <MyModal
        show={showSuccessModal}
        onClose={handleModalClose}
        title="Đăng Ký Thành Công"
        body={`Chào mừng ${registeredUser?.username}! Tài khoản của bạn đã được tạo thành công.`}
        confirmButtonText="Tiếp tục"
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;