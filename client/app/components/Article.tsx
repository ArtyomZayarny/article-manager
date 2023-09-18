"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { usePathname } from "next/navigation";
import { useContext, useMemo } from "react";
import { ArticlesContext } from "../context/article-context";
import { ModalContext } from "../context/modal-context";
import { fetchData } from "../utils/fetchData";
import { formatDate } from "../utils/formatDate";

type Props = {
  article: {
    id: string;
    title: string;
    description: string;
  };
};

export const Article = ({ article }: Props) => {
  const { title, description, createDateTime } = article;
  const { deleteArticle, articles } = useContext(ArticlesContext);
  const { open, setOpen, setModalType, setInputs } = useContext(ModalContext);
  const pathname = usePathname();
  const isAdminPage = useMemo(() => pathname.includes("admin"), [pathname]);

  const handleEdit = (id, values) => {
    setModalType("edit");
    setInputs({ id, values });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetchData(
        `http://localhost:3001/articles/${id}`,
        "DELETE"
      );
      deleteArticle(id);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <div className="bg-white rounded-md drop-shadow-md p-6 w-full max-w-sm flex flex-col">
      <h3 className={"font-bold text-xl text-[#242424]"}>{article.title}</h3>
      <p className={"text-base text-[#6b6b6b]"}>{article.description}</p>

      <div className={"mt-auto"}>
        {isAdminPage && (
          <div className={"my-2 justify-between flex"}>
            <ModeEditIcon
              onClick={() => handleEdit(article.id, { title, description })}
              className={"hover:cursor-pointer"}
            />
            <DeleteIcon
              onClick={() => handleDelete(article.id)}
              className={"hover:cursor-pointer"}
            />
          </div>
        )}
        <span className={"inline-flex text-slate-400 text-xs"}>
          {formatDate(createDateTime)}
        </span>
      </div>
    </div>
  );
};
