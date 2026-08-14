import Banner from "@/components/Home/Banner/Banner";
import TrustBadges from "@/components/Home/TrustBadges/TrustBadges";
import VideoShowcase from "@/components/Home/VideoShowcase/VideoShowcase";
import ProcessSteps from "@/components/Home/ProcessSteps/ProcessSteps";
import TwoPillars from "@/components/Home/TwoPillars/TwoPillars";
import Portfolio from "@/components/Home/Portfolio/Portfolio";
import LatestInsights from "@/components/Home/LatestInsights/LatestInsights";
import CallToAction from "@/components/Home/CallToAction/CallToAction";
import Faq from "@/components/Home/Faq/Faq";
import Contact from "@/components/Home/Contact/Contact";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Banner />
      <TrustBadges />
      <VideoShowcase />
      <ProcessSteps />
      <TwoPillars />
      <Portfolio />
      <CallToAction />
      <LatestInsights />
      <Faq />
      <Contact />
    </div>
  );
}
