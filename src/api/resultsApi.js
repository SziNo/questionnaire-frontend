import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// Save quiz results
export const saveResults = async (payload) => {
  try {
    const response = await axios.post(
      `${url}/api/results/save`,
      payload,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error saving quiz results:", error);
    throw error;
  }
};

// Get statistics for a quiz type
export const getStatistics = async (quizType) => {
  try {
    const response = await axios.post(
      `${url}/api/results/admin/statistics`,
      { quizType },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

// Export statistics for a quiz type
export const exportStatistics = async (quizType) => {
  try {
    const response = await axios.post(
      `${url}/api/results/admin/statistics/export`,
      { quizType },
      {
        ...config,
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error exporting statistics:", error);
    throw error;
  }
};
