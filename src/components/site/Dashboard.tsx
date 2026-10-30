/* The dark trading dashboard seen on every screen in the reference: sidebar, greeting, ranking card,
   key metrics table, a bar chart and a log-scaled line chart. Pure HTML/CSS/SVG, scaled by its container. */
export default function Dashboard({ className = "" }: { className?: string }) {
  const metrics: [string, string, string, string][] = [
    ["Risk-Free Rate", "3.4%", "Sharpe", "3.58"],
    ["Time in Market", "63.9%", "Time in Market", "63.3%"],
    ["Cumulative Return", "242.86%", "Smart Sharpe", "3.16"],
    ["CAGR", "58.12%", "Sortino", "6.82"],
    ["CAGR", "58.12%", "Smart Sortino", "5.2"],
    ["CAGR", "58.12%", "Sortino/√2", "4.68"],
  ];
  const bars = [10, 22, 48, 72, 100, 78, 52, 30, 16, 8];
  return (
    <div className={`dash ${className}`}>
      <aside className="dash-side">
        <img src="/assets/oversite-mark-white.png" alt="" />
        <i /><i /><i />
        <b />
        <i /><i /><i />
      </aside>
      <div className="dash-main">
        <header className="dash-head">
          <div><strong>Hello, Andrew!</strong><span>Friday, September 13</span></div>
          <div className="dash-head-right"><i /><i /><em><u /> Andrew L. ▾</em></div>
        </header>
        <div className="dash-grid">
          <div className="dash-panel dash-rank">
            <span className="dash-pill">Your Ranking № 456896 <b>↗</b></span>
            <span className="dash-hint">What you need to<br />know today</span>
            <strong>Climb the Ranks<br />to the Leaderboard!</strong>
          </div>
          <div className="dash-panel">
            <div className="dash-panel-head"><strong>Key Performance Metrics</strong><span>See all ›</span></div>
            <div className="dash-metrics">
              {metrics.map((m, i) => (
                <div key={i} className="dash-row"><span>{m[0]}</span><em>{m[1]}</em><span>{m[2]}</span><em className={i > 2 ? "neg" : ""}>{m[3]}</em></div>
              ))}
            </div>
          </div>
          <span className="dash-label">Metrics</span>
          <div className="dash-panel dash-chart">
            <strong>Distribution of Monthly Returns</strong>
            <svg viewBox="0 0 200 80" preserveAspectRatio="none">
              {bars.map((h, i) => <rect key={i} x={8 + i * 19} y={76 - h * 0.7} width={12} height={h * 0.7} fill="#2d2d2d" />)}
              <path d="M8 74 C50 70, 70 20, 100 20 S150 70, 196 74" fill="none" stroke="#8a8a8a" strokeWidth="1" />
              <line x1="90" y1="4" x2="90" y2="76" stroke="#666" strokeWidth=".6" strokeDasharray="2 2" />
            </svg>
          </div>
          <div className="dash-panel dash-chart">
            <div className="dash-panel-head"><strong>Cumulative Returns (Log Scaled)</strong><span>• Sortino &nbsp; • Sharpe</span></div>
            <svg viewBox="0 0 200 80" preserveAspectRatio="none">
              {[10, 24, 38, 52, 66].map((y) => <line key={y} x1="8" y1={y} x2="196" y2={y} stroke="#222" strokeWidth=".6" />)}
              <path d="M8 76 L30 70 L50 64 L70 60 L90 52 L110 44 L130 36 L150 30 L165 22 L180 18 L196 8" fill="none" stroke="#bdbdbd" strokeWidth="1" />
              <path d="M8 76 L30 72 L50 68 L70 66 L90 60 L110 56 L130 50 L150 46 L165 40 L180 34 L196 28" fill="none" stroke="#5c6b8a" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
