"use client";
import { ArticlesContextProvider } from "../context/article-context";
import { ArticleBoard } from "./ArticleBoard";

export const Dashboard = () => {
  return (
    <>
      <ArticlesContextProvider>
        <ArticleBoard />
      </ArticlesContextProvider>
    </>
  );
};
