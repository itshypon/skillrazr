import { NavLink } from "react-router-dom";

export default function Games(props: any) {
  const availalbeGames = [
    {
      id: "planty",
      title: "Plant Trees",
      description: "Plant trees riding a horse",
    },
    {
      id: "scratchy",
      title: "Scratchy",
      description: "Scratch and Find",
    },
    {
      id: "findy",
      title: "Findy",
      description: "Find hidden animals and objects",
    },
  ];

  return (
    <div
      id="games"
      className={
        "w-full my-24 sm:mb-60 px-6 pt-10 flex flex-col items-center flex-wrap justify-center"
      }
    >
      <div className="text-6xl text-center mb-8">Games</div>
      <div className="flex flex-col sm:flex-row justify-center w-full">
        {availalbeGames.map((game) => {
          return (
            <NavLink
              to={`/games/${game.id}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              key={game.id}
            >
              <div
                key={game.title}
                className="flex flex-col items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-4 mt-lg-0  box-shadow border border-green-500 rounded-[5px]"
              >
                <div className="ml-2 text-2xl">{game.title}</div>
                <div className="ml-2">{game.description}</div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
