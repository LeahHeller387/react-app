
import type { Category } from "./types";
import axios from 'axios';

export const fetchCategoriesApi = async (): Promise<Category[]> => {
  const res = await axios.get('http://localhost:5185/api/categories');
  return res.data;
};
