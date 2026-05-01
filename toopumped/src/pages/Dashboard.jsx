import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import MetricCard from "../components/ui/MetricCard";
import "../components/css/Dashboard.css";

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

  if (loading) return <div className="dashboard__loading">Loading...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__title">Dashboard</div>
        <div className="dashboard__subtitle">
          Welcome back, {userData?.firstname}!
        </div>
      </div>

      <div className="dashboard__metrics">
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

      <div className="dashboard__cards">
        <Card>
          <div className="profile-card__header">
            <div className="profile-card__title">Profile Info</div>
            <Badge variant="blue">Active</Badge>
          </div>
          <div className="profile-card__list">
            {[
              { label: "First Name", value: userData?.firstname },
              { label: "Last Name", value: userData?.lastname },
              { label: "Username", value: userData?.username },
              { label: "Email", value: userData?.email },
              { label: "Role", value: userData?.role },
            ].map((item, i) => (
              <div key={i} className="profile-card__row">
                <span className="profile-card__label">{item.label}</span>
                <span className="profile-card__value">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="actions-card__title">Quick Actions</div>
          <div className="actions-card__list">
            <Button
              className="actions-card__btn"
              onClick={() => navigate("/workout")}
            >
              🏋️ Go to Workout Planner
            </Button>
            <Button
              className="actions-card__btn"
              onClick={() => navigate("/calories")}
            >
              🥗 Track Calories
            </Button>
            <Button
              variant="ghost"
              className="actions-card__btn"
              onClick={() => navigate("/friends")}
            >
              👥 View Friends
            </Button>
            <Button
              variant="ghost"
              className="actions-card__btn"
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
