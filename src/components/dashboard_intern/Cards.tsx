import Card from "./Card";

function Cards({ data }: { data: Array<{ title: string; value: number }> }) {
  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap w-full space-between">
      {data?.map((card, id) => {
        return (
          <div className="parentContainer">
            <Card
              className={`card${id}`}
              title={card.title}
              value={card.value}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
