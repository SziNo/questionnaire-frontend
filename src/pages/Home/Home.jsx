import useStore from "@/store/zustandStore";
import Quizzes from "./Quizzes";
import LoginOrRegisterMessage from "./LoginOrRegisterMessage";

const Home = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gray-100 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Üdvözöljük a BizKit Express Betegelégedettségi Kérdőív Platformján
      </h1>
      <p className="mb-6">
        Ez az oldal lehetőséget nyújt, hogy kitölthesse az intézményünk által
        biztosított egészségügyi szolgáltatásokkal kapcsolatos elégedettségi
        kérdőíveket. Kérjük, hogy ossza meg véleményét a különböző
        osztályainkkal kapcsolatban, mint például a plasztikai sebészet,
        fogászat, vagy más általános részlegek. A folytatáshoz kérjük,
        jelentkezzen be vagy regisztráljon.
      </p>

      {isLoggedIn ? <Quizzes /> : <LoginOrRegisterMessage />}
    </div>
  );
};

export default Home;
