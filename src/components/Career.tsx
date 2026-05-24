import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Business owner</h4>
                <h5>at Muskan Motors</h5>
              </div>
              <h3>2018 - present</h3>
            </div>
            <p>
              Owner of a successfull profitable firm Muskan Motors!
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Started Building Apps</h4>
                <h5>Using Flutter and Bloc </h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Started building business logic apps:
              Blinkit Ui clones and fully functional Catalog Apps
              for better understanding of business logic, REST API,
              Backend as Firebase, and Bloc as State Management, learning
              clean business architecture and underlying processes.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Production ready Apps & Games</h4>
                <h5>Using Flutter, Bloc & Flame engine</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Built a Production ready Social app called Wove,
              with all the feature including : posting pictures/videos,
              like, comment, real time notifications.
              Built a Face changing Mario app in which a user can replace
              Mario's head with their image with the help of Flame Engine
              for collision detections and physics. Used Tile.io for the Maps
              got copyrigh erorr and had to remove the game!
              Do checkout the game on my github!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
