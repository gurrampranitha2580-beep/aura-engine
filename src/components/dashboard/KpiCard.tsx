type KpiCardProps = {
  label: string;
  value: string;
  description: string;
  descriptionClassName?: string;
};

export default function KpiCard({
  label,
  value,
  description,
  descriptionClassName = "text-white/35",
}: KpiCardProps) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111419] p-5">
      <p className="text-[11px] uppercase tracking-[0.12em] text-white/35">
        {label}
      </p>

      <p className="mt-4 text-[30px] font-semibold tracking-[-0.03em]">
        {value}
      </p>

      <p className={`mt-2 text-[11px] ${descriptionClassName}`}>
        {description}
      </p>
    </div>
  );
}