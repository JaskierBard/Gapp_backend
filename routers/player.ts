import { Router } from "express";
import { PlayerRecords } from "../records/player";
import { WeaponRecords } from "../records/weapons";
export const playerRouter = Router();

playerRouter.post("/add", async (req, res) => {
  const player_id = "865055da-1b49-11ee-af61-581122ba8110";
  const statistic = await PlayerRecords.addHero(player_id);
  res.json({
    statistic,
  });
});

playerRouter.get("/get", async (req, res) => {
  // const player_id = "865055da-1b49-11ee-af61-581122ba8110";
    const player_id = "pc_rockefeller";

  const statistic = await PlayerRecords.getStatistics(player_id);
  const equipment = await WeaponRecords.getEqItems(statistic.equipment)

  res.json({
    statistic, equipment
  });
  
});



  



