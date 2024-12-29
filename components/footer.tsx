import FooterCopyright from "./molecules/FooterCopyright";
import FooterLocation from "./molecules/FooterLocation";

export default function Footer() {
  return (
    <footer style={{backgroundImage: "url('/Footer.svg')"}}>
      <FooterLocation />
      <FooterCopyright />
    </footer>
  );
}
