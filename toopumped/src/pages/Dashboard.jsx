import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import MetricCard from "../components/ui/MetricCard";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api
      .get(`/users/${user.userId}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{ fontFamily: "Bebas Neue", fontSize: 32, letterSpacing: 1 }}
        >
          Dashboard
        </div>
        <div style={{ fontSize: 13, color: "var(--text2)" }}>
          Welcome back, {userData?.firstname}!
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <MetricCard
          label="👤 Username"
          value={userData?.username}
          badgeType="neutral"
        />
        <MetricCard
          label="📧 Email"
          value={userData?.email?.split("@")[0]}
          badge={userData?.email}
          badgeType="neutral"
        />
        <MetricCard
          label="🎭 Role"
          value={userData?.role}
          badgeType="neutral"
        />
        <MetricCard
          label="🏆 Rank"
          value="#1"
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
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600 }}>Profile Info</div>
            <Badge variant="blue">Active</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "First Name", value: userData?.firstname },
              { label: "Last Name", value: userData?.lastname },
              { label: "Username", value: userData?.username },
              { label: "Email", value: userData?.email },
              { label: "Role", value: userData?.role },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 12, color: "var(--text2)" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            Quick Actions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Button
              style={{ width: "100%" }}
              onClick={() => navigate("/workout")}
            >
              🏋️ Go to Workout Planner
            </Button>
            <Button
              style={{ width: "100%" }}
              onClick={() => navigate("/calories")}
            >
              🥗 Track Calories
            </Button>
            <Button
              variant="ghost"
              style={{ width: "100%" }}
              onClick={() => navigate("/friends")}
            >
              👥 View Friends
            </Button>
            <Button
              variant="ghost"
              style={{ width: "100%" }}
              onClick={() => navigate("/leaderboard")}
            >
              📊 Leaderboard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
