import { Link } from "react-router-dom";
import { Wheat, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-stone-950 border-t border-stone-800 text-stone-300 mt-auto transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-md shadow-amber-600/20 text-white">
                <Wheat size={20} />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                DesiCane
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Precision Crop Telemetry, Microclimate Advisory & Sugarcane Milling Intelligence.
            </p>
            <p className="text-stone-500 text-[11px] mt-3">
              KIAAR × Godavari Biorefineries Ltd.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { to: "/analysis", label: "Yield & Sucrose Analytics" },
                { to: "/weather", label: "Microclimate Telemetry" },
                { to: "/iot", label: "IoT Sensor Mesh" },
                { to: "/inventory", label: "Cane Stocks & Fertilizer" },
                { to: "/reports", label: "Diagnostics & Audits" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-4">
              Console Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { to: "/home", label: "Command Center" },
                { to: "/analysis", label: "Ripening Index (Brix)" },
                { to: "/reports", label: "Compliance Records" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-4">
              Field Station
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2 text-stone-400">
                <MapPin size={15} className="shrink-0 mt-0.5 text-amber-500" />
                <span>KIAAR Agronomy Campus, Karnataka 590001</span>
              </li>
              <li className="flex items-center gap-2 text-stone-400">
                <Phone size={15} className="shrink-0 text-amber-500" />
                <span>1800-XXX-XXXX (Toll Free Station)</span>
              </li>
              <li className="flex items-center gap-2 text-stone-400">
                <Mail size={15} className="shrink-0 text-amber-500" />
                <span>support@desicane.internal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800/80 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-stone-500">
            © 2026 DesiCane OS. All rights reserved.
          </p>
          <p className="text-xs text-stone-500">
            Sugarcane Research & Industrial Yield Division
          </p>
        </div>
      </div>
    </footer>
  );
}
