import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { useTheme } from "@/app/context/ThemeContext";
import { ReportCategory, REPORT_CATEGORIES } from "./community.types";

interface SubmitReportDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: { title: string; body: string; type: ReportCategory; location: string; }) => void;
}

export function SubmitReportDialog({ isOpen, onOpenChange, onSubmit }: SubmitReportDialogProps) {
  const { isDark } = useTheme();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState<ReportCategory>("Misinformation");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !body.trim() || !location.trim()) {
      toast.error("Please fill out all required fields: Title, Description, and Location.");
      return;
    }
    onSubmit({ title, body, type, location });
    onOpenChange(false);
    // Reset form
    setTitle("");
    setBody("");
    setType("Misinformation");
    setLocation("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={isDark ? "bg-[#0C1A3A] border-white/15" : ""}>
        <DialogHeader>
          <DialogTitle style={{ color: "var(--tng-text-1)" }}>Submit a Community Report</DialogTitle>
          <DialogDescription style={{ color: "var(--tng-text-3)" }}>
            Your report helps protect the community. Please provide as much detail as possible.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right text-sm" style={{ color: "var(--tng-text-2)" }}>Title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={`col-span-3 p-2 rounded-md text-sm border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="body" className="text-right text-sm pt-2" style={{ color: "var(--tng-text-2)" }}>Description</label>
            <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} rows={4} className={`col-span-3 p-2 rounded-md text-sm border resize-none ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="type" className="text-right text-sm" style={{ color: "var(--tng-text-2)" }}>Category</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value as ReportCategory)} className={`col-span-3 p-2 rounded-md text-sm border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              {REPORT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="location" className="text-right text-sm" style={{ color: "var(--tng-text-2)" }}>Location</label>
            <input id="location" placeholder="e.g., Brgy. 15, San Pablo" value={location} onChange={(e) => setLocation(e.target.value)} className={`col-span-3 p-2 rounded-md text-sm border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`} />
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-sm"
          >
            Submit Report
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}