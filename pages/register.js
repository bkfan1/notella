import { useContext } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import ResponseStatusBox from "../components/ResponseStatusBox";
import { ResponseContext } from "../context/ResponseContext";
import { LayoutContext } from "../context/LayoutContext";


export default function RegisterPage() {
  const {code, message} = useContext(ResponseContext);
  const {darkMode} = useContext(LayoutContext);
  return (
    <>
      <main className={`registerPage ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col gap-4">
          <h1 className={`text-2xl font-bold text-center ${darkMode ? 'text-white ': 'text-blue-500'}`}>Register</h1>
          <RegisterForm />
          {code && message ? <ResponseStatusBox code={code} message={message} /> : ""}
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
