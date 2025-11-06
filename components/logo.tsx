export function VibenPayLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  return (
    <svg viewBox="0 0 100 100" className={`${sizes[size]} fill-none`} xmlns="http://www.w3.org/2000/svg">
      {/* Blue circles */}
      <circle cx="35" cy="25" r="12" fill="#0000ff" />
      <circle cx="35" cy="50" r="12" fill="#0000ff" />
      <circle cx="35" cy="75" r="12" fill="#0000ff" />
      {/* Mint circles */}
      <circle cx="65" cy="35" r="12" fill="#1fffc3" />
      <circle cx="65" cy="60" r="12" fill="#1fffc3" />
      <circle cx="65" cy="85" r="12" fill="#1fffc3" />
      {/* Connecting lines */}
      <line x1="47" y1="25" x2="53" y2="35" stroke="#0000ff" strokeWidth="2" />
      <line x1="47" y1="50" x2="53" y2="60" stroke="#0000ff" strokeWidth="2" />
      <line x1="47" y1="75" x2="53" y2="85" stroke="#0000ff" strokeWidth="2" />
    </svg>
  )
}
