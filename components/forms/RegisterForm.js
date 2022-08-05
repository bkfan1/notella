import Link from "next/link";
import { useForm } from "react-hook-form";
import { email } from "../../utils/regex";
import ErrorFormFieldMessage from "../ErrorFormFieldMessage";
import axios from "axios";
import { useRouter } from "next/router";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await axios.post("/api/register", data);
    res.status === 200
      ? router.push("/login")
      : console.warn("something went wrong");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-72 ease-in-out duration-100 p-4 gap-4 border-2 rounded bg-white"
      >
        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            <input
              type="email"
              placeholder="user@user.com"
              className="formInput"
              {...register("email", { required: true, pattern: email })}
            />
            {errors.email && (
              <ErrorFormFieldMessage message={"Type a valid email address"} />
            )}
          </label>
          <label className="flex flex-col">
            <input
              type="password"
              placeholder="Password"
              className="formInput"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <ErrorFormFieldMessage
                message={"Password must be 8 characters long"}
              />
            )}
          </label>
        </div>

        <menu className="flex flex-col gap-4">
          <button className="bg-blue-500 py-2 text-white hover:opacity-90">
            Register
          </button>
          <Link href="/login">
            <a className="text-sm text-sky-700">Log In</a>
          </Link>
        </menu>
      </form>
    </>
  );
}
