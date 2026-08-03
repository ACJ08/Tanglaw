
import { useState } from "react";
import { Copy, Check, User, Mail, Lock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { DemoUser } from "@/app/auth/demoAuth";

type DemoAccountCardProps = {
  account: DemoUser;
  onSelect: (account: DemoUser) => void;
  busy: boolean;
};

const CopyButton = ({ textToCopy, itemLabel }: { textToCopy: string; itemLabel: string; }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0" onClick={handleCopy} aria-label={`Copy ${itemLabel}`}>
      {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
    </Button>
  );
};

export function DemoAccountCard({ account, onSelect, busy }: DemoAccountCardProps) {
  const roleDisplayName = account.role === "ngo" ? "NGO / Org" : account.role.charAt(0).toUpperCase() + account.role.slice(1);
  return (
    <Card className="flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-xl hover:border-blue-500/50 dark:hover:shadow-blue-500/10 min-w-[300px] rounded-2xl">
      <CardHeader className="p-6">
        <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-2xl font-bold">{account.fullName}</CardTitle>
            <User className="h-8 w-8 text-slate-400 flex-shrink-0" />
        </div>
        <Badge variant="secondary" className="text-sm font-semibold py-1 px-3 self-start">{roleDisplayName}</Badge>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6">
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</label>
            <div className="flex items-center justify-between gap-3">
                <Mail className="h-5 w-5 text-slate-500 flex-shrink-0"/>
                <p className="flex-grow text-base font-mono break-all">{account.email}</p>
                <CopyButton textToCopy={account.email} itemLabel="Email"/>
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Password</label>
            <div className="flex items-center justify-between gap-3">
                <Lock className="h-5 w-5 text-slate-500 flex-shrink-0"/>
                <p className="flex-grow text-base font-mono break-all">{account.password}</p>
                <CopyButton textToCopy={account.password} itemLabel="Password"/>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full h-12 text-base font-bold rounded-xl"
          onClick={() => onSelect(account)}
          disabled={busy}
        >
          Sign in as {roleDisplayName}
        </Button>
      </CardFooter>
    </Card>
  );
}
