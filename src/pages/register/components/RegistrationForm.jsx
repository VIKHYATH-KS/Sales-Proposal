import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    role: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roleOptions = [
    "Sales Manager",
    "Business Development",
    "Account Manager",
    "Consultant",
    "Freelancer",
    "Project Manager",
    "Marketing Manager",
    "Business Owner",
    "Other"
  ];

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return { score: 0, label: '', color: '' };

    if (password?.length >= 8) score++;
    if (password?.length >= 12) score++;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) score++;
    if (/\d/?.test(password)) score++;
    if (/[^a-zA-Z0-9]/?.test(password)) score++;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-red-500' },
      1: { label: 'Weak', color: 'bg-orange-500' },
      2: { label: 'Fair', color: 'bg-yellow-500' },
      3: { label: 'Good', color: 'bg-blue-500' },
      4: { label: 'Strong', color: 'bg-green-500' },
      5: { label: 'Very Strong', color: 'bg-green-600' }
    };

    return { score, ...strengthMap?.[score] };
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value?.trim()) error = 'Full name is required';
        else if (value?.trim()?.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value?.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value?.length < 8) error = 'Password must be at least 8 characters';
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password';
        else if (value !== formData?.password) error = 'Passwords do not match';
        break;
      case 'companyName':
        if (!value?.trim()) error = 'Company name is required';
        break;
      case 'role':
        if (!value) error = 'Please select your role';
        break;
      case 'agreeToTerms':
        if (!value) error = 'You must agree to the terms of service';
        break;
      case 'agreeToPrivacy':
        if (!value) error = 'You must agree to the privacy policy';
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
      if (formData?.confirmPassword) {
        const confirmError = validateField('confirmPassword', formData?.confirmPassword);
        setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    }

    if (name === 'confirmPassword' && formData?.password) {
      let error = value !== formData?.password ? 'Passwords do not match' : '';
      setErrors(prev => ({ ...prev, confirmPassword: error }));
      return;
    }

    let error = validateField(name, fieldValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData)?.forEach(key => {
      let error = validateField(key, formData?.[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="John Doe"
        value={formData?.fullName}
        onChange={handleChange}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="john.doe@company.com"
        value={formData?.email}
        onChange={handleChange}
        error={errors?.email}
        description="We'll use this for account verification"
        required
      />
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Password Strength:</span>
              <span className={`font-medium ${
                passwordStrength?.score <= 2 ? 'text-red-500' : 
                passwordStrength?.score === 3 ? 'text-blue-500': 'text-green-500'
              }`}>
                {passwordStrength?.label}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${passwordStrength?.color}`}
                style={{ width: `${(passwordStrength?.score / 5) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Use 8+ characters with uppercase, lowercase, numbers, and symbols
            </p>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={handleChange}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>
      <Input
        label="Company Name"
        type="text"
        name="companyName"
        placeholder="Your Company Inc."
        value={formData?.companyName}
        onChange={handleChange}
        error={errors?.companyName}
        required
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Role <span className="text-red-500">*</span>
        </label>
        <select
          name="role"
          value={formData?.role}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-background border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors?.role ? 'border-red-500' : 'border-input'
          }`}
          required
        >
          <option value="">Select your role</option>
          {roleOptions?.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        {errors?.role && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {errors?.role}
          </p>
        )}
      </div>
      <div className="space-y-3 pt-2">
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button type="button" className="text-primary hover:underline">
                Terms of Service
              </button>
            </span>
          }
          name="agreeToTerms"
          checked={formData?.agreeToTerms}
          onChange={handleChange}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button type="button" className="text-primary hover:underline">
                Privacy Policy
              </button>
            </span>
          }
          name="agreeToPrivacy"
          checked={formData?.agreeToPrivacy}
          onChange={handleChange}
          error={errors?.agreeToPrivacy}
          required
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-primary font-medium hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;