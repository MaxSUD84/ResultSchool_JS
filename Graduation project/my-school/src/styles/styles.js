const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  // *** News fonts ***
  heading0: `font-poppins font-semibold xs:text-[16px] text-[20px] text-black
  xs:leading leading-[46.8px] w-full`,
  paragraph0: `font-poppins font-normal text-primary-2 text-[13px] leading-[16px]`,
  // ***
  heading2: `font-poppins font-semibold xs:text-[36px] text-[30px] text-black
     xs:leading leading-[66.8px] w-full`,
  paragraph: `font-poppins font-semibold text-primary-2 text-[14px] leading-[16px]`,
  // paragraph: `font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]`,

  flexCenter: "flex justify-center items-center",
  flexCenterRow: "flex flex-row justify-center items-center",
  flexStartRow: "flex flex-row justify-center items-start",
  flexEndRow: "flex flex-row justify-center items-end",
  flexCenterCol: "flex flex-col justify-center items-center",
  flexStartCol: "flex flex-col justify-center items-start",
  flexEndCol: "flex flex-col items-end",
  flexCol: "flex flex-col",

  paddingX: "sm:px-6 px-2",
  paddingY: "sm:py-6 py-2",
  padding: "sm:px-6 px-2 sm:py-4 py-1",

  marginX: "sm:mx-6 mx-2",
  marginY: "sm:my-6 my-2",

  inputTextPrm: `mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                placeholder:italic placeholder:text-slate-400
                focus:border-indigo-300  
                focus:ring focus:ring-indigo-200 focus:ring-opacity-50`,

  inputTextSec: `mt-1 px-2 py-1
  block
  w-full
  rounded-md
  border-gray-100
  shadow-md
  placeholder:italic placeholder:text-slate-400
  focus:border-indigo-300  
  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`,

  btnPrmLight: `w-full lg:w-fit text-center rounded inline-block bg-transparent 
  outline-none ring-inset ring-1 disabled:opacity-20 px-6 py-3
  focus-visible:ring-2 text-primary-500 ring-primary-300  
  hover:bg-gradient-to-r from-primary-1 to-primary-300 hover:text-primary-42
  hover:ring-primary-41 hover:ring-1`,

  btnPrmDark: `w-full lg:w-fit text-center rounded inline-block bg-primary-300 
  outline-none ring-inset ring-1 disabled:opacity-20 px-6 py-3
  focus-visible:ring-1 text-primary-100 ring-primary-500/60
  hover:bg-gradient-to-r from-primary-1 to-primary-300 hover:text-primary-41`,

  btnSecLight: `w-full lg:w-fit text-center rounded inline-block bg-transparent
  outline-none ring-inset ring-1 disabled:opacity-20 
 focus-visible:ring-3  text-primary-500 ring-primary-300
 hover:bg-gradient-to-r from-cyan-600 to-blue-200 px-6 py-3`,

  btnSecDark: `w-full lg:w-fit text-center px-6 py-3 rounded inline-block outline-none 
 ring-inset ring-1 disabled:opacity-20 focus-visible:ring-1 text-primary-42 
 bg-gradient-to-r from-cyan-600 to-primary-1/70 ring-primary-1 
 hover:bg-slate-200 hover:from-primary-2 hover:text-white`,
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
