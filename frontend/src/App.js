import React from "react";
import "@/App.css";
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import SaasHero from '@/components/SaasHero';
import ValueProposition from '@/components/ValueProposition';
import Solutions from '@/components/Solutions';
import DataVisualization from '@/components/DataVisualization';
import Industries from '@/components/Industries';
import Pricing from '@/components/Pricing';
import CaseStudies from '@/components/CaseStudies';
import TechnologyStack from '@/components/TechnologyStack';
import FinalCTA from '@/components/FinalCTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <SaasHero />
        <ValueProposition />
        <Solutions />
        <DataVisualization />
        <Industries />
        <Pricing />
        <CaseStudies />
        <TechnologyStack />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
