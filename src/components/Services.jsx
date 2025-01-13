import { services } from "../index";
import  ServiceCard  from "../design/ServieceCard.jsx";

const Services = () => {
  return (
    <section className='max-container flex justify-center flex-wrap mt-20 '>
      {services.map((service) => (
        <ServiceCard key={service.label} {...service} />
      ))}
    </section>
  );
};

export default Services;
