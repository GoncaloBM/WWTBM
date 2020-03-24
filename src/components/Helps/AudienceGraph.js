import React from "react";
import "./AudienceGraph.css";

export const AudienceGraph = props => {
  var classNames = require("classnames");

  let publicHelpActivated = classNames(
    {
      "graph-showing graph-wrapper": props.publicHelpActivated
    },
    { "graph-hidden graph-wrapper": !props.publicHelpActivated }
  );

  return (
    <div
      className={publicHelpActivated}
    >
      <div className="percentage-label">
        <div className="percentage">
          {" "}
          {props.publicHelpActivated === true
            ? props.publicHelpState.percentageAnswer[0]
            : 0}
          %
        </div>
        <div className="percentage">
          {" "}
          {props.publicHelpActivated === true
            ? props.publicHelpState.percentageAnswer[1]
            : 0}
          %
        </div>
        <div className="percentage">
          {props.publicHelpActivated === true
            ? props.publicHelpState.percentageAnswer[2]
            : 0}
          %
        </div>
        <div className="percentage">
          {props.publicHelpActivated === true
            ? props.publicHelpState.percentageAnswer[3]
            : 0}
          %
        </div>
      </div>
      <div className="graph">
        <div className="horiz-line" style={{ left: "12.5%" }} />
        <div className="horiz-line" style={{ left: "25%" }} />
        <div className="horiz-line" style={{ left: "37.5%" }} />
        <div className="horiz-line" style={{ left: "50%" }} />
        <div className="horiz-line" style={{ left: "62.5%" }} />
        <div className="horiz-line" style={{ left: "75%" }} />
        <div className="horiz-line" style={{ left: "87.5%" }} />
        <div className="vert-line" style={{ bottom: "0%" }} />
        <div className="vert-line" style={{ bottom: "10%" }} />
        <div className="vert-line" style={{ bottom: "20%" }} />
        <div className="vert-line" style={{ bottom: "30%" }} />
        <div className="vert-line" style={{ bottom: "40%" }} />
        <div className="vert-line" style={{ bottom: "50%" }} />
        <div className="vert-line" style={{ bottom: "60%" }} />
        <div className="vert-line" style={{ bottom: "70%" }} />
        <div className="vert-line" style={{ bottom: "80%" }} />
        <div
          className="bar"
          style={{
            height: `${
              props.publicHelpActivated === true
                ? props.publicHelpState.percentageAnswer[0]
                : 0
            }%`
          }}
        />
        <div
          className="bar"
          style={{
            height: `${
              props.publicHelpActivated === true
                ? props.publicHelpState.percentageAnswer[1]
                : 0
            }%`
          }}
        />
        <div
          className="bar"
          style={{
            height: `${
              props.publicHelpActivated === true
                ? props.publicHelpState.percentageAnswer[2]
                : 0
            }%`
          }}
        />
        <div
          className="bar"
          style={{
            height: `${
              props.publicHelpActivated === true
                ? props.publicHelpState.percentageAnswer[3]
                : 0
            }%`
          }}
        />
      </div>
      <div className="letters-label">
        <div className="letters">A</div>
        <div className="square-rot" />
        <div className="letters">B</div>
        <div className="square-rot" />
        <div className="letters">C</div>
        <div className="square-rot" />
        <div className="letters">D</div>
      </div>
    </div>
  );
};

export default AudienceGraph;
