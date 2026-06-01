interface Props {
  className?: string;
  showTag?: boolean;
}

export function RasaLogo({ className = "", showTag = false }: Props) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <span className="font-serif text-2xl md:text-3xl tracking-[0.4em] text-gold">
        RASA
      </span>
      {showTag && (
        <span className="mt-1 text-[0.6rem] md:text-xs tracking-luxe text-muted-foreground uppercase">
          Smoke, Perfected
        </span>
      )}
    </div>
  );
}
