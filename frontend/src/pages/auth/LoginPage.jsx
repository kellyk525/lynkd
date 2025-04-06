import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center py-12 lg:py-0 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-40 w-auto" src="/logo.svg" alt="LinkedIn" />
      </div>
      <div className="card py-8 px-4 sm:px-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-xl font-bold text-neutral mb-8">
          Sign in to your account
        </h2>
        <LoginForm />
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                New to LinkedIn?
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/signup"
              className="w-full flex justify-center py-2 px-4 rounded-lg bg-base-200 hover:bg-base-300 text-sm font-medium"
            >
              Join now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
