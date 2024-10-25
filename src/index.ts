import express, { Request, Response } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const supabaseUrl = "https://nwqsrqxpjsmvjpievzac.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53cXNycXhwanNtdmpwaWV2emFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTc3MTkwOSwiZXhwIjoyMDQ1MzQ3OTA5fQ.F0bgBJd6e1uFoS-OxmM0x6McwmCOa-jHeDbkKOsNAhY";

const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/api/data", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("test_table").select("*");
    if (error) {
      res
        .status(400)
        .json({ error: "Erreur lors de la récupération des données." });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
