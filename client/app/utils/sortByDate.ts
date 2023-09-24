import { IArticle } from "@/types";

export const sortByDate = (data: IArticle[], order = "newest") => {
  return data.sort((a: IArticle, b: IArticle) => {
    return order === "newest"
      ? Number(new Date(b.createDateTime)) - Number(new Date(a.createDateTime))
      : Number(new Date(a.createDateTime)) - Number(new Date(b.createDateTime));
  });
};
