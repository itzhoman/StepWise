const ServiceCard = ({ imgURL, label, subtext }) => {
    return (
      <div className='flex-1 sm:w-3/5  w-3/5 rounded-[20px]  bg-secondary shadow-3xl mx-32 py-16 mt-10'>
        <div className='w-[250px] h-11 flex justify-center items-center bg-coral-red mx-auto pb-7 rounded-full'>
          <img src={imgURL} alt={label} width={200} height={84} />
        </div>
        <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold pl-9'>
          {label}
        </h3>
        <p className='mt-3 break-words font-montserrat text-lg leading-normal pl-9 text-slate-gray'>
          {subtext}
        </p>
      </div>
    );
  };
  
  export default ServiceCard;
  