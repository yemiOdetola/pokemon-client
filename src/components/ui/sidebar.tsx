import { cn } from "@/lib/utils";
import { TowerControl, TrafficCone, CloudLightning, BoxSelect, Box, User2, User } from "lucide-react";

export default function Sidebar() {
  return (
    <nav className="sticky top-0 left-0 hidden h-screen border-r pt-16 md:block w-80">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="block">
            <div className="flex items-center mb-8">
              <span className="relative overflow-hidden">
                <User size={40} />
              </span>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
              </div>
            </div>
            <div className="flex items-center mb-8">
              <span className="relative overflow-hidden">
                <BoxSelect size={40} />
              </span>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
              </div>
            </div>
            <div className="flex items-center mb-8">
              <span className="relative overflow-hidden">
                <BoxSelect size={40} />
              </span>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
              </div>
            </div>
            <div className="flex items-center mb-8">
              <span className="relative overflow-hidden">
                <BoxSelect size={40} />
              </span>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}