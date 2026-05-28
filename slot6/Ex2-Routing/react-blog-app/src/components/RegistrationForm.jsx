import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const RegistrationForm = ({ onRegistrationSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  // Kiểm tra email đúng định dạng
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Kiểm tra password có đủ yêu cầu
  const isValidPassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const isLengthValid = password.length >= 6;

    return {
      isValid: hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isLengthValid,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      isLengthValid
    };
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Xóa lỗi khi người dùng thay đổi giá trị
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validation form
  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra username
    if (!formData.username.trim()) {
      newErrors.username = 'Username không được để trống';
    }

    // Kiểm tra email
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email không đúng định dạng';
    }

    // Kiểm tra password
    if (!formData.password) {
      newErrors.password = 'Password không được để trống';
    } else {
      const passwordValidation = isValidPassword(formData.password);
      if (!passwordValidation.isValid) {
        const missingRequirements = [];
        if (!passwordValidation.hasUppercase) missingRequirements.push('chữ hoa');
        if (!passwordValidation.hasLowercase) missingRequirements.push('chữ thường');
        if (!passwordValidation.hasNumber) missingRequirements.push('số');
        if (!passwordValidation.hasSpecialChar) missingRequirements.push('ký tự đặc biệt');
        if (!passwordValidation.isLengthValid) missingRequirements.push('ít nhất 6 ký tự');

        newErrors.password = `Password phải chứa: ${missingRequirements.join(', ')}`;
      }
    }

    // Kiểm tra confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password không được để trống';
    } else if (formData.password !== formData.confirmPassword) {
newErrors.confirmPassword = 'Confirm password không khớp với password';
    }

    return newErrors;
  };

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Validation passed
      setValidated(true);
      onRegistrationSuccess(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="border p-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <h2 className="mb-4 text-center">Đăng Ký Tài Khoản</h2>

            <Form onSubmit={handleSubmit}>
              {/* Username */}
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                  placeholder="Nhập username"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  placeholder="Nhập email"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  placeholder="Nhập password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <small className="text-muted d-block mt-2">
                  Password phải chứa: chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 6 ký tự
                </small>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                  placeholder="Nhập lại password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Buttons */}
              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" className="flex-grow-1">
                  Register
                </Button>
                <Button variant="secondary" onClick={onCancel} className="flex-grow-1">
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;