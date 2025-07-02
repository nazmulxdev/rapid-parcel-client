import { Link, useLocation, useNavigate } from "react-router";
import RapidParcelLogo from "../Shared/RapidParcelLogo.jsx/RapidParcelLogo";
import { useForm } from "react-hook-form";
import SocialLogIn from "./SocialLogIn";
import LoadingSpinner from "../Shared/Utilities/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";
const LogIn = () => {
  const { signInEmail, setCurrentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitData = (data) => {
    console.log(data);
    signInEmail(data.email, data.password)
      .then((res) => {
        console.log(res);
        setCurrentUser(data.user);
        navigate(from ? from : "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-12">
      <RapidParcelLogo></RapidParcelLogo>
      <div className="max-w-lg mx-auto card backGround w-full shrink-0 mt-16">
        <div className="card-body">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p>Login with RapidParcel</p>
          <form
            onSubmit={handleSubmit(onSubmitData)}
            className="fieldset space-y-1"
          >
            {/* email */}
            <label className="label text-lg font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              className="input w-full"
              placeholder="Email"
            />
            {/* password */}

            <label className="label text-lg font-medium">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password length must be 6 characters or longer.
              </p>
            )}
            {/* forget password */}

            <div className="text-end">
              <Link
                rel="noopener noreferrer"
                className="text-xs hover:underline font-medium text-black"
              >
                Forgot password?
              </Link>
            </div>
            {/* login button */}

            <button type="submit" className="btn btn-primary mt-4">
              Login
            </button>
          </form>
          <div className="flex items-center w-full my-4">
            <hr className="w-full border-t-2 border-primary my-4" />
            <p className="px-3 ">OR</p>
            <hr className="w-full border-t-2 border-primary my-4" />
          </div>
          <div>
            <SocialLogIn></SocialLogIn>
            <p className="text-sm text-center font-medium mt-4">
              Don't have account?
              <Link
                to="/register"
                state={location.state}
                rel="noopener noreferrer"
                className="focus:underline hover:underline text-primary-content"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
