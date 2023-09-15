import { useContext, useEffect, useMemo } from "react";
import { ArticlesContext } from "../context/article-context";
import { Article } from "./Article";
import { Panel } from "./Panel";
import { usePathname } from "next/navigation";

export const ArticleBoard = () => {
  const { storedArticles, loading, searchString, searchArticle } =
    useContext(ArticlesContext);
  const pathname = usePathname();
  const isAdminPage = useMemo(() => pathname.includes("admin"), [pathname]);

  useEffect(() => {
    if (searchString) {
      searchArticle(searchString);
    }
  }, [searchString]);

  return (
    <div className={"mt-6"}>
      {storedArticles.length > 0 && <Panel />}
      <div className="flex justify-center">
        {loading && <h2>Loading.......</h2>}
        {isAdminPage ? (
          <h4>Click plus button to add your first article</h4>
        ) : (
          <h2 className={"flex justify-center"}>There is no article to show</h2>
        )}
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl py-6">
          {storedArticles &&
            storedArticles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
        </div>
      </div>
    </div>
  );
};
