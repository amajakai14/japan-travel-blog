import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useUserContext } from "../context/user.context";
import LoginForm from "../components/LoginForm";
import TopPage from "../components/TopPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const user = useUserContext();

  // if (!user) {
  //   return <LoginForm />;
  // }

  return (
    <>
      <Head>
        <title>Grass Roots</title>
        <meta name="Grass Roots" content="hiring job job-hunting thailand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen w-full">
        <Navbar />
        <div className="flex flex-col bg-gradient-to-r  grow w-full from-blue-600 to-slate-300">
          <TopPage />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
