import { ColorRing, Oval } from "react-loader-spinner";
const Spinner = () => {
  return (
    <>
      <Oval
        height={200}
        width={200}
        color="#FFBF00"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#FFBF00ed"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </>
  );
};

export default Spinner;
