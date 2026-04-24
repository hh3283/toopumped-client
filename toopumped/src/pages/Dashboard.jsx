import MetricCard from "../components/ui/MetricCard";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{ fontFamily: "Bebas Neue", fontSize: 32, letterSpacing: 1 }}
        >
          Dashboard
        </div>
        <div style={{ fontSize: 13, color: "var(--text2)" }}>
          Welcome back, Harun!
        </div>
      </div>

      {/* Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <MetricCard
          label="🔥 Streak"
          value="14"
          badge="↑ days active"
          badgeType="up"
        />
        <MetricCard
          label="⚡ Points"
          value="2,840"
          badge="+120 today"
          badgeType="up"
        />
        <MetricCard
          label="🥗 Calories"
          value="1,820"
          badge="180 kcal left"
          badgeType="warn"
        />
        <MetricCard
          label="🏆 Rank"
          value="#3"
          badge="leaderboard"
          badgeType="neutral"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        {/* Streak */}
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600 }}>
              This Week's Streak
            </div>
            <Badge variant="orange">14 days 🔥</Badge>
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div
                key={i}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  fontSize: 10,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: i < 6 ? "var(--accent)" : "var(--accent-light)",
                  color: i < 6 ? "#fff" : "var(--accent)",
                  border: i === 6 ? "2px solid var(--accent)" : "none",
                }}
              >
                {day}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--text2)" }}>
            3 more days to earn the{" "}
            <strong style={{ color: "var(--accent)" }}>Ironclad</strong> badge!
          </p>
        </Card>

        {/* Today's Workout */}
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600 }}>Today's Workout</div>
            <Badge variant="orange">6 exercises</Badge>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Push Day A</div>
          <div
            style={{ fontSize: 12, color: "var(--text2)", marginBottom: 12 }}
          >
            Chest · Shoulders · Triceps
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                flex: 1,
                background: "var(--bg2)",
                borderRadius: 4,
                height: 6,
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: 6,
                  borderRadius: 4,
                  background: "var(--accent)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "Bebas Neue",
                fontSize: 20,
                color: "var(--accent)",
              }}
            >
              40%
            </span>
          </div>
          <Button
            style={{ marginTop: 14, width: "100%" }}
            onClick={() => navigate("/workout")}
          >
            Continue Workout
          </Button>
        </Card>
      </div>

      {/* Friend Activity */}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600 }}>Friend Activity</div>
          <Badge variant="blue">3 updates</Badge>
        </div>
        {[
          {
            initials: "MO",
            name: "Matej Obratov",
            sub: "Completed Pull Day B — 45 min ago",
            badge: "+80 pts",
            badgeType: "blue",
            bg: "var(--blue-light)",
            color: "var(--blue)",
          },
          {
            initials: "FB",
            name: "Fran Brežanin",
            sub: "Logged 2,100 kcal — 2h ago",
            badge: "on track",
            badgeType: "green",
            bg: "#F4C0D1",
            color: "#993556",
          },
          {
            initials: "LS",
            name: "Lovro Sekelj",
            sub: "Hit a 15-day streak! 🔥",
            badge: "streak",
            badgeType: "orange",
            bg: "var(--green-light)",
            color: "#3B6D11",
          },
        ].map((f, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: i < 2 ? "1px solid var(--border)" : "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: f.bg,
                color: f.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {f.initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{f.name}</div>
              <div style={{ fontSize: 11, color: "var(--text2)" }}>{f.sub}</div>
            </div>
            <Badge variant={f.badgeType}>{f.badge}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}
