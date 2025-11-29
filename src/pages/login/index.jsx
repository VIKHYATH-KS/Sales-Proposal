import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import SocialLogin from './components/SocialLogin';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Login - Sales Proposal Generator</title>
        <meta name="description" content="Sign in to your Sales Proposal Generator account to create and manage professional sales proposals with AI-powered automation." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <header className="w-full border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center gap-3 text-foreground no-underline w-fit">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="FileText" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Sales Proposal Generator</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
            <div className="bg-card rounded-lg border border-border shadow-soft p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon name="LogIn" size={32} color="var(--color-primary)" />
                </div>
                <h1 className="text-2xl font-semibold text-foreground mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground">
                  Sign in to your account to continue
                </p>
              </div>

              <LoginForm />

              <div className="mt-6">
                <SocialLogin />
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              <TrustSignals />
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                By signing in, you agree to our{' '}
                <a href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </main>

        <footer className="w-full border-t border-border bg-card py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Sales Proposal Generator. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
                <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Support
                </a>
                <a href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  System Status
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;