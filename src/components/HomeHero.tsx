import OrbitCarousel from "./OrbitCarousel";
import RecursiveSketchBackground from "./RecursiveSketchBackground";

export default function HomeHero() {
  return (
    <section id="orbit-page" className="orbit-page relative w-full flex flex-col justify-center" style={{ backgroundColor: "var(--bg-900)" }}>
      <RecursiveSketchBackground />
      <div className="orbit-page__inner">
        <OrbitCarousel />
      </div>
    </section>
  );
}
