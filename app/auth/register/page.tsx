import { AuthCard, AuthLink } from '../components/auth-card';
import { RegisterForm } from './register-form';

export const metadata = {
  title: 'Create account',
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create account"
      description="Fill in your details to sign up."
      footer={
        <>
          Already have an account?{' '}
          <AuthLink href="/auth/login" label="Sign in" />
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
