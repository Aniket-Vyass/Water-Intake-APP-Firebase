import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import woveImg from "../assets/Wove.png";
import blinkitImg from "../assets/Blinkit Clone Portfolio Showcase.png";
import marioImg from "../assets/mario.png";

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
    name: "Wove App",
    category: "My own Production Ready App",
    tools: "Flutter, Bloc for StateManagement, Firebase for Backend, Figma",
    src: woveImg,
  },
  {
    id: 2,
    name: "Blinkit Clone App",
    category: "Firebase for Backend",
    tools: "Flutter, Custom Helper widgets, Dart, Picsart, Figma",
    src: blinkitImg,
  },
  {
    id: 3,
    name: "Me as Mario Game",
    category: "Upload your image and play as Mario",
    tools: "Flame, Tiled, Flutter, Dart",
    src: marioImg,
  },
  {
    id: 4,
    name: "Catalog App (Ecommerce)",
    category: "Listing Items to Cart functions, all done & dusted",
    tools: "Dart, Flutter, Figma",
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
                  {item.src ? (
                    <img
                      src={item.src}
                      alt={item.name}
                    />
                  ) : (
                    <div className="work-placeholder">Coming Soon</div>
                  )}
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