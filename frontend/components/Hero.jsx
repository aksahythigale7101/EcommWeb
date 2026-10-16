import Link from "next/link";

const Hero = () => (
  <section className="relative overflow-hidden rounded-[28px] px-7 py-12 sm:px-12 sm:py-16" style={{background:"#eaf1e6"}}>
    <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full opacity-70" style={{background:"#d8f36a"}} />
    <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
      <div>
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-900/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[.16em]" style={{color:"#176b4d"}}>
          <span className="h-2 w-2 rounded-full" style={{background:"#176b4d"}} /> Everyday finds, thoughtfully picked
        </span>
        <h1 className="mb-5 max-w-xl text-4xl font-extrabold leading-tight sm:text-6xl">Good things.<br/><span style={{color:"#176b4d"}}>Better living.</span></h1>
        <p className="mb-8 max-w-md text-base leading-7 text-gray-600">Discover fresh styles, smart essentials and little upgrades for every corner of your life.</p>
        <Link href="/product" className="inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-bold text-white" style={{background:"#176b4d"}}>Explore the collection <span aria-hidden="true">↗</span></Link>
        <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600"><span>✓ Curated essentials</span><span>✓ Easy checkout</span></div>
      </div>
      <div className="relative mx-auto w-full max-w-lg">
        <div className="absolute inset-5 rounded-[36px] rotate-3" style={{background:"#d8f36a"}} />
        <img src="/hero-image.png" alt="Discover the latest collection" className="relative z-10 max-h-[350px] w-full rounded-[28px] object-contain drop-shadow-xl" />
        <div className="absolute -bottom-3 -left-3 z-20 rounded-2xl bg-white px-5 py-4 shadow-lg"><p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Your everyday edit</p><p className="text-lg font-extrabold">Made for you ✳</p></div>
      </div>
    </div>
  </section>
);
export default Hero;
