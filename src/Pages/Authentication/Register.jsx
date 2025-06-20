import { Link } from "react-router";
import RapidParcelLogo from "../Shared/RapidParcelLogo.jsx/RapidParcelLogo";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitData = (data) => {
    console.log(data);
  };
  return (
    <div className="p-12">
      <RapidParcelLogo></RapidParcelLogo>
      <div className="max-w-lg mx-auto card backGround w-full shrink-0 mt-16">
        <div className="card-body">
          <h1 className="text-4xl font-bold">Create an Account</h1>
          <p>Register with RapidParcel</p>
          <form
            onSubmit={handleSubmit(onSubmitData)}
            className="fieldset space-y-1"
          >
            {/* Name */}
            <label className="label text-lg font-medium">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input w-full"
              placeholder="Your Full Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Please enter your Full name</p>
            )}
            {/* email */}
            <label className="label text-lg font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Please enter your email</p>
            )}
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

            {/* login button */}

            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </form>
          <div className="flex items-center w-full my-4">
            <hr className="w-full border-t-2 border-primary my-4" />
            <p className="px-3 ">OR</p>
            <hr className="w-full border-t-2 border-primary my-4" />
          </div>
          <div className="space-y-4">
            <button
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
            <p className="text-sm text-center font-medium">
              Already have account?
              <Link
                to="/Login"
                state={location.state}
                rel="noopener noreferrer"
                className="focus:underline hover:underline text-primary-content"
              >
                LogIn here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
