import { Mail, MapPin, Phone } from "lucide-react";
import { columns, SOCIALS } from "../../data/footerData";
import { SocialIcon } from "../../utils/SocialIcon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary-700 text-gray-300 mt-24">
      <div className="container-app pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 pb-12 border-b border-white/10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-app-sm bg-primary-600 flex items-center justify-center">
                <span className="text-white font-black text-lg">V</span>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Vela
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Premium products, honest prices, and shipping you can set your
              watch to.
            </p>
            <div className="flex flex-col gap-2 mt-5 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={15} /> Alexandria, Egypt
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} /> +20 100 000 0000
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} /> support@vela.shop
              </div>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-gray-500 order-2 sm:order-1">
            © {new Date().getFullYear()} Vela Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-3 order-1 sm:order-2">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary-600 flex items-center justify-center transition-colors"
              >
                <SocialIcon path={s.path} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
