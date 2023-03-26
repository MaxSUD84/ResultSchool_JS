import PropTypes from "prop-types";

const Preloader = ({ percent }) => {
  return (
    <>
      <div
        id="preloader"
        className={`
            absolute left-0 top-0 w-full h-full 
            bg-slate-800 bg-opacity-40
        `}
      >
        <div
          id="preloader__loader"
          className={`
                absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
            `}
        >
          <div
            className={`
                w-[100px] h-[100px] bg-stone-400 bg-opacity-5
            `}
          >
            <svg
              viewBox="0 0 100 100"
              className={`
                    relative
                    animate-spin h-[100px] w-[100px]
                `}
            >
              <path
                d="M 5,50 A 45,45 90 1,0 50,5"
                style={{
                  stroke: "#bef264",
                  strokeWidth: "10px",
                  strokeLinecap: "round",
                  fill: "transparent",
                }}
              />
            </svg>

            <span
              id="preloader__percents"
              className={`
                absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                font-body font-semibold text-xl text-[#bef264]
                `}
            >
              <span id="percents">{percent}</span>
              {percent ? "%" : ""}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

Preloader.propTypes = {
  percent: PropTypes.string,
};

export default Preloader;
