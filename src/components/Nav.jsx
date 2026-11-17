import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Nav.css";

export default function Nav() {
  return (
    <header className="nav">
      <span className="nav__brand">Brewer Buds</span>
      <div className="actions">
        <nav aria-label="Main">
          <NavLink to="/">Build</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
