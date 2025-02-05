import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getStatistics, exportStatistics } from "@/api/resultsApi";
import { getAllQuizzes } from "@/api/quizApi";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const StatisticGenerate = () => {
  const [selectedQuizType, setSelectedQuizType] = useState("");
  const [selectedQuizTitle, setSelectedQuizTitle] = useState("");

  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getAllQuizzes,
  });

  const {
    data: statistics,
    refetch,
    isError: isStatisticsError,
    error: statisticsError,
  } = useQuery({
    queryKey: ["statistics", selectedQuizType],
    queryFn: () => getStatistics(selectedQuizType),
    enabled: false, // Disable automatic fetching
  });

  const exportStatsMutation = useMutation({
    mutationFn: () => exportStatistics(selectedQuizType),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `statistics-${selectedQuizType}.csv`);
      document.body.appendChild(link);
      link.click();
    },
    onError: (error) => {
      console.error("Error exporting statistics:", error);
    },
  });

  useEffect(() => {
    if (quizzes?.length > 0) {
      // Setting default values
      setSelectedQuizType(quizzes[0].type);
      setSelectedQuizTitle(quizzes[0].title);
    }
  }, [quizzes]);

  const handleSelectQuizType = (value) => {
    const selectedQuiz = quizzes.find((quiz) => quiz.type === value);
    setSelectedQuizType(value);
    setSelectedQuizTitle(selectedQuiz.title);
  };

  const handleFetchStatistics = () => {
    refetch();
  };

  const handleExportStatistics = () => {
    exportStatsMutation.mutate();
  };

  if (isLoadingQuizzes) {
    return <div>Loading quizzes...</div>;
  }

  if (isStatisticsError) {
    return <div>Error fetching statistics: {statisticsError.message}</div>;
  }

  return (
    <section className="mb-4 w-full sm:w-3/4 lg:w-2/3">
      <h2 className="text-xl font-bold my-4 underline text-left">
        Statisztika Generálása
      </h2>

      <Select
        onValueChange={handleSelectQuizType}
        defaultValue={selectedQuizType}
      >
        <SelectTrigger className="bg-white w-full sm:w-1/2 lg:w-1/3">
          <SelectValue placeholder="Válassz egy kérdőív típust" />
          <SelectContent>
            {quizzes.map((quiz) => (
              <SelectItem key={quiz.type} value={quiz.type}>
                {quiz.type}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectTrigger>
      </Select>

      <div className="my-4 flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleFetchStatistics}
          size="lg"
          variant="sky"
          className="w-100"
        >
          Statisztika Megtekintése
        </Button>
        <Button
          onClick={handleExportStatistics}
          size="lg"
          variant="grogu"
          className="w-100"
        >
          Statisztika Letöltése
        </Button>
      </div>

      {statistics && (
        <section className="mt-4">
          <h3 className="text-xl font-semibold capitalize my-6">{`${selectedQuizTitle} betegelégedettségi kérdőív statisztikái:`}</h3>
          <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 border-b">
                    Összes válasz
                  </th>
                  <th className="py-2 px-4 bg-gray-200 border-b">
                    Átlagos pontszám
                  </th>
                  <th className="py-2 px-4 bg-gray-200 border-b">
                    Beküldések száma
                  </th>
                </tr>
              </thead>
              <tbody className="text-center font-bold">
                <tr>
                  <td className="py-2 px-4 border-b">
                    {statistics.totalResponses}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {statistics.averageScore || 0}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {statistics.totalSubmissions}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
};

export default StatisticGenerate;
