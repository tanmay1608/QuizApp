import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">503</h1>
        <p>Something, went wrong please try again later!!</p>
        <Link to="/">Go back to Home</Link>
      </div>
    </div>
  );
};

export default Error;
