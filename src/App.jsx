import Featured from "./components/Featured";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Product from "./components/Product";
import ProductCard from "./components/ProductCard";
import Services from "./components/Services";
import Subscribe from "./components/Subscribe";

export default function App() {
  return (
    <div className="bg-all">
      <Header />
      <Hero />
      <Product />
      <ProductCard />
      <Services />
      <Featured />
      <Subscribe/>
      <Footer />
    </div>
  )
}