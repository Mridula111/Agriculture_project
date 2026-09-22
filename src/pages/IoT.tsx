import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Radio, Activity, Cpu, Wifi } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function IoT() {
  const nodes = [
    { id: "NODE-CAN-01", sector: "Block 1 (North)", soilMoist: "78%", ec: "1.2 dS/m", battery: "94%", status: "Active" },
    { id: "NODE-CAN-02", sector: "Block 2 (Ratoon)", soilMoist: "62%", ec: "1.5 dS/m", battery: "88%", status: "Active" },
    { id: "NODE-CAN-03", sector: "Block 3 (Canal East)", soilMoist: "71%", ec: "1.1 dS/m", battery: "91%", status: "Active" },
    { id: "NODE-CAN-04", sector: "Block 4 (Subsurface Drip)", soilMoist: "84%", ec: "1.4 dS/m", battery: "79%", status: "Active" },
  ];

  return (
    <div className="flex min-h-screen bg-stone-950 text-stone-100 w-full">
      <Navbar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 lg:p-10 w-full max-w-[1600px] mx-auto space-y-6">
          <header className="pb-8 border-b border-stone-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Sensor Telemetry Mesh
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              IoT Edge Gateways & Soil Probes
            </h1>
            <p className="text-stone-400 text-sm mt-1">
              Real-time wireless capacitive sensors, salinity probes, and valve actuators.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nodes.map((node) => (
              <Card key={node.id} className="bg-stone-900 border-stone-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <span className="text-xs font-mono font-bold text-amber-400">{node.id}</span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <Wifi size={12} /> {node.status}
                  </span>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <p className="text-stone-300 font-semibold">{node.sector}</p>
                  <div className="flex justify-between text-stone-400 pt-2 border-t border-stone-800">
                    <span>Soil Moisture:</span>
                    <span className="text-white font-mono">{node.soilMoist}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Conductivity (EC):</span>
                    <span className="text-white font-mono">{node.ec}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Gateway Battery:</span>
                    <span className="text-amber-400 font-mono">{node.battery}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
