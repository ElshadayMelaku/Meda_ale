import LoginForm from '@/src/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-center mb-4 text-2xl font-semibold ">Sign in</h1>
        <div className="bg-card p-6 rounded-lg shadow-lg ">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
