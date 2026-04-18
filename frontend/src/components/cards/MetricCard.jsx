function MetricCard({
  label,
  value,
  subtitle,
  accent = "text-[#0f172a]",
  compact = false,
}) {
  return (
    <div
      className={`rounded-3xl border border-[#e7edf5] bg-white ${
        compact ? "p-6" : "p-7"
      } shadow-[0_12px_35px_rgba(15,23,42,0.04)]`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
        {label}
      </p>
      <h3
        className={`mt-3 font-semibold tracking-tight ${
          compact ? "text-3xl" : "text-5xl"
        } ${accent}`}
      >
        {value}
      </h3>
      {subtitle ? <p className="mt-3 text-sm text-[#64748b]">{subtitle}</p> : null}
    </div>
  );
}

export default MetricCard;
