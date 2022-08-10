import axios from "axios";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { email } from "../../utils/regex";
import ErrorFormFieldMessage from "../ErrorFormFieldMessage";

export default function UpdateAccountEmailForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {

    const res = await axios.put('/api/account/email', data);

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
              {...register("newEmail", { required: true, pattern: email })}
            />
            {errors.newEmail && (
              <ErrorFormFieldMessage message={"Type a valid email address"} />
            )}
          </label>

          <label className="flex flex-col">
            <input
              type="email"
              placeholder="Confirm new email"
              className="formInput"
              {...register("confirmNewEmail", {
                required: true,
                pattern: email,
              })}
            />
            {errors.confirmNewEmail && (
              <ErrorFormFieldMessage message={"Type a valid email address"} />
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
