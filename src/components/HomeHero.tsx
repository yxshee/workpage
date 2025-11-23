import OrbitCarousel from "./OrbitCarousel";
import RecursiveSketchBackground from "./RecursiveSketchBackground";

export default function HomeHero() {
  return (
    <section id="orbit-page" className="orbit-page relative w-full flex flex-col justify-center" style={{ backgroundColor: "#000000" }}>
      <RecursiveSketchBackground />
      <div className="orbit-page__inner">
        <OrbitCarousel />
      </div>
    </section>
  );
}
