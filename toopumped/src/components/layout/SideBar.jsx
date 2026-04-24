import { NavLink } from "react-router-dom";

const navItems = [
  {
    section: "Main",
    items: [
      { to: "/", label: "Dashboard", icon: "⊞" },
      { to: "/workout", label: "Workout Planner", icon: "🏋️" },
      { to: "/calories", label: "Calorie Tracker", icon: "🥗" },
    ],
  },
  {
    section: "Social",
    items: [
      { to: "/leaderboard", label: "Leaderboard", icon: "📊" },
      { to: "/friends", label: "Friends", icon: "👥" },
    ],
  },
  {
    section: "Account",
    items: [
      { to: "/profile", label: "Profile", icon: "👤" },
      { to: "/admin", label: "Admin Panel", icon: "⚙️" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "var(--sidebar-w)",
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: "var(--accent)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#fff", fontSize: 18 }}>⚡</span>
        </div>
        <span
          style={{
            fontFamily: "Bebas Neue",
            fontSize: 26,
            letterSpacing: 1.5,
          }}
        >
          2Pumped
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {navItems.map((section) => (
          <div key={section.section}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "var(--text2)",
                padding: "12px 20px 6px",
              }}
            >
              {section.section}
            </div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 20px",
                  fontSize: 13.5,
                  color: isActive ? "var(--accent)" : "var(--text2)",
                  borderLeft: isActive
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
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
        ))}
      </nav>

      {/* User */}
      <div
        style={{ borderTop: "1px solid var(--border)", padding: "16px 20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--blue-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--blue)",
            }}
          >
            HH
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Harun H.</div>
            <div style={{ fontSize: 11, color: "var(--accent)" }}>
              Absolute Unit
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
