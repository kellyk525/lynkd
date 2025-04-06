import SignUpForm from "../../components/auth/SignUpForm";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center sm:px-6 lg:px-8 py-12 lg:py-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-36 w-auto" src="/logo.svg" alt="LinkedIn" />
      </div>
      <div className="card py-8 px-4 sm:px-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-lg font-bold text-neutral mb-8">
          Make the most of your professional life
        </h2>
        <SignUpForm />
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Already on LinkedIn?
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 rounded-lg bg-base-200 hover:bg-base-300 text-sm font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
