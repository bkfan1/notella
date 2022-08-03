import MainActionsMenu from "../components/MainActionsMenu";
import NotePreviewer from "../components/NotePreviewer";
import NotesRecipient from "../components/NoteInRecipient";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import connection from "../database/connection";
import Account from "../database/models/account";
import { NotesProvider } from "../context/NotesContext";
import Recipient from "../components/Recipient";
import {useState} from "react";
import LoggedLayout from "../components/LoggedLayout";

export default function Home({ notes, trashedNotes }) {
  const [focusMode, setFocusMode] = useState(false);
  return (
    <>
      <NotesProvider notes={notes} trashedNotes={trashedNotes}>
        <main>
          <LoggedLayout/>
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
      notes: user.notes,
      trashedNotes: user.trashedNotes,
    },
  };
}
