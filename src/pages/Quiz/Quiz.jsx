import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getQuizByType } from "@/api/quizApi";
import { saveResults } from "@/api/resultsApi";
import QuizRadioField from "./QuizRadioField";
import { LinkButton } from "../../shared";

const Quiz = () => {
  const { type } = useParams();
  const [responses, setResponses] = useState([]);
  const defaultValue = "3";
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["quiz", type],
    queryFn: () => getQuizByType(type),
  });

  useEffect(() => {
    if (data?.length > 0) {
      const initialResponses = data[0].questions.map((question) => ({
        id: question._id,
        answer: defaultValue,
      }));
      setResponses(initialResponses);
    }
  }, [data]);

  const handleValueChange = (id, value) => {
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      const index = newResponses.findIndex((resp) => resp.id === id);

      index === -1
        ? newResponses.push({ id, answer: value })
        : (newResponses[index].answer = value);

      return newResponses;
    });
  };

  const mutation = useMutation({
    mutationFn: saveResults,
    onSuccess: () => {
      navigate("/thank-you");
    },
    onError: (error) => {
      console.error("Failed to save results:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data?.length > 0) {
      if (data[0].questions.length !== responses.length) {
        console.error("Mismatch in the number of questions and responses.");
        return;
      }

      const results = data[0].questions.reduce((arr, questionObj) => {
        const responseObj = responses.find((el) => el.id === questionObj._id);
        if (responseObj) {
          const newObj = {
            question: questionObj.question,
            answer: +responseObj.answer,
            questionType: questionObj.type,
          };
          arr.push(newObj);
        }
        return arr;
      }, []);

      const payload = {
        title: data[0].title,
        type: data[0].type,
        results,
      };

      mutation.mutate(payload);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching quiz data: {error.message}</div>;
  }

  if (!data?.length || !data[0].questions) {
    return <div>No quiz data available</div>;
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] p-4">
      <form onSubmit={handleSubmit}>
        <h2 className="font-bold text-2xl py-6">{data[0].title} kérdőív</h2>

        {data[0].questions.map((question) => (
          <QuizRadioField
            key={question._id}
            question={question}
            onValueChange={handleValueChange}
          />
        ))}
        <div className="flex gap-3">
          <LinkButton
            to="/"
            buttonText="Vissza"
            size="lg"
            className="flex justify-center items-center"
          />
          <Button
            type="submit"
            size="lg"
            className="my-6"
            variant="sky"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Mentés..." : "Elküldés"}
          </Button>
        </div>

        {mutation.isError && (
          <div className="text-red-500 mt-4">
            Error saving results: {mutation.error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Quiz;
