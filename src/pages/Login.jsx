import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { config } from "../configs/api.config";
import { loginUser } from "../redux/slices/user.slices";

export const Login = () => {
  const { login } = config.endpoints;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user !== null && user.role === "admin") {
      toast.success("welcome admin !");
      setTimeout(() => {
        navigate("/dashbord/user-table");
      }, 1000);
    } else if (user) {
      toast.error("You are not a Admin !");
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
            email: res.data.data.email,
            name: res.data.data.firstName + " " + res.data.data.lastName,
            role: res.data.data.role,
          })
        );
      },
      error: (errors) => `${errors?.response?.data?.message}`,
    });
  };

  return (
    <>
      <Toaster />
      <div className="h-screen w-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#377eca] via-[#6557df] to-[#10131C]">
        <div className="backdrop-blur-3xl bg-opacity-30 p-10  w-screen h-screen flex justify-center ">
          <div className="flex  justify-center items-center">
            <div className="bg-white border-2 border-indigo-400 rounded-md shadow-md p-7 sm:p-10">
              <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                FGI-Y2J Admin Panel
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-1 sm:mb-2">
                  <label
                    htmlFor="name"
                    className="inline-block mb-1 font-medium"
                  >
                    E-mail
                  </label>
                  <input
                    placeholder="user@email.com"
                    required
                    type="text"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    {...register("email", {})}
                  />
                </div>
                <div className="mb-1 sm:mb-2">
                  <label
                    htmlFor="password"
                    className="inline-block mb-1 font-medium"
                  >
                    Password
                  </label>
                  <input
                    placeholder="**************"
                    required
                    type="password"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    {...register("password", {})}
                  />
                </div>
                <div className="mt-4 mb-2 sm:mb-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white bg-indigo-600 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
