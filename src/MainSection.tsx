import main from "./assets/images/main.jpg";

export default function MainSection(props: any) {
  return (
    <div
      className={
        "mt-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-between"
      }
    >
      <div className="flex flex-wrap flex-col md:flex-row  justify-between p-2 w-full">
        <div className="mt-2 ml-0 sm:ml-12 mb-12 mt-lg-0 font-bold text-center sm:text-left">
          <div className="text-7xl mb-2">Get Trained</div>
          <div className="text-2xl">
            Learn essential tech skills, get industry ready
          </div>
          <div className="text-2xl">
            Get your project done with proper guidance
          </div>
        </div>

        <div className="navbar-nav-scroll flex flex-row">
          <img src={main} alt="genlent" style={{ width: "540px" }} />
        </div>
      </div>
    </div>
  );
}
