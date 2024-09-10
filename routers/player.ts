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
  const player_id = "pc_rockefeller";

  const statistic = await PlayerRecords.getStatistics("hero", player_id);
  const equipment = await WeaponRecords.getEqItems(statistic.equipment);

  res.json({
    statistic,
    equipment,
  });
});

playerRouter.get("/get_npc", async (req, res) => {
  const npcName: string = req.query.npcName as string;
  const statistic = await PlayerRecords.getStatistics("npc", npcName);
  const equipment = await WeaponRecords.getEqItems(statistic.equipment);

  res.json({
    statistic,
    equipment,
  });
});

playerRouter.post("/transaction", async (req, res) => {
  if (req.body.transactionType === 'buy') {
    await PlayerRecords.addItem(`hero/${req.body.userId}` , req.body.itemType, req.body.itemId, req.body.price);
    await PlayerRecords.removeItem(`npc/${req.body.seller}` , req.body.itemType, req.body.itemId, req.body.price);
  } else {
    await PlayerRecords.addItem(`npc/${req.body.seller}` , req.body.itemType, req.body.itemId,req.body.price);
    await PlayerRecords.removeItem(`hero/${req.body.userId}` , req.body.itemType, req.body.itemId, req.body.price);
  }
  

});


playerRouter.post("/equip", async (req, res) => {
  // const [...] = req.body
 await WeaponRecords.equip('hero', req.body.userId, req.body.action, req.body.itemType, req.body.itemId)
  

});
