import Newsletter from "./components/home/Newsletter";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import Featured from "./components/home/Featured";
import Header from "./components/home/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Categories />
      <Featured />
      <Newsletter />
    </div>
  );
}