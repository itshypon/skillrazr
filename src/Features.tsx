export default function Features(props: any) {
  const features = [
    "Expert trainers",
    "Live classes",
    "1-to-1 sessions",
    "Digital track of learning",
    "Affordable",
  ];

  return (
    <div
      id="features"
      className={
        "mt-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-between"
      }
    >
      <div className="text-6xl text-center mb-4">Top Features</div>
      <div className="flex flex-wrap flex-col md:flex-row  justify-between p-2 w-full">
        {features.map((i) => {
          return (
            <span className="mt-2 ml-0 sm:ml-12 px-4 py-2 mt-lg-0 font-bold box-shadow border rounded-[5px]">
              {i}
            </span>
          );
        })}

        <div className="navbar-nav-scroll flex flex-row">
          {/* <img src={main} alt="genlent" style={{ width: "540px" }} /> */}
        </div>
      </div>
    </div>
  );
}
