import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { Benefits } from "@/components/Benefits";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { LandingTracker } from "@/components/LandingTracker";

export default function Home() {
  return (
    <>
      <LandingTracker />
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <Hero />
        <Proof />
        <Benefits />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
