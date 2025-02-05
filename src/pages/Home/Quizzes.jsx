import { useQuery } from "@tanstack/react-query";
import { getAllQuizzes } from "@/api/quizApi";
import { CardContainer } from "@/shared";

const Quizzes = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getAllQuizzes,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching quizzes: {error.message}</div>;
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Kérdőívek</h2>
      <CardContainer items={data} buttonText="Kérdőív kezdése" path="/quiz" />
    </section>
  );
};

export default Quizzes;
