import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import connection from "../database/connection";
import Account from "../database/models/account";
import { NotesProvider } from "../context/NotesContext";
import { useContext } from "react";
import LoggedLayout from "../components/LoggedLayout";
import { LayoutContext } from "../context/LayoutContext";

export default function Home({ notes, trashedNotes }) {
  const { darkMode } = useContext(LayoutContext);

  return (
    <>
      <NotesProvider notes={notes} trashedNotes={trashedNotes}>
        <main
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } ease-in-out duration-200`}
        >
          <LoggedLayout />
        </main>
      </NotesProvider>
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
      notes: user.notes,
      trashedNotes: user.trashedNotes,
    },
  };
}
