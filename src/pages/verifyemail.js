// VerifyEmailPage.js
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        navigate('/signup');
        return;
      }

      try {
        const response = await axios.get(`/api/auth/verify?token=${token}`);
        
        if (response.data.success) {
          // ✅ Show success message
          alert('✅ Email verified successfully!');
          
          // ✅ Redirect to LOGIN page with pre-filled email
          setTimeout(() => {
            navigate('/login', { 
              state: { 
                email: response.data.user.email,
                message: 'Email verified! Please login.'
              } 
            });
          }, 2000);
        }
      } catch (error) {
        console.error('Verification failed:', error);
        alert('❌ Verification failed. Please try signing up again.');
        navigate('/signup');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}