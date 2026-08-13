import { FormEvent, useEffect, useId, useState } from "react";
import { Building2, Mail, MapPin, Send, User } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/app/context/ThemeContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { HUB_TYPES } from "@/app/lib/truthHubData";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[\d\s+\-().]{7,}$/;

export interface PartnershipFormData {
  organizationName: string;
  contactPerson: string;
  location: string;
  organizationType: string;
  email: string;
  phone: string;
  reason: string;
}

const emptyForm: PartnershipFormData = {
  organizationName: "",
  contactPerson: "",
  location: "",
  organizationType: "",
  email: "",
  phone: "",
  reason: "",
};

interface TruthHubPartnershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TruthHubPartnershipDialog({ open, onOpenChange }: TruthHubPartnershipDialogProps) {
  const { isDark } = useTheme();
  const formId = useId();
  const [form, setForm] = useState<PartnershipFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof PartnershipFormData, string>>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
      setErrors({});
      setBusy(false);
    }
  }, [open]);

  const fieldClass = isDark
    ? "border-white/12 bg-white/5 text-white placeholder:text-blue-200/30"
    : "border-slate-200 bg-white placeholder:text-slate-400";
  const labelClass = isDark ? "text-blue-200/80" : "text-slate-600";

  const validate = (): boolean => {
    const next: Partial<Record<keyof PartnershipFormData, string>> = {};
    if (!form.organizationName.trim()) next.organizationName = "Enter your organization or community name.";
    if (!form.contactPerson.trim()) next.contactPerson = "Enter a contact person.";
    if (!form.location.trim()) next.location = "Enter your location.";
    if (!form.organizationType) next.organizationType = "Select an organization type.";
    if (!form.email.trim()) next.email = "Enter an email address.";
    else if (!emailPattern.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Enter a phone number.";
    else if (!phonePattern.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!form.reason.trim()) next.reason = "Tell us why you want to partner.";
    else if (form.reason.trim().length < 20) next.reason = "Please provide at least 20 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setBusy(false);
    onOpenChange(false);
    toast.success("Partnership application received!", {
      description: "Our team will review your request and contact you within 5 business days.",
    });
  };

  const set = (key: keyof PartnershipFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-lg ${isDark ? "border-white/12 bg-[#0C1A3A] text-white" : "border-slate-200 bg-white"}`}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "var(--tng-text-1)" }}>Apply for Truth Hub Partnership</DialogTitle>
          <DialogDescription className={isDark ? "text-blue-200/60" : "text-slate-500"}>
            Submit your interest to host a community verification center. This is a prototype form — applications are not persisted to a backend.
          </DialogDescription>
        </DialogHeader>

        <form id={formId} onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-org`} className={labelClass}>
              <Building2 size={14} aria-hidden /> Organization / community name
            </Label>
            <Input
              id={`${formId}-org`}
              value={form.organizationName}
              onChange={(e) => set("organizationName", e.target.value)}
              aria-invalid={!!errors.organizationName}
              aria-describedby={errors.organizationName ? `${formId}-org-error` : undefined}
              className={fieldClass}
              placeholder="e.g. Brgy. 15 Community Council"
            />
            {errors.organizationName && (
              <p id={`${formId}-org-error`} role="alert" className="text-xs text-red-400">
                {errors.organizationName}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-contact`} className={labelClass}>
              <User size={14} aria-hidden /> Contact person
            </Label>
            <Input
              id={`${formId}-contact`}
              value={form.contactPerson}
              onChange={(e) => set("contactPerson", e.target.value)}
              aria-invalid={!!errors.contactPerson}
              aria-describedby={errors.contactPerson ? `${formId}-contact-error` : undefined}
              className={fieldClass}
              placeholder="Full name"
            />
            {errors.contactPerson && (
              <p id={`${formId}-contact-error`} role="alert" className="text-xs text-red-400">
                {errors.contactPerson}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-location`} className={labelClass}>
              <MapPin size={14} aria-hidden /> Location
            </Label>
            <Input
              id={`${formId}-location`}
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? `${formId}-location-error` : undefined}
              className={fieldClass}
              placeholder="Barangay, city, province"
            />
            {errors.location && (
              <p id={`${formId}-location-error`} role="alert" className="text-xs text-red-400">
                {errors.location}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-type`} className={labelClass}>
              Organization type
            </Label>
            <Select value={form.organizationType} onValueChange={(v) => set("organizationType", v)}>
              <SelectTrigger
                id={`${formId}-type`}
                aria-invalid={!!errors.organizationType}
                aria-describedby={errors.organizationType ? `${formId}-type-error` : undefined}
                className={fieldClass}
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className={isDark ? "border-white/12 bg-[#0C1A3A] text-white" : undefined}>
                {HUB_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other community organization</SelectItem>
              </SelectContent>
            </Select>
            {errors.organizationType && (
              <p id={`${formId}-type-error`} role="alert" className="text-xs text-red-400">
                {errors.organizationType}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-email`} className={labelClass}>
                <Mail size={14} aria-hidden /> Email
              </Label>
              <Input
                id={`${formId}-email`}
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                className={fieldClass}
                placeholder="contact@example.org"
              />
              {errors.email && (
                <p id={`${formId}-email-error`} role="alert" className="text-xs text-red-400">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-phone`} className={labelClass}>
                Phone
              </Label>
              <Input
                id={`${formId}-phone`}
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                className={fieldClass}
                placeholder="+63 912 345 6789"
              />
              {errors.phone && (
                <p id={`${formId}-phone-error`} role="alert" className="text-xs text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${formId}-reason`} className={labelClass}>
              Reason for partnership
            </Label>
            <Textarea
              id={`${formId}-reason`}
              value={form.reason}
              onChange={(e) => set("reason", e.target.value)}
              aria-invalid={!!errors.reason}
              aria-describedby={errors.reason ? `${formId}-reason-error` : undefined}
              className={fieldClass}
              rows={3}
              placeholder="Describe your community's need for a Truth Hub and how you plan to support validators."
            />
            {errors.reason && (
              <p id={`${formId}-reason-error`} role="alert" className="text-xs text-red-400">
                {errors.reason}
              </p>
            )}
          </div>
        </form>

        <DialogFooter className="gap-2 sm:gap-0">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={busy}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${isDark ? "border border-white/12 text-blue-200/70 hover:bg-white/5" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            form={formId}
            disabled={busy}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Send size={14} aria-hidden />
            {busy ? "Submitting…" : "Submit Application"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
