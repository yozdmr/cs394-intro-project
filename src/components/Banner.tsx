import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

const Banner = () => {
  const { user, isAuthenticated, isInitialLoading } = useAuthState();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-purple-700 text-white">
      <span className="text-xl font-bold">CS Courses</span>
      {!isInitialLoading && (
        <div className="flex items-center gap-3">
          <span className="text-sm">
            {isAuthenticated ? `Welcome, ${user?.displayName}!` : 'Welcome, guest!'}
          </span>
          {isAuthenticated ? (
            <button
              onClick={signOut}
              className="px-3 py-1 bg-white text-purple-700 rounded text-sm font-medium hover:bg-purple-100"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="px-3 py-1 bg-white text-purple-700 rounded text-sm font-medium hover:bg-purple-100"
            >
              Sign in
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Banner;
