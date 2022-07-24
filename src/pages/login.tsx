import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../components/LoginForm"));

function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
