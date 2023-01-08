// import React from "react";
// import PropTypes from "prop-types";
// import style from "../../styles/styles";
import styles from "./heroes.module.scss";

const HeroAbout = () => {
  return (
    <section className={styles.flexCenterCol}>
      <div className={`${styles.boxWidth} ${styles.paddingX} flex-row flex-1`}>
        {/* <h1 className={`${style.heading2} items-start`}>Hero</h1> */}
        <div className={styles.block}>
          <div className={`grid grid-cols-2 gap-4 `}>
            <div className="w-fit justify-center">
              <img src="https://fakeimg.pl/400x400/?text=About school&font=lobster" />
            </div>
            <div className="w-auto">
              <h3>About school</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore error corrupti omnis odit, veniam suscipit culpa nulla
                neque? Voluptatem similique nam est in quae dolorem porro
                blanditiis explicabo nisi voluptates. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Officiis rerum maiores cupiditate
                accusantium alias? Ratione quae dolores minus doloremque
                aspernatur atque eius repudiandae temporibus, fuga quo laborum
                expedita facilis iure!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroAbout.propTypes = {};

export default HeroAbout;
