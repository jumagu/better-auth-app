import { AuthCard, AuthLink } from '../components/auth-card';
import { LoginForm } from './login-form';

export const metadata = {
  title: 'Sign in',
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign in"
      description="Enter your email and password to access your account."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <AuthLink href="/auth/register" label="Sign up" />
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
