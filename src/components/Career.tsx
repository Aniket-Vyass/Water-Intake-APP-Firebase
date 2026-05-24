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
                <h4>Video Editor & Motion Graphics</h4>
                <h5>Game Greed</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Worked for Game Greed, as a freelancing WFH Video Editor, Edited 3D looking videos,
              worked mostly on Brand Intro videos and reels.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Worked as a Freelancer</h4>
                <h5>For Multiple Brands</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Worked as a freelancing video editor at vaarious companies,
              Edited videos and Motion Optimization for various Brands
              Freelanced for AG Khan Cricket Academy & Chai Leela!
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Video Editor</h4>
                <h5>Sony Cycle Sports</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Worked at Sony Cycle Sports company at bikaner,
              Made Social Media Content for Brand Promotion on Instagram!
              Worked mostly on high quality edits for youtube videos and reels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
