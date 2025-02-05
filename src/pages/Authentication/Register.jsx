import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/validation/validationSchema";
import { registerUser } from "@/api/userApi";

const Register = () => {
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      adminKey: "",
    },
  });

  const adminKeyValue = useWatch({
    control: form.control,
    name: "adminKey",
    defaultValue: "",
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      form.reset();
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error details:", errorMessage);
    },
  });

  const handleRoleChange = (value) => {
    setRole(value);
    form.reset();
  };

  const onSubmit = (data) => {
    const { confirmPassword, ...filteredData } = data;
    filteredData.adminKey = adminKeyValue;
    mutation.mutate(filteredData);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        A betegelégedettségi kérdőív kitöltéséhez kérem regisztráljon itt!
      </h1>
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mb-4">
        <Label className="mb-4 lg:mb-0 underline">Regisztráció mint:</Label>
        <RadioGroup
          value={role}
          onValueChange={handleRoleChange}
          className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="patient" id="patient-radio" />
            <Label htmlFor="patient-radio">Páciens</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="admin" id="admin-radio" />
            <Label htmlFor="admin-radio">Admin</Label>
          </div>
        </RadioGroup>
      </div>

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
            name="name"
            rules={{ required: "Név megadása kötelező" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Név</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Adja meg a nevét"
                    {...field}
                    onBlur={() => form.trigger("name")}
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

          <FormField
            control={form.control}
            name="confirmPassword"
            rules={{
              required: "Jelszó megerősítése kötelező",
              validate: (value) =>
                value === form.getValues("password") ||
                "A két jelszó nem egyezik meg",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jelszó megerősítés</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Erősítse meg a jelszavát"
                    {...field}
                    onBlur={() => form.trigger("confirmPassword")}
                    className="w-full sm:w-1/3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {role === "admin" && (
            <FormField
              control={form.control}
              name="adminKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin kulcs</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Adja meg a 4 számjegyű admin kulcsát"
                      {...field}
                      className="w-full sm:w-1/3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex">
            <Button type="submit" size="lg" disabled={mutation.isPending}>
              {mutation.isPending
                ? "Regisztráció folyamatban..."
                : "Regisztráció"}
            </Button>
          </div>

          {mutation.isError && (
            <div className="text-red-500 mt-4">
              Hiba történt a regisztráció során:{" "}
              {mutation.error.response?.data?.message || mutation.error.message}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Register;
