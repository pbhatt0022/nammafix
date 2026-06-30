/**
 * Citizen "your issue was fixed" feed — closes the lifecycle loop. Shows a bell
 * with an unread badge; opening it lists resolutions with before/after proof and
 * deep-links to the report. Pops a celebratory toast when a new resolution lands.
 */
import { useEffect, useRef, useState } from "react";
import { Bell, CheckCircle2, X } from "lucide-react";
import { useT } from "../i18n";

interface Notification {
  id: string;
  reportId: string;
  title: string;
  landmark: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationBell({
  userId,
  apiCount,
  onOpenReport,
}: {
  userId: string;
  apiCount: number;
  onOpenReport: (reportId: string) => void;
}) {
  const { t } = useT();
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<Notification | null>(null);
  const prevUnread = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const unread = items.filter((n) => !n.read).length;

  const load = async () => {
    try {
      const res = await fetch(`/api/notifications?userId=${userId}`);
      if (res.ok) setItems(await res.json());
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  };

  // Refetch on mount and whenever an action happens (apiCount bumps).
  useEffect(() => { load(); }, [apiCount, userId]);

  // Celebrate a freshly-arrived resolution (unread count went up).
  useEffect(() => {
    if (prevUnread.current !== null && unread > prevUnread.current) {
      const fresh = items.find((n) => !n.read);
      if (fresh) { setToast(fresh); setTimeout(() => setToast(null), 5000); }
    }
    prevUnread.current = unread;
  }, [unread, items]);

  // Close the dropdown on outside click.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && unread > 0) {
      await fetch("/api/notifications/read", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId }) });
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const openReport = (reportId: string) => { setOpen(false); onOpenReport(reportId); };

  return (
    <div className="relative shrink-0" ref={wrapRef}>
      <button
        onClick={toggle}
        title={t("notif.heading")}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-ink/15 bg-white text-indigoc hover:border-indigoc/40 transition-colors"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sindoor px-1 text-[9px] font-black text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-[420px] overflow-y-auto rounded-xl border border-ink/15 bg-white shadow-xl z-[1200]">
          <div className="sticky top-0 bg-white px-4 py-2.5 border-b border-slate-100">
            <span className="font-display text-sm font-extrabold text-indigoc">{t("notif.heading")}</span>
          </div>
          {items.length === 0 ? (
            <p className="px-4 py-6 text-center text-xs text-slate-400 italic">{t("notif.empty")}</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {items.map((n) => (
                <li key={n.id}>
                  <button onClick={() => openReport(n.reportId)} className="w-full text-left px-4 py-3 hover:bg-leaf/5 flex gap-3">
                    <div className="flex shrink-0 gap-1">
                      {n.beforeImageUrl && <img src={n.beforeImageUrl} alt={t("notif.before")} className="h-10 w-10 rounded object-cover border border-slate-200" />}
                      {n.afterImageUrl && <img src={n.afterImageUrl} alt={t("notif.after")} className="h-10 w-10 rounded object-cover border border-leaf/40" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-leaf shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-leaf">{t("notif.resolved")}</span>
                      </div>
                      <p className="text-[11px] font-bold text-ink leading-tight truncate">{n.title}</p>
                      <p className="text-[10px] text-slate-500 leading-tight">{t("notif.fixed")} · {n.landmark}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Celebratory toast on a freshly-arrived resolution */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[1300] w-80 rounded-xl border-2 border-leaf/40 bg-white shadow-2xl p-4 animate-fade-in">
          <button onClick={() => setToast(null)} className="absolute top-2 right-2 text-slate-300 hover:text-slate-500"><X className="h-3.5 w-3.5" /></button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">🎉</span>
            <span className="font-display text-sm font-extrabold text-leaf">{t("notif.toast")}</span>
          </div>
          <p className="text-xs text-ink/70 leading-snug">{toast.title} · {toast.landmark}</p>
          <button onClick={() => openReport(toast.reportId)} className="mt-2 text-[11px] font-black uppercase tracking-wider text-indigoc hover:underline">
            {t("notif.view")} →
          </button>
        </div>
      )}
    </div>
  );
}
