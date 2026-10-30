import Dashboard from "./Dashboard";

/* A laptop built from CSS: bezelled screen with the dashboard inside, hinge and a keyboard deck.
   `view` picks the camera: "front" for the hero, "iso" for the leaderboard product card. */
export default function Laptop({ view = "front", screen }: { view?: "front" | "iso"; screen?: React.ReactNode }) {
  return (
    <div className={`laptop laptop-${view}`}>
      <div className="laptop-screen">
        <div className="laptop-bezel">
          <div className="laptop-cam" />
          {screen ?? <Dashboard />}
        </div>
      </div>
      <div className="laptop-hinge" />
      <div className="laptop-base">
        <div className="laptop-keys">
          {Array.from({ length: 5 }).map((_, r) => (
            <div key={r} className="laptop-row">
              {Array.from({ length: r === 4 ? 9 : 14 }).map((__, k) => <i key={k} className={r === 4 && k === 4 ? "space" : undefined} />)}
            </div>
          ))}
        </div>
        <div className="laptop-trackpad" />
      </div>
    </div>
  );
}
