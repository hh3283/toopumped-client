import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  {
    section: "Main",
    roles: ["STANDARD", "COMPETITOR", "ADMIN"],
    items: [
      { to: "/", label: "Dashboard", icon: "⊞", roles: ["STANDARD", "COMPETITOR", "ADMIN"] },
      { to: "/workout", label: "Workout Planner", icon: "🏋️", roles: ["STANDARD", "COMPETITOR", "ADMIN"] },
      { to: "/calories", label: "Calorie Tracker", icon: "🥗", roles: ["STANDARD", "COMPETITOR", "ADMIN"] },
    ],
  },
  {
    section: "Social",
    roles: ["COMPETITOR", "ADMIN"],
    items: [
      { to: "/leaderboard", label: "Leaderboard", icon: "📊", roles: ["COMPETITOR", "ADMIN"] },
      { to: "/friends", label: "Friends", icon: "👥", roles: ["STANDARD", "COMPETITOR", "ADMIN"] },
    ],
  },
  {
    section: "Account",
    roles: ["STANDARD", "COMPETITOR", "ADMIN"],
    items: [
      { to: "/profile", label: "Profile", icon: "👤", roles: ["STANDARD", "COMPETITOR", "ADMIN"] },
      { to: "/admin", label: "Admin Panel", icon: "⚙️", roles: ["ADMIN"] },
    ],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || "STANDARD";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.username?.slice(0, 2).toUpperCase() || "??";

  return (
    <aside style={{
      width: "var(--sidebar-w)",
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      height: "100vh",
      position: "sticky",
      top: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: "24px 20px 20px",
        display: "flex", alignItems: "center", gap: 10,
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          width: 36, height: 36, background: "var(--accent)",
          borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "#fff", fontSize: 18 }}>⚡</span>
        </div>
        <span style={{ fontFamily: "Bebas Neue", fontSize: 26, letterSpacing: 1.5 }}>
          2Pumped
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {navItems.map((section) => {
          const visibleItems = section.items.filter(item => item.roles.includes(role));
          if (visibleItems.length === 0) return null;

          return (
            <div key={section.section}>
              <div style={{
                fontSize: 10, fontWeight: 600, letterSpacing: 1,
                textTransform: "uppercase", color: "var(--text2)",
                padding: "12px 20px 6px",
              }}>
                {section.section}
              </div>
              {visibleItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  style={({ isActive }) => ({
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 20px", fontSize: 13.5,
                    color: isActive ? "var(--accent)" : "var(--text2)",
                    borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                    background: isActive ? "var(--accent-light)" : "transparent",
                    fontWeight: isActive ? 500 : 400,
                    textDecoration: "none",
                    transition: "all 0.15s",
                  })}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "var(--blue-light)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "var(--blue)",
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.username}</div>
            <div style={{ fontSize: 11, color: "var(--accent)" }}>{role}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          width: "100%", padding: "7px",
          background: "transparent", border: "1px solid var(--border)",
          borderRadius: 8, fontSize: 12, color: "var(--text2)",
          cursor: "pointer", fontFamily: "DM Sans",
        }}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}