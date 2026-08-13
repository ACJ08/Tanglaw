import { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { CommunityReport, ReportCategory, REPORT_CATEGORIES } from "./community.types";

interface SubmitReportDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (report: Omit<CommunityReport, 'id' | 'createdAt' | 'user' | 'userId' | 'role' | 'isVerified' | 'votes'>) => void;
}

export function SubmitReportDialog({ isOpen, onOpenChange, onSubmit }: SubmitReportDialogProps) {
  const { isDark } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ReportCategory | "">("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (title && description && category) {
      onSubmit({ title, body: description, type: category, status: 'Unverified', location: location || 'Unknown' });
      onOpenChange(false);
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
    } else {
      // Basic validation feedback
      alert("Please fill in Title, Description, and select a Category.");
    }
  };

  const dialogContentClasses = isDark
    ? "bg-slate-950 border-slate-800"
    : "bg-white";

  const inputClasses = isDark
    ? "bg-slate-900 border-slate-700 placeholder:text-slate-500"
    : "bg-slate-50 border-slate-200 placeholder:text-slate-500";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[425px] ${dialogContentClasses}`}>
        <DialogHeader>
          <DialogTitle style={{ color: "var(--tng-text-1)" }}>
            Submit a Community Report
          </DialogTitle>
          <DialogDescription style={{ color: "var(--tng-text-3)" }}>
            Your report helps protect the community. Please provide as much detail as possible.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right" style={{ color: "var(--tng-text-2)" }}>
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Fake Job Offer via SMS" className={`col-span-3 ${inputClasses}`} />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2" style={{ color: "var(--tng-text-2)" }}>
              Description
            </Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the suspicious message, post, or event..." className={`col-span-3 ${inputClasses}`} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
             <Label className="text-right" style={{ color: "var(--tng-text-2)" }}>
              Category
            </Label>
            <div className="col-span-3 flex flex-wrap gap-2">
              {REPORT_CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                const lightClasses = isSelected ? 'bg-[#F5B800] text-black font-semibold' : 'bg-slate-100 hover:bg-slate-200 text-slate-600';
                const darkClasses = isSelected ? 'bg-[#F5B800] text-black font-semibold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300';
                return (
                  <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1 text-xs rounded-full transition-colors ${isDark ? darkClasses : lightClasses}`}>
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right" style={{ color: "var(--tng-text-2)" }}>
              Location
            </Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Manila, PH (Optional)" className={`col-span-3 ${inputClasses}`} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className={isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : ''}>Cancel</Button>
          <button onClick={handleSubmit} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-sm">
            Submit Report
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}