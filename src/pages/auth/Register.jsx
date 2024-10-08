import useAuth from '@/hooks/useAuth';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const { loading, signInWithGoogle, createUser, setLoading, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log('googleSignedInUser=>', result);
      toast.success('Registered Successfully');
      navigate('/');
    } catch (error) {
      setLoading(false);
      toast.error(error.code || error.message);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    try {
      setLoading(true);

      // user registration
      const result = await createUser(formData.email, formData.password);
      console.log('manualSignedUpUser=>', result);

      // Save username and photo in firebase
      await updateUserProfile(formData.name, formData.image);
      toast.success('Registered Successfully');
      navigate('/');
    } catch (error) {
      setLoading(false);
      toast.error(error.code || error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to TechTore</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-neutral-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Image URL:
              </label>
              <input
                required
                type="text"
                id="image"
                name="image"
                placeholder="Enter Image URL Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-neutral-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-neutral-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-neutral-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-neutral-900 hover:bg-neutral-50 hover:text-neutral-950 border border-neutral-900 transition w-full rounded-md py-3 text-white font-medium">
              {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : 'Continue'}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">Register with social accounts</p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button disabled={loading} onClick={handleGoogleSignIn} className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline hover:text-neutral-500 text-gray-600">
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
