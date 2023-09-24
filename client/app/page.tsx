import Link from "next/link";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { ArticlesContextProvider } from "./context/article-context";

export default function Home() {
  return (
    <main>
      <Header>
        <h1 className={"font-bold text-white hover:cursor-pointer"}>
          Article Manager
        </h1>
        <Link href={"/admin"} className={"text-white hover:text-blue-600"}>
          Go to Admin
        </Link>
      </Header>
      <ArticlesContextProvider>
        <Dashboard />
      </ArticlesContextProvider>
    </main>
  );
}
