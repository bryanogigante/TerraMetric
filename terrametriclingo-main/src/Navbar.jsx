import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <style>{`
        .navbar {
          background-color: #000000ef;
          color: white;
          padding: 16px 24px;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          text-decoration: none;
        }
        .menu {
          display: flex;
          gap: 24px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .menu-link {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .menu-link:hover {
          color: #364e3f;
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-container">

          <Link to="/" className="logo">
            TerraMetric
          </Link>

          <ul className="menu">
            <li><Link to="/" className="menu-link">Home</Link></li>
            <li><Link to="/questionario" className="menu-link">Questionario</Link></li>
            <li><Link to="/vitrine" className="menu-link">Vitrine</Link></li>
            <li><Link to="/learn" className="menu-link">TerraMetricLearn</Link></li>
            <li><Link to="/dashboard" className="menu-link">Dashboard</Link></li>
            <li><Link to="/loginsingup" className="menu-link">Login/Signup</Link></li>
          </ul>

        </div>
      </nav>
    </>
  );
}
