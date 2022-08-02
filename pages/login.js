import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main className="loginPage">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">Log In</h1>
          <LoginForm />
        </div>
      </main>
    </>
  );
}


export async function getServerSideProps(ctx){

  const {cookie} = ctx.req.headers;

  if(cookie){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }


  return{
    props: {}
  }
}
