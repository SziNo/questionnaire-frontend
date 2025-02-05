import { LinkButton } from "@/shared";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-gray-100 p-4 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Köszönjük, hogy időt szánt a betegelégedettségi kérdőívünk kitöltésére,
        véleménye fontos számunkra!
      </h1>
      <LinkButton to="/" buttonText="Vissza a kezdőlapra" size="lg" />
    </div>
  );
};

export default ThankYou;
