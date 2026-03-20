export default function GameFooter() {
  return (
    <div className="game-footer">
      <div className="exp-section">
        <span className="exp-label">EXP</span>
        <div className="exp-bar-track">
          <div className="exp-bar-fill" />
        </div>
        <span className="exp-value">7842 / 10000</span>
      </div>
      <div className="controls-hint">
        <span>◄ ► NAVIGATE</span>
        <span>CLICK SELECT</span>
      </div>
    </div>
  );
}
