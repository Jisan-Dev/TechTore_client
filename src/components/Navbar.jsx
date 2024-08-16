import { useContext } from 'react';
import { Button } from './ui/button';
import { AuthContext } from '@/providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success('Logged Out Successfully');
    } catch (error) {
      console.log(error);
      toast.error(error.code || error.message);
    }
  };

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <a className="block text-neutral-800" href="#">
                <span className="sr-only">Home</span>
                <h1 className="text-2xl font-bold">TechTore</h1>
              </a>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      About
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      {' '}
                      Careers{' '}
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      {' '}
                      History{' '}
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      {' '}
                      Services{' '}
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      {' '}
                      Projects{' '}
                    </a>
                  </li>

                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#">
                      {' '}
                      Blog{' '}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {user ? (
                  <>
                    <Avatar>
                      <AvatarImage src={user?.photoURL} referrerPolicy="no-referrer" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button variant="destructive" onClick={handleLogOut}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to={'/login'}>
                      <Button>Login</Button>
                    </Link>

                    <div className="hidden sm:flex">
                      <Link to={'/register'}>
                        <Button variant="outline">Register</Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
