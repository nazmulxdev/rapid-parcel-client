import { Link, useLocation, useNavigate } from "react-router";
import RapidParcelLogo from "../Shared/RapidParcelLogo.jsx/RapidParcelLogo";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import SocialLogIn from "./SocialLogIn";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitData = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (user) => {
        console.log(user.user);
        // update info in the database

        const userInfo = {
          name: data.name,
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        // update user profile in the firebase
        updateUserProfile({ displayName: data.name, photoURL: profilePic })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registration Successful",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate(location?.state ? location.state : "/");
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEBB_KEY
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
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
            {/* profile pic */}
            <label className="label text-lg font-medium">Profile Picture</label>
            <input
              {...register("imageUrl", { required: true })}
              type="file"
              onChange={handleImageUpload}
              className="input w-full"
              placeholder="Your Profile Picture"
            />
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
          <div>
            <SocialLogIn></SocialLogIn>
            <p className="text-sm text-center font-medium mt-4">
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
