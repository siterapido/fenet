export default function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2a1515] to-[#0d0d0d]" />

      {/* Animated blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #F4141A 0%, transparent 70%)",
          top: "-150px",
          right: "-100px",
          animation: "blob-move 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #ff6b6b 0%, transparent 70%)",
          bottom: "-100px",
          left: "-80px",
          animation: "blob-move-2 15s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-8"
        style={{
          background: "radial-gradient(circle, #C01015 0%, transparent 70%)",
          top: "40%",
          left: "40%",
          animation: "blob-move 20s ease-in-out infinite reverse",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
