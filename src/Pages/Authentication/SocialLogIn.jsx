import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";

const SocialLogIn = () => {
  const { signInGoogle } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoogle = () => {
    signInGoogle()
      .then(async (result) => {
        const user = result.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);
        navigate(location.state ? location.state : "/");
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogle}
        aria-label="Login with Google"
        type="button"
        className="flex items-center justify-center w-full p-4 space-x-4 rounded-md focus:ring-2 focus:ring-offset-1 hover:bg-primary text-primary-content border-2 border-primary bg-white  hover:border hover:text-primary-content hover:cursor-pointer font-bold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 fill-current"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        <p>Login with Google</p>
      </button>
    </div>
  );
};

export default SocialLogIn;
