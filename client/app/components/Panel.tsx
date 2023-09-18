import { Button } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { useContext } from "react";
import { ArticlesContext } from "../context/article-context";

export const Panel = () => {
  const { sortArticleByDate } = useContext(ArticlesContext);

  return (
    <div className={"flex justify-center"}>
      <div className={"w-full max-w-4xl flex"}>
        <SearchBar />
        <Button
          onClick={sortArticleByDate}
          variant="outlined"
          style={{ width: 200, marginLeft: 15 }}
        >
          Sort by Date
        </Button>
      </div>
    </div>
  );
};
