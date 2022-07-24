import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import Link from "next/link";

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>
        <input
          type="email"
          placeholder="abc@example.com"
          {...register("email")}
        />
        <input type="text" placeholder="full name" {...register("name")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <button type="submit">Register</button>
      </form>
      <Link href="/login">Login</Link>
    </>
  );
}

export default RegisterPage;
