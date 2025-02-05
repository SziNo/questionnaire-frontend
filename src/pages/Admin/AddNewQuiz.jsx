import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { quizSchema } from "../../validation/quizSchema";
import { addQuiz } from "@/api/quizApi";

const AddNewQuiz = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      type: "",
    },
  });

  const addQuizMutation = useMutation({
    mutationFn: addQuiz,
    onSuccess: (response) => {
      const { type } = response.quiz;
      navigate(`/admin/quiz/${type}`);
      form.reset();
      queryClient.invalidateQueries("quizzes");
    },
    onError: (error) => {
      console.error("Error adding quiz:", error);
    },
  });

  const onSubmit = (data) => {
    addQuizMutation.mutate(data);
  };

  return (
    <section className="mb-4 w-full md:px-0">
      <h2 className="text-xl font-bold my-4 underline text-left">
        Új kérdőív hozzáadása
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-3"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left">Kérdőív címe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pl. Bőrgyógyászat"
                    {...field}
                    className="bg-white w-full md:max-w-md"
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left">Kérdőív típusa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pl. dermatology"
                    {...field}
                    className="bg-white w-full md:max-w-md"
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          <div className="flex py-4 sm:py-6">
            <Button
              type="submit"
              size="lg"
              className="uppercase"
              disabled={addQuizMutation.isLoading}
            >
              {addQuizMutation.isLoading
                ? "Kérdőív hozzáadása..."
                : "Hozzáadás"}
            </Button>
          </div>

          {addQuizMutation.isError && (
            <div className="text-red-500 mt-4 text-center">
              Error adding quiz:{" "}
              {addQuizMutation.error.response?.data?.message ||
                addQuizMutation.error.message}
            </div>
          )}
        </form>
      </Form>
    </section>
  );
};

export default AddNewQuiz;
