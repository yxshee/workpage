import Slider3D from "./Slider3D";

export default function Hero() {
  return (
    <section id="home-root" className="home-root relative w-full flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-900)' }}>
      <div className="home-inner">
        <Slider3D />
      </div>
    </section>
  );
}
