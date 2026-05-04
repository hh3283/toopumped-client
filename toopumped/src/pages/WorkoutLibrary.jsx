import { useEffect, useState } from "react";
import api from "../api/axios";
import Button from "../components/ui/Button";
import "../components/css/WorkoutLibrary.css";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/workout");
      setWorkouts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch workouts:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = workouts.filter((w) =>
    (w.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToPlan = (workout) => {
    console.log("Add to plan:", workout);
  };

  if (loading) {
    return <div className="wl-loading">Loading workouts...</div>;
  }

  return (
    <div className="wl-container">
      <div className="wl-header">
        <h1>Workout Library</h1>

        <input
          className="wl-search"
          placeholder="Search workouts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="wl-grid">
        {filtered.map((workout, index) => {
          const id = workout.workoutId || workout.id || index;

          return (
            <div key={id} className="wl-card">
              <div className="wl-card-title">
                {workout.name || "Unnamed Workout"}
              </div>

              <div className="wl-card-meta">
                Created by User #{workout.userId ?? "unknown"}
              </div>

              <div className="wl-card-footer">
                <Button onClick={() => handleAddToPlan(workout)}>
                  Add to Plan
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="wl-empty">No workouts found</div>
      )}
    </div>
  );
}