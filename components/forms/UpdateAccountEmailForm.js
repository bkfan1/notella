import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ResponseContext } from "../../context/ResponseContext";

import axios from "axios";
import { email } from "../../utils/regex";

import ErrorFormFieldMessage from "../ErrorFormFieldMessage";


export default function UpdateAccountEmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {setCode, setMessage, extractCode, extractMessage} = useContext(ResponseContext); 

  const onSubmit = async (data) => {
    try {
      const res = await axios.put("/api/account/email", data);
      setCode(res.status);
      setMessage(res.data.message);
      
    } catch (error) {
      const {response} = error;
      const code = extractCode(response);
      const message = extractMessage(response);
      setCode(code);
      setMessage(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            <input
              type="email"
              placeholder="New email"
              className="formInput"
              {...register("newEmail", {
                required: { value: true, message: "This field is required." },
                pattern: { value: email, message: "Type a valid email." },
              })}
            />
            {errors.newEmail && (
              <ErrorFormFieldMessage message={errors.newEmail.message} />
            )}
          </label>

          <label className="flex flex-col">
            <input
              type="email"
              placeholder="Confirm new email"
              className="formInput"
              {...register("confirmNewEmail", {
                required: { value: true, message: "This field is required." },
                pattern: { value: email, message: "Type a valid email." },
              })}
            />
            {errors.confirmNewEmail && (
              <ErrorFormFieldMessage message={errors.confirmNewEmail.message} />
            )}
          </label>

          <button className="w-full mt-2 py-2 text-white bg-blue-500 hover:opacity-80 ">
            Update
          </button>
        </div>
      </form>
    </>
  );
}
