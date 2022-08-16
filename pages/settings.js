import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import connection from "../database/connection";
import Account from "../database/models/account";
import { LayoutContext } from "../context/LayoutContext";
import { ResponseContext } from "../context/ResponseContext";

import UpdateAccountPasswordForm from "../components/forms/UpdateAccountPasswordForm";
import UpdateAccountEmailForm from "../components/forms/UpdateAccountEmailForm";
import ResponseStatusBox from "../components/ResponseStatusBox";

export default function SettingsPage({}) {
  const { code, message } = useContext(ResponseContext);
  const router = useRouter();
  const { darkMode } = useContext(LayoutContext);
  const [section, setSection] = useState("email");

  const handleClickSection = (e) => {
    e.preventDefault();
    const { target } = e;
    const { name } = target;
    setSection(name);
  };

  return (
    <>
      <main
        className={`flex flex-col items-center justify-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <section className="flex flex-col h-fit-content p-4 rounded">
          <header
            className={`flex gap-4 justify-center items-center mb-2 ${
              darkMode ? "text-white" : ""
            } font-bold`}
          >
            <button
              name="email"
              onClick={(e) => handleClickSection(e)}
              className={`border-b-4 ${
                section === "email" ? "border-b-blue-500" : "border-b-gray-300"
              }`}
            >
              Email
            </button>

            <button
              name="password"
              onClick={(e) => handleClickSection(e)}
              className={`border-b-4 ${
                section === "password"
                  ? "border-b-blue-500"
                  : "border-b-gray-300"
              }`}
            >
              Password
            </button>
          </header>

          {section === "email" ? (
            <>
              <UpdateAccountEmailForm />
            </>
          ) : (
            <UpdateAccountPasswordForm />
          )}
        </section>

        {code && message ? (
          <ResponseStatusBox code={code} message={message} />
        ) : (
          ""
        )}

        <Link href="/">
          <a
            className={`ease-in-out duration-200 mt-4 p-2 text-xl font-bold ${
              darkMode ? "text-white" : "text-blue-500"
            }`}
          >
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
    props: {},
  };
}
