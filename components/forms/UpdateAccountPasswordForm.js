import {useContext} from "react";
import { useForm } from "react-hook-form";
import { ResponseContext } from "../../context/ResponseContext";

import axios from "axios";
import ErrorFormFieldMessage from "../ErrorFormFieldMessage";

export default function UpdateAccountPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {setCode, setMessage, extractCode, extractMessage} = useContext(ResponseContext); 

  const onSubmit = async (data) => {
    try {
      const res = await axios.put("/api/account/password", data);
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
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xs">
        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            <input
              type="password"
              placeholder="Current password"
              className="formInput"
              {...register("oldPassword", { required: {value:true, message:'This field is required.'}, minLength: {value:8, message:'Password needs to be at least 8 characters long.'} })}
            />
            {errors.oldPassword && (
              <ErrorFormFieldMessage message={errors.oldPassword.message} />
            )}
          </label>

          <label className="flex flex-col">
            <input
              type="password"
              placeholder="New password"
              className="formInput"
              {...register("newPassword", { required: {value:true, message:'This field is required.'}, minLength: {value:8, message:'Password needs to be at least 8 characters long.'} })}
            />
            {errors.newPassword && (
              <ErrorFormFieldMessage message={errors.newPassword.message} />
            )}
          </label>

          <label className="flex flex-col">
            <input
              type="password"
              placeholder="Confirm new password"
              className="formInput"
              {...register("confirmNewPassword", {
                required: {value:true, message:'This field is required.'},
                minLength: {value:8, message:'Password needs to be at least 8 characters long.'},
              })}
            />
            {errors.confirmNewPassword && (
              <ErrorFormFieldMessage message={errors.confirmNewPassword.message} />
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
