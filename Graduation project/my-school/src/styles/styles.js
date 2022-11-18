const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2: `font-poppins font-semibold xs:text-[48px] text-[40px] text-black
     xs:leading leading-[66.8px] w-full`,
  paragraph: `font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]`,

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-12 px-4",
  paddingY: "sm:py-12 py-4",
  padding: "sm:px-12 px-4 sm:py-9 py-3",

  marginX: "sm:mx-12 mx-4",
  marginY: "sm:my-12 my-4",

  inputText: `mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                placeholder:italic placeholder:text-slate-400
                focus:border-indigo-300  
                focus:ring focus:ring-indigo-200 focus:ring-opacity-50`
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`
};

export default styles;
