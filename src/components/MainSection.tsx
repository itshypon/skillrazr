import main from "../assets/images/main2.jpg";

export default function MainSection(props: any) {
  return (
    <div
      className={
        "mt-24 px-6 pt-20 sm:pt-[120px] flex flex-col items-center flex-wrap justify-between"
      }
    >
      <div className="flex flex-col lg:flex-row items-center justify-between p-2 w-full">
        <div className="mt-2 ml-0 sm:ml-12 mb-12 mt-lg-0 text-center sm:text-left">
          <div className="text-7xl mb-2">
            Get Tech Skilled
            <br /> 10x Faster
          </div>
          <div className="text-2xl mt-4 sm:mt-2 ml-0 sm:ml-1">
            Learn essential tech skills, build projects <br /> Showcase skills
            and get industry ready
          </div>
          {/* <div className="text-1xl">
            Get your project done with proper guidance
          </div> */}
        </div>

        <div className="navbar-nav-scroll flex flex-row lg:mr-12">
          <img
            src={main}
            alt="genlent"
            style={{ width: "540px" }}
            className="rounded-[12px]"
          />
        </div>
      </div>
    </div>
  );
}
