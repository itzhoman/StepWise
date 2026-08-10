import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiRotateCw, FiZap } from "react-icons/fi";

const frames = Array.from({ length: 8 }, (_, index) => `/shoes360/ice/${index}.webp`);

const Experience = () => {
  const [frame, setFrame] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [autoSpin, setAutoSpin] = useState(true);
  const startX = useRef(0);

  useEffect(() => {
    if (!autoSpin || dragging) return undefined;
    const timer = window.setInterval(() => setFrame((current) => (current + 1) % frames.length), 950);
    return () => window.clearInterval(timer);
  }, [autoSpin, dragging]);

  const drag = (event) => {
    if (!dragging || Math.abs(event.clientX - startX.current) < 18) return;
    const direction = event.clientX > startX.current ? 1 : -1;
    setFrame((current) => (current + direction + frames.length) % frames.length);
    startX.current = event.clientX;
  };

  return (
    <section className="relative min-h-[760px] lg:min-h-[850px] bg-gradient-to-br from-[#173a4a] via-[#0791b1] to-[#92c4d1] overflow-hidden text-white flex items-center px-5 md:px-14 lg:px-28 py-24" id="experience">
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:70px_70px]" />
      <span className="absolute -left-10 top-8 text-[22vw] leading-none font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.12)] select-none">MOVE</span>

      <div className="relative z-10 w-full max-w-[1450px] mx-auto grid lg:grid-cols-[.7fr_1.3fr] gap-12 items-center">
        <div className="order-2 lg:order-1 text-center lg:text-left" dir="ltr">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-[.2em]"><FiZap className="text-yellow-300" /> StepWise Motion Lab</div>
          <h2 className="text-5xl md:text-7xl lg:text-[88px] leading-[.95] font-black mt-7 tracking-tight">SEE EVERY<br/><span className="text-[#cbe2e7]">ANGLE.</span></h2>
          <p className="max-w-md text-white/75 leading-8 mt-7 mx-auto lg:mx-0">One shoe, eight real angles. Drag to inspect every design detail and choose with confidence before you buy.</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
            <button onClick={() => setAutoSpin((value) => !value)} className="bg-white text-[#075d72] h-12 px-6 rounded-full font-bold flex items-center gap-3 hover:scale-105 duration-300"><FiRotateCw className={autoSpin ? "animate-spin" : ""} />{autoSpin ? "Pause rotation" : "Auto rotate"}</button>
            <a href="#shop" className="border border-white/40 h-12 px-6 rounded-full font-bold flex items-center gap-3 hover:bg-white/10 duration-300">Explore shoes <FiArrowRight /></a>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-12 border-t border-white/20 pt-6"><div><b className="text-2xl">8</b><small className="block text-white/60 mt-1">Real angles</small></div><div><b className="text-2xl">360°</b><small className="block text-white/60 mt-1">Full control</small></div><div><b className="text-2xl">HD</b><small className="block text-white/60 mt-1">Fine detail</small></div></div>
        </div>

        <div className="order-1 lg:order-2 relative min-h-[420px] lg:min-h-[640px] grid place-items-center [perspective:1100px]" onPointerDown={(event) => { setDragging(true); setAutoSpin(false); startX.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={drag} onPointerUp={() => setDragging(false)}>
          <div className="absolute w-[90%] aspect-square rounded-full border border-white/20" />
          <div className="absolute w-[68%] aspect-square rounded-full border border-white/20" />
          <div className="absolute w-[80%] h-[36%] rounded-[50%] border border-white/30 rotate-[-12deg]" />
          <span className="absolute text-[12rem] md:text-[18rem] font-black text-white/[.08]">360</span>
          <img src={frames[frame]} alt={`Angle ${frame + 1} of the Aero Motion shoe`} className="relative z-10 w-[115%] max-w-[850px] object-contain drop-shadow-[0_38px_30px_rgba(8,41,53,.45)] select-none duration-150" draggable="false" />
          <div className="absolute bottom-0 md:bottom-8 flex items-center gap-3 bg-[#173a4a]/75 backdrop-blur-md px-5 py-3 rounded-full text-xs font-bold"><FiRotateCw /> Drag the shoe to rotate <span className="w-8 h-8 rounded-full bg-white text-[#0791b1] grid place-items-center">{frame + 1}</span></div>
          <div className="absolute top-[22%] right-0 md:right-[7%] bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-3 rounded-xl"><b className="block text-sm">AeroMesh™</b><small className="text-white/60">Breathable upper</small></div>
          <div className="absolute bottom-[22%] left-0 md:left-[5%] bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-3 rounded-xl"><b className="block text-sm">CloudCore</b><small className="text-white/60">Ultra-light foam</small></div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
