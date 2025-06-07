import LankaCalc from '@/components/lanka-calc';
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background selection:bg-accent selection:text-accent-foreground">
      <LankaCalc />
      <Toaster />
    </main>
  );
}
