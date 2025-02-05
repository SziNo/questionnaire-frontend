import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuiz } from "@/api/quizApi";
import { Button } from "@/components/ui/button";

const EditQuizPopup = ({ quiz, onClose }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title || "");
      setType(quiz.type || "");
    }
  }, [quiz]);

  const mutation = useMutation({
    mutationFn: updateQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries("quizzes");
      onClose();
    },
    onError: (error) => {
      console.error("Error updating quiz:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: quiz._id, title, type });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full sm:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Kérdőív szerkesztése</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cím
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Típus
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit" variant="grogu">
              Mentés
            </Button>
            <Button type="button" variant="destructive" onClick={onClose}>
              Mégse
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuizPopup;
