import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <main className="registerPage">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">Register</h1>
          <RegisterForm />
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
