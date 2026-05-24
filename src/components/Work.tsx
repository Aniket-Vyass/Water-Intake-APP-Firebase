import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type WorkItem = {
  id: number;
  name: string;
  category: string;
  tools: string;
  src: string;
};

const workItems: WorkItem[] = [
  {
    id: 1,
    name: "Game Greed",
    category: "Video Editing",
    tools: "Premiere Pro, DaVinci Resolve, Final Cut Pro, Picsart",
    src: "",
  },
  {
    id: 2,
    name: "3D Globe Motion",
    category: "Motion Graphics",
    tools: "Premiere Pro, DaVinci Resolve, Final Cut Pro, Picsart, Blender",
    src: "",
  },
  {
    id: 3,
    name: "Sony Cycle Sports",
    category: "Video Editing",
    tools: "Premiere Pro, DaVinci Resolve, Final Cut Pro, Picsart",
    src: "",
  },
  {
    id: 4,
    name: "Khan Cricket Academy",
    category: "Video Editing",
    tools: "Premiere Pro, DaVinci Resolve, Final Cut Pro, Picsart",
    src: "",
  },
  {
    id: 5,
    name: "Edit for Chai Leela",
    category: "Video Editing",
    tools: "Premiere Pro, DaVinci Resolve, Final Cut Pro, Picsart",
    src: "",

  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {workItems.map((item) => (
            <div className="work-box" key={item.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{item.id}</h3>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{item.tools}</p>
              </div>
              <div className="work-image">
                <div className="work-image-in">
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => {
                      const v = e.currentTarget;
                      v.muted = false;
                      v.play();
                    }}
                    onMouseLeave={(e) => {
                      const v = e.currentTarget;
                      v.muted = true;
                      v.pause();
                      v.currentTime = 0;
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;