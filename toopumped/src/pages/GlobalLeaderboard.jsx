import { useState, useEffect } from "react";
import "../components/css/GlobalLeaderboard.css";
import api from "../api/axios";


const GL_MEDALS = ["🥇", "🥈", "🥉"];

export default function GlobalLeaderboard() {
  const [glPlayers, setGlPlayers] = useState([]);
  const [glLoading, setGlLoading] = useState(true);
  const [glError, setGlError] = useState(null);

  useEffect(() => {
    api
      .get("/competitions/leaderboard/global")
      .then((res) => {
        setGlPlayers(res.data);
        setGlLoading(false);
      })
      .catch((err) => {
        setGlError(err.response?.data?.message ?? err.message);
        setGlLoading(false);
      });
  }, []);


  if (glLoading) {
    return (
      <div className="gl-shell">
        <div className="gl-loading">
          <span className="gl-loading-bar" />
          <span className="gl-loading-bar" />
          <span className="gl-loading-bar" />
        </div>
      </div>
    );
  }

  if (glError) {
    return (
      <div className="gl-shell">
        <div className="gl-error">
          <span className="gl-error-icon">⚠</span>
          <p>Failed to load leaderboard</p>
          <small>{glError}</small>
        </div>
      </div>
    );
  }

  const glTopThree = glPlayers.slice(0, 3);
  const glRest = glPlayers.slice(3);

  return (
    <div className="gl-shell">
      <header className="gl-header">
        <div className="gl-title-block">
          <span className="gl-eyebrow">Global Rankings</span>
          <h1 className="gl-title">LEADERBOARD</h1>
        </div>
        <div className="gl-stat">
          <span className="gl-stat-num">{glPlayers.length}</span>
          <span className="gl-stat-label">Competitors</span>
        </div>
      </header>

      {glTopThree.length > 0 && (
        <section className="gl-podium">
          {glTopThree.map((p, i) => (
            <div
              key={p.userId ?? p.id ?? i}
              className={`gl-podium-card gl-podium-card--${i + 1}`}
              style={{ "--gl-delay": `${i * 0.12}s` }}
            >
              <div className="gl-podium-medal">{GL_MEDALS[i]}</div>
              <div className="gl-podium-rank">#{i + 1}</div>
              <div className="gl-podium-username">
                {p.username ?? p.userName ?? "—"}
              </div>
              <div className="gl-podium-score">
                {(p.score ?? p.totalXp ?? 0).toLocaleString()}
                <span className="gl-podium-unit">pts</span>
              </div>
              <div className="gl-podium-bar-wrap">
                <div
                  className="gl-podium-bar"
                  style={{ "--gl-h": `${[100, 75, 55][i]}%` }}
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {glRest.length > 0 && (
        <section className="gl-table-section">
          <div className="gl-table-header">
            <span>Rank</span>
            <span>Player</span>
            <span>Score</span>
          </div>
          <ul className="gl-list">
            {glRest.map((p, i) => {
              const rank = i + 4;
              return (
                <li
                  key={p.userId ?? p.id ?? i}
                  className="gl-row"
                  style={{ "--gl-delay": `${i * 0.05}s` }}
                >
                  <span className="gl-row-rank">{rank}</span>
                  <span className="gl-row-username">
                    <span className="gl-row-avatar">
                      {(p.username ?? p.userName ?? "?")[0].toUpperCase()}
                    </span>
                    {p.username ?? p.userName ?? "—"}
                  </span>
                  <span className="gl-row-score">
                    {(p.score ?? p.totalXp ?? 0).toLocaleString()}
                    <span className="gl-row-unit"> pts</span>
                  </span>
                  <div
                    className="gl-row-fill"
                    style={{
                      "--gl-w": `${Math.min(
                        100,
                        ((p.score ?? p.totalXp ?? 0) /
                          (glPlayers[0]?.score ?? glPlayers[0]?.totalXp ?? 1)) *
                          100
                      )}%`,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {glPlayers.length === 0 && (
        <div className="gl-empty">No competitors yet. Be the first!</div>
      )}
    </div>
  );
}