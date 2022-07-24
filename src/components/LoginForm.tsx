import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { useState } from "react";
import Link from "next/link";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    "users.verify-otp",
    {
      hash,
    },
  ]);

  if (isLoading) {
    return <p>Verifying...</p>;
  }

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>Redirecting...</p>;
}

function LoginForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });
  function onSubmit(values: CreateUserInput) {
    mutate({ ...values, redirect: router.asPath });
  }

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}

        {success && <p>Check your email</p>}
        <h1>Login</h1>

        <input
          type="email"
          placeholder="abc@example.com"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <button type="submit">Log in</button>
      </form>
      <Link href="/register">Register</Link>
    </>
  );
}

export default LoginForm;
