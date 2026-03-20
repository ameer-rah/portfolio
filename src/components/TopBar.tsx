import { Link } from 'react-router-dom';

const BINARY = '01110000 01101000 01110010 01100001 01100011 01101011 00100000 01000001 01010010';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <span className="top-bar-binary">{BINARY}</span>
        <Link to="/" className="top-bar-title" style={{ textDecoration: 'none', cursor: 'pointer' }}>AMEERRAHMAN.DEV</Link>
        <span className="top-bar-binary">{BINARY}</span>
      </div>
      <div className="top-bar-right">
        <span className="hp-label">HP</span>
        <div className="hp-hearts">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="hp-block" style={{ animationDelay: `${(i-1)*0.15}s` }} />
          ))}
        </div>
        <span className="level-badge">LVL 21</span>
      </div>
    </div>
  );
}
