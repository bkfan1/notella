import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import ErrorFormFieldMessage from "../ErrorFormFieldMessage";

export default function UpdateAccountPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {

    const res = await axios.put('/api/account/password', data);

    res.status === 200 ? console.log("contraseña actualizada con exito") : console.log("wrong!")
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xs">
        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            <input
              type="password"
              placeholder="Old password"
              className="formInput"
              {...register("oldPassword", { required: true, minLength: 8 })}
            />
            {errors.oldPassword && (
              <ErrorFormFieldMessage message={"Password must be at least 8 characters long."} />
            )}
          </label>

          <label className="flex flex-col">
            <input
              type="password"
              placeholder="New password"
              className="formInput"
              {...register("newPassword", { required: true, minLength: 8 })}
            />
            {errors.newPassword && (
              <ErrorFormFieldMessage message={"New password must be at least 8 characters long."} />
            )}
          </label>

          <label className="flex flex-col">
            <input
              type="password"
              placeholder="Confirm new password"
              className="formInput"
              {...register("confirmNewPassword", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.confirmNewPassword && (
              <ErrorFormFieldMessage message={"Confirm new password must be at least 8 characters long and needs to match new password."} />
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
