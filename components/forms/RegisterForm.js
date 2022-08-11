import { useContext} from "react";
import { useForm } from "react-hook-form";
import { ResponseContext } from "../../context/ResponseContext";

import Link from "next/link";
import axios from "axios";
import { email } from "../../utils/regex";
import ErrorFormFieldMessage from "../ErrorFormFieldMessage";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {setCode, setMessage, extractCode, extractMessage} = useContext(ResponseContext);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/register", data);

      setCode(res.status);
      setMessage(res.data.message);
      
    } catch (error) {
      const {response} = error;
      const status = extractCode(response)
      const message = extractMessage(response);

      setCode(status)
      setMessage(message);
    
    }

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
              {...register("email", { required: {value:true, message:'This field is required.'}, pattern: {value:email, message:'Type a valid email.'} })}
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
              {...register("password", { required: {value:true, message:'This field is required.'}, minLength: {value:8, message:'Password needs to be at least 8 characters long.'} })}
            />
            {errors.password && (
              <ErrorFormFieldMessage
                message={errors.password.message}
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
