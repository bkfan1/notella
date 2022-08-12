import { useContext } from "react";
import LoginForm from "../components/forms/LoginForm";
import ResponseStatusBox from "../components/ResponseStatusBox";
import { LayoutContext } from "../context/LayoutContext";
import { ResponseContext } from "../context/ResponseContext";

export default function LoginPage() {
  const {code, message} = useContext(ResponseContext);
  const {darkMode} = useContext(LayoutContext);
  return (
    <>
      <main className={`loginPage ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col gap-4">
          <h1 className={`text-2xl font-bold text-center ${darkMode ? 'text-white ': 'text-blue-500'}`}>Log In</h1>
          <LoginForm />
          {code && message ? <ResponseStatusBox code={code} message={message}/> : ''}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { cookie } = ctx.req.headers;

  if (cookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
