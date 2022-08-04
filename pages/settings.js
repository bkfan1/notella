import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import ErrorFormFieldMessage from "../components/ErrorFormFieldMessage";
import { email } from "../utils/regex";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import connection from "../database/connection";
import Account from "../database/models/account";

export default function SettingsPage({ email }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const router = useRouter();
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-80 ease-in-out duration-100 p-4 gap-4 border-2 bg-white"
        >
          <div className="flex flex-col gap-2">
            <label className="flex flex-col">
              <span className="text-sm text-gray-700">Email</span>
              <input
                type="email"
                placeholder="Type an email"
                className="formInput"
                {...register("email", { required: true, pattern: email })}
                defaultValue={email}
              />
              {errors.email && (
                <ErrorFormFieldMessage message={"Type a valid email address"} />
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-700">Password</span>
              <input
                type="password"
                placeholder="Type a password"
                className="formInput"
                {...register("password", { required: true, minLength: 8, })}
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
              Update
            </button>
            <Link href="/register">
              <a className="text-sm text-red-500">
                <i className="bi bi-trash" /> Delete account
              </a>
            </Link>
          </menu>
        </form>

        <Link href="/">
          <a className="ease-in-out duration-200 mt-4 p-2 text-xl font-bold text-blue-500">
            <i className="bi bi-arrow-left mr-2"/>
            Back to notes
          </a>
        </Link>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { cookie } = ctx.req.headers;

  if (!cookie) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const parsedCookie = parse(cookie);
  const { authToken } = parsedCookie;
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const payload = verify(authToken, secret);
  const { userId } = payload;
  const db = await connection();
  const user = await Account.findOne({ _id: userId });
  //console.log(user);
  if (!user) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      email: user.email,
    },
  };
}
