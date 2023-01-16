import LiveTvIcon from "@mui/icons-material/LiveTv";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import StarIcon from "@mui/icons-material/Star";
export default function Features(props: any) {
  const features = [
    { title: "Expert trainers", icon: StarIcon },
    { title: "Live classes", icon: LiveTvIcon },
    { title: "1-to-1 sessions", icon: LooksOneIcon },
    { title: "Digital track of learning", icon: AssessmentIcon },
    { title: "Affordable", icon: CurrencyRupeeIcon },
  ];

  return (
    <div
      id="features"
      className={
        "my-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-between"
      }
    >
      <div className="text-6xl text-center mb-8">Top Features</div>
      <div className="flex flex-wrap flex-col md:flex-row  justify-between p-2 w-full">
        {features.map((feature) => {
          return (
            <div
              key={feature.title}
              className="flex items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-2 mt-lg-0 box-shadow border rounded-[5px]"
            >
              {<feature.icon />}
              <span className="ml-2 text-[24px]">{feature.title}</span>
            </div>
          );
        })}

        <div className="navbar-nav-scroll flex flex-row">
          {/* <img src={main} alt="genlent" style={{ width: "540px" }} /> */}
        </div>
      </div>
    </div>
  );
}
