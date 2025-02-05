import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { questionSchema } from "../../validation/questionSchema";
import { addQuestion } from "@/api/quizApi";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

const AddNewQuestion = ({ type }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionType: "rating",
      question: "",
    },
  });

  const addQuestionMutation = useMutation({
    mutationFn: (data) => addQuestion({ ...data, quizType: type }),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries(["quiz", type]);
    },
    onError: (error) => {
      console.error("Error adding question:", error);
    },
  });

  const onSubmit = (data) => {
    addQuestionMutation.mutate(data);
  };

  return (
    <section className="mb-4 w-full sm:w-3/4 lg:w-2/3">
      <h1 className="text-2xl font-bold mb-4">Új kérdés hozzáadása</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-3"
        >
          <FormField
            control={form.control}
            name="questionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kérdés típus</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue="rating">
                    <SelectTrigger>
                      <SelectValue placeholder="Válaszd ki a kérdés típusát" />
                      <SelectContent>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kérdés</FormLabel>
                <FormControl>
                  <Input placeholder="Ide írd a kérdést" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="uppercase"
              variant="sky"
              disabled={addQuestionMutation.isLoading}
            >
              {addQuestionMutation.isLoading
                ? "Kérdés hozzáadása..."
                : "Hozzáadás"}
            </Button>
          </div>

          {addQuestionMutation.isError && (
            <div className="text-red-500 mt-4">
              Error adding question:{" "}
              {addQuestionMutation.error.response?.data?.message ||
                addQuestionMutation.error.message}
            </div>
          )}
        </form>
      </Form>
    </section>
  );
};

export default AddNewQuestion;
