
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LockKeyhole, Mail, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);
  const navigate = useNavigate();

  // Check for existing login session
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('naijaHubAdminAuth') === 'true';
    const authTimestamp = localStorage.getItem('naijaHubAuthTimestamp');
    
    if (isAuthenticated && authTimestamp) {
      const currentTime = new Date().getTime();
      const authTime = parseInt(authTimestamp);
      
      // Session valid for 24 hours
      if (currentTime - authTime < 24 * 60 * 60 * 1000) {
        navigate('/admin/dashboard');
      } else {
        // Clear expired session
        localStorage.removeItem('naijaHubAdminAuth');
        localStorage.removeItem('naijaHubAuthTimestamp');
      }
    }
    
    // Check for previous login attempts
    const attempts = localStorage.getItem('loginAttempts');
    const attemptTime = localStorage.getItem('lastAttemptTime');
    
    if (attempts) {
      setLoginAttempts(parseInt(attempts));
    }
    
    if (attemptTime) {
      setLastAttemptTime(parseInt(attemptTime));
    }
  }, [navigate]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check if user is locked out
    if (loginAttempts >= 5 && lastAttemptTime) {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - lastAttemptTime;
      
      // Lockout for 15 minutes (900000 ms)
      if (timeDiff < 900000) {
        const remainingMinutes = Math.ceil((900000 - timeDiff) / 60000);
        setError(`Too many failed attempts. Please try again in ${remainingMinutes} minutes.`);
        return;
      } else {
        // Reset attempts after lockout period
        setLoginAttempts(0);
        localStorage.setItem('loginAttempts', '0');
      }
    }
    
    setIsLoading(true);

    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // This is a mock login - in a real app, you would validate against a backend
    setTimeout(() => {
      // For demo purposes, let's use a simple check
      // In a real app, you would use a proper authentication system
      if (email === 'admin@naijahub.com' && password === 'password123') {
        toast({
          title: 'Login successful',
          description: 'Welcome back to Naija How-To Hub!',
          duration: 3000,
        });
        
        // Store auth state and timestamp in localStorage
        const currentTime = new Date().getTime();
        localStorage.setItem('naijaHubAdminAuth', 'true');
        localStorage.setItem('naijaHubAuthTimestamp', currentTime.toString());
        
        // Reset login attempts
        setLoginAttempts(0);
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lastAttemptTime');
        
        // Redirect to dashboard
        navigate('/admin/dashboard');
      } else {
        // Increment failed login attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        const currentTime = new Date().getTime();
        setLastAttemptTime(currentTime);
        
        localStorage.setItem('loginAttempts', newAttempts.toString());
        localStorage.setItem('lastAttemptTime', currentTime.toString());
        
        setError('Invalid email or password');
        toast({
          title: 'Login failed',
          description: 'Please check your credentials and try again',
          variant: 'destructive',
          duration: 3000,
        });
        
        // Show lockout warning
        if (newAttempts >= 3 && newAttempts < 5) {
          toast({
            title: 'Warning',
            description: `You have ${5 - newAttempts} attempts remaining before your account is temporarily locked`,
            variant: 'destructive',
            duration: 5000,
          });
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold font-heading text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Oya, enter your password and let's get this work!
          </p>
          <p className="mt-1 text-xs text-gray-500">
            For demo: admin@naijahub.com / password123
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="admin@naijahub.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKeyhole className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-naija-green focus:ring-naija-green border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-naija-green hover:text-naija-green/80">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-naija-green hover:bg-naija-green/90 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Sign in to Admin'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  For admin users only
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a href="/" className="font-medium text-sm text-naija-green hover:text-naija-green/80">
                Return to Home Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
