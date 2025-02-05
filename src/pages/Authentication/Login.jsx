import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/validation/loginSchema";
import { loginUser } from "@/api/userApi";
import useStore from "@/store/zustandStore";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setIsAdmin = useStore((state) => state.setIsAdmin);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      setIsLoggedIn(true);
      setIsAdmin(data.isAdmin);

      form.reset();

      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);

      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error details:", errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Jelentkezzen be itt!</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Email cím megadása kötelező" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email cím</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Adja meg az email címét"
                    {...field}
                    onBlur={() => form.trigger("email")}
                    className="w-full sm:w-1/3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Jelszó megadása kötelező",
              minLength: {
                value: 6,
                message: "Legalább 6 karakter hosszú jelszót adjon meg",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jelszó</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Adja meg 6 karakterből álló jelszavát"
                    {...field}
                    onBlur={() => form.trigger("password")}
                    className="w-full sm:w-1/3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex">
            <Button type="submit" size="lg" disabled={mutation.isPending}>
              {mutation.isPending
                ? "Bejelentkezés folyamatban..."
                : "Bejelentkezés"}
            </Button>
          </div>

          {mutation.isError && (
            <div className="text-red-500 mt-4">
              Hiba történt a bejelentkezés során:{" "}
              {mutation.error.response?.data?.message || mutation.error.message}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Login;
