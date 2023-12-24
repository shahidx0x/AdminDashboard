import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { config } from "../configs/api.config";
import { loginUser } from "../redux/slices/user.slices";

export default function Login() {
  const { login } = config.endpoints;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      if (user.role === "admin" || user.role === "super-admin") {
       
        toast.success("welcome admin !");
        setTimeout(() => {
          navigate("/dashbord/status");
        }, 1000);
      } else {
        toast.error("You are not an Admin !");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    toast.promise(axios.post(login, data), {
      loading: "please wait ...",
      success: (res) => {
        dispatch(
          loginUser({
            jwt: res.data.jwt,
            email: res.data?.data?.email,
            name: res.data?.data?.firstName + " " + res.data?.data?.lastName,
            role: res.data?.data?.role,
          })
        );
      },
      error: (errors) => `${errors?.response?.data?.message}`,
    });
  };

  return (
    <>
      <Toaster />

      <div className=" h-screen">
        <img
          src="https://e0.pxfuel.com/wallpapers/120/1024/desktop-wallpaper-fast-food-junk-food.jpg"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-gray-900 bg-opacity-75">
          <div>
            <div className="flex flex-col justify-center h-screen items-center xl:flex-row">
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    FGY-Y2J ADMIN DASHBORD
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="firstName"
                        className="inline-block mb-1 font-bold"
                      >
                        Email
                      </label>
                      <input
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        {...register("email", {})}
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="lastName"
                        className="inline-block mb-1 font-bold"
                      >
                        Password
                      </label>
                      <input
                        required
                        type="password"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        {...register("password", {})}
                      />
                    </div>

                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex bg-indigo-600 items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
