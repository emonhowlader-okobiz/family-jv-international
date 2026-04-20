import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Banner } from "@/components/landing/Banner";
import ExportSection from "@/components/landing/ExportSection";
import ImportSection from "@/components/landing/ImportSection";
import AboutUsSection from "@/components/landing/AboutUsSection";
import PartnerLogoSection from "@/components/landing/PartnerLogoSection";
import MissionVision from "@/components/landing/MissionVision";
import Cta from "@/components/landing/Cta";

export default function Home() {
  return (
    <>
      <Banner />
      <ExportSection />
      <ImportSection />
      <AboutUsSection />
      <PartnerLogoSection />
      <MissionVision />
      <Cta />
    </>
  );
}
