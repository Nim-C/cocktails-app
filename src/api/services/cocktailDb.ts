import axios from "axios";
import { API_BASE_URL } from "$src/constants";

const cocktailDbAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const cocktailDbFetch = async <T>(
  ...args: Parameters<typeof cocktailDbAxiosInstance.get>
): Promise<T> => {
  try {
    const response = await cocktailDbAxiosInstance.get<T>(...args);
    return response.data;
  } catch (error) {
    console.error("Error fetching from cocktailDB:", error);
    throw error;
  }
};
