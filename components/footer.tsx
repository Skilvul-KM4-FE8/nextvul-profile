import FooterCopyright from "./molecules/FooterCopyright";
import FooterLocation from "./molecules/FooterLocation";
import QuotesSection from "./quotes-section";

export default function Footer() {
  return (
    <footer className="bg-cover" style={{ backgroundImage: "url('/Footer.svg')" }}>
      <QuotesSection />
      <FooterLocation />
      <FooterCopyright />
    </footer>
  );
}
