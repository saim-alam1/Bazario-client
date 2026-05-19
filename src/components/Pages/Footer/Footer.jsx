import { SiNextdotjs } from "react-icons/si";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-[#111827] text-primary-content p-10">
        <aside>
          <Link to="/">
            <SiNextdotjs className="text-5xl" />
          </Link>
          <p className="font-bold text-2xl">ACME Industries Ltd.</p>
          <p className="font-semibold text-xl">
            Providing reliable tech since 1992
          </p>
          <p className="text-[18px]">
            Copyright © {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link to="https://x.com/" target="_blank">
              <FaTwitter className="text-3xl" />
            </Link>
            <Link to="https://www.youtube.com/" target="_blank">
              <FaYoutube className="text-3xl" />
            </Link>
            <Link to="https://www.facebook.com/" target="_blank">
              <FaFacebookF className="text-3xl" />
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
