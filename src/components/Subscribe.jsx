import Button from "../design/Button";

const Subscribe = () => {
  return (
    <section
      id="contact-us"
      className="flex flex-col lg:flex-row justify-around lg:justify-around items-center mx-4 sm:mx-8
       lg:mx-32 mt-20 gap-8"
    >
      <h3 className="text-center lg:text-left text-2xl sm:text-3xl lg:text-4xl leading-snug lg:leading-[68px] font-palanquin font-bold">
        Sign Up for
        <span className="text-red-500"> Updates </span> Newsletter
      </h3>
      <div
        className="w-full sm:w-[450px] lg:max-w-[40%] flex items-center  max-sm:flex-col bg-secondary 
        p-2 gap-3 sm:p-4 border border-slate-gray rounded-full"
      >
        <input
          type="text"
          placeholder="subscribe@nike.com"
          className=" bg-secondary flex-grow px-4 py-2 rounded-full max-sm:mb-2"
        />
        <div className="flex justify-end items-center w-auto">
          <Button label="Sign Up" fullWidth={false} />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
