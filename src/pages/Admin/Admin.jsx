import QuizTypes from "./QuizTypes";
import AddNewQuiz from "./AddNewQuiz";
import StatisticGenerate from "./SatisticsGenerate";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "@/shared";

const Admin = () => {
  const navigate = useNavigate();

  const handleCreateNewQuiz = () => {
    navigate("/admin/add-quiz");
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gray-100 mx-auto px-4 py-8">
      <AddNewQuiz />
      <QuizTypes />
      <StatisticGenerate />
      <LinkButton
        to="/"
        buttonText="Vissza"
        size="lg"
        className="flex justify-center items-center mt-10"
      />
    </div>
  );
};

export default Admin;
