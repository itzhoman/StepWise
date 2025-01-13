const Button = ({
  label

}) => {
  return (
    <button
      className="bg-gradient-to-r w-[150px] from-[#2b5f9b] to-secondary hover:scale-105 duration-500 
      text-black py-2 px-4 rounded-full hover:text-white hover:bg-gradient-to-r hover:from-[#758ba5]
      hover:to-[#d1dded]"
    >
      {label}
    </button>
  );
};

export default Button;
