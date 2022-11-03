import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ResponseContext } from "../../context/ResponseContext";

import axios from "axios";
import { email } from "../../utils/regex";
import ErrorFormFieldMessage from "../ErrorFormFieldMessage";

export default function LoginForm({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setCode, setMessage, extractCode, extractMessage } =
    useContext(ResponseContext);

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/login", data);

      setCode(res.status);
      setMessage(res.data.message);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      const { response } = error;
      const status = extractCode(response);
      const message = extractMessage(response);

      setCode(status);
      setMessage(message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col w-72 ease-in-out duration-100 p-4 gap-4"
      >
        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="formInput"
              {...register("email", {
                required: { value: true, message: "This field is required." },
                pattern: { value: email, message: "Type a valid email." },
              })}
            />
            {errors.email && (
              <ErrorFormFieldMessage message={errors.email.message} />
            )}
          </label>
          <label className="flex flex-col">
            <input
              type="password"
              placeholder="Password"
              className="formInput"
              {...register("password", {
                required: { value: true, message: "This field is required." },
                minLength: {
                  value: 8,
                  message: "Password needs to be at least 8 characters long.",
                },
              })}
            />
            {errors.password && (
              <ErrorFormFieldMessage message={errors.password.message} />
            )}
          </label>
        </div>

        <menu className="flex flex-col gap-4">
          <button className="bg-blue-500 py-2 text-white hover:opacity-90">
            Log In
          </button>
        </menu>
      </form>
    </>
  );
}
