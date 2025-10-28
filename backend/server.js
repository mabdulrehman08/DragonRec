//backend 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Test route
app.get("/", (req, res) => res.send("Backend running!"));

// this for creating a new user 
app.get("/users", async (req, res) => {
  console.log("✅ /users route hit by browser");
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});


app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

//  Tcrateing a team 
app.get("/teams", async (req, res) => {
  const { data, error } = await supabase.from("teams").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post("/teams", async (req, res) => {
  const { name, league_id, captain_id } = req.body;
  const { data, error } = await supabase.from("teams").insert([{ name, league_id, captain_id }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

//  MEMBERS (Join team) -------------------------------------------
app.post("/join", async (req, res) => {
  const { team_id, user_id } = req.body;
  const { data, error } = await supabase.from("members").insert([{ team_id, user_id }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.get("/teams/:id/members", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("members")
    .select("users(name,email)")
    .eq("team_id", id)
    .innerJoin("users", "members.user_id", "users.id");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// LEAGUES --------------------------------------------------------
app.get("/leagues", async (req, res) => {
  const { data, error } = await supabase.from("leagues").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post("/leagues", async (req, res) => {
  const { name, season } = req.body;
  const { data, error } = await supabase.from("leagues").insert([{ name, season }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ⚽ MATCHES --------------------------------------------------------
app.get("/matches", async (req, res) => {
  const { data, error } = await supabase.from("matches").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post("/matches", async (req, res) => {
  const { league_id, team1_id, team2_id, date, location } = req.body;
  const { data, error } = await supabase
    .from("matches")
    .insert([{ league_id, team1_id, team2_id, date, location }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// 🚀 Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
});
