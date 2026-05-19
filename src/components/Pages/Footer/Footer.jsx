import { SiShopify } from "react-icons/si";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-base-200 text-headings p-10">
        <aside>
          <Link to="/">
            <SiShopify className="text-5xl" />
          </Link>
          <p className="font-bold text-2xl">Bazario Ltd.</p>
          <p className="font-semibold text-xl text-descriptions">
            Providing reliable tech since 2021
          </p>
          <p className="text-base text-descriptions">
            Copyright © {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link
              to="https://x.com/"
              target="_blank"
              className="btn border-none shadow-none text-blue-500 bg-transparent"
            >
              <FaTwitter className="text-3xl" />
            </Link>
            <Link
              to="https://www.youtube.com/"
              target="_blank"
              className="btn border-none shadow-none text-red-500 bg-transparent"
            >
              <FaYoutube className="text-3xl" />
            </Link>
            <Link
              to="https://www.facebook.com/"
              target="_blank"
              className="btn border-none shadow-none text-blue-500 bg-transparent"
            >
              <FaFacebookF className="text-3xl" />
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
