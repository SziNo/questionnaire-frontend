import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getAllQuizzes = async () => {
  const response = await axios.get(`${url}/api/quizzes`);
  return response.data;
};

export const getQuizByType = async (type) => {
  try {
    const response = await axios.get(`${url}/api/quizzes/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz by type:", error);
    throw error;
  }
};

export const getQuizByTypeAdmin = async (type) => {
  try {
    const response = await axios.get(
      `${url}/api/quizzes/admin/${type}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz by type:", error);
    throw error;
  }
};

export const addQuiz = async (data) => {
  const response = await axios.post(
    `${url}/api/quizzes/admin/add-quiz`,
    data,
    config
  );
  return response.data;
};

export const addQuestion = async (data) => {
  const response = await axios.post(
    `${url}/api/quizzes/admin/add-question`,
    data,
    config
  );
  return response.data;
};

export const updateQuiz = async (payload) => {
  try {
    const response = await axios.put(
      `${url}/api/quizzes/admin/update-quiz`,
      payload,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const updateQuestion = async (data) => {
  const response = await axios.put(
    `${url}/api/quizzes/admin/update-question`,
    data,
    config
  );
  return response.data;
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await axios.post(
      `${url}/api/quizzes/admin/delete-question`,
      { questionId },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

export const deleteQuiz = async (type) => {
  try {
    const response = await axios.delete(
      `${url}/api/quizzes/admin/${type}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};
