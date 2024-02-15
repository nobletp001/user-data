const UserData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-pulse">
      <div className="max-w-xl w-full flex flex-col justify-center items-center bg-white shadow-md rounded-lg overflow-hidden ">
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Thanks for visiting Growth-App Website!</h2>
          <p className="text-gray-600 mb-4">Your user information has been collected successfully.</p>
          <p className="text-gray-600 mb-4 text-center">Contact me for more information.</p>
        </div>
      </div>
    </div>
  );
};

export default UserData;
