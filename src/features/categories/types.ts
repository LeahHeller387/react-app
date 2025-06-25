export type Category = {
  id: string;
  name: string;
};

export type CategoriesState = {
  list: Category[];
  loading: boolean;
  error: string | null;
};


