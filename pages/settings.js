import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import ErrorFormFieldMessage from "../components/ErrorFormFieldMessage";
import { email } from "../utils/regex";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import connection from "../database/connection";
import Account from "../database/models/account";
import {LayoutContext} from "../context/LayoutContext";
import SettingsForm from "../components/forms/SettingsForm";

export default function SettingsPage({}) {

  const router = useRouter();

  const {darkMode} = useContext(LayoutContext);
  return (
    <>
      <main className={`flex flex-col items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <SettingsForm/>
        

        <Link href="/">
          <a className={`ease-in-out duration-200 mt-4 p-2 text-xl font-bold ${darkMode ? 'text-white' : 'text-blue-500'}`}>
            <i className="bi bi-arrow-left mr-2" />
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
