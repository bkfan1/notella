import MainActionsMenu from "../components/MainActionsMenu";
import NotePreviewer from "../components/NotePreviewer";
import NotesRecipient from "../components/NoteInRecipient";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import connection from "../database/connection";
import Account from "../database/models/account";
import { NotesProvider } from "../context/NotesContext";
import Recipient from "../components/Recipient";

export default function Home({ notes, trashedNotes }) {
  return (
    <>
      <NotesProvider notes={notes} trashedNotes={trashedNotes}>
        <main>
          <div className="flex w-full h-full">
            <div className="flex flex-col">
              <MainActionsMenu />
              <Recipient notes={notes} />
            </div>
            <NotePreviewer />
          </div>

          <footer className="footer text-center py-3">
            <p>Created by Jackson Paredes Ferranti (@bkfan1)</p>
          </footer>
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
