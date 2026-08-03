import { DemoUser } from "@/app/auth/demoAuth";
import { DemoAccountCard } from "./DemoAccountCard";

type DemoAccountsPanelProps = {
  accounts: readonly DemoUser[];
  onSelect: (account: DemoUser) => void;
  busy: boolean;
};

export function DemoAccountsPanel({ accounts, onSelect, busy }: DemoAccountsPanelProps) {
  return (
    <section className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700" aria-label="Demo accounts">
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
        Development Demo Accounts
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Use one of the following accounts for testing purposes.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => (
          <DemoAccountCard
            key={account.id}
            account={account}
            onSelect={onSelect}
            busy={busy}
          />
        ))}
      </div>
    </section>
  );
}
