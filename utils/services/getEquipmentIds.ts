export const getEquipmentIds = (equipment: any) => {
  const items: string[] = [];
  for (const category in equipment) {
    const categoryItems = equipment[category];
    Object.keys(categoryItems).map(async (itemId) => {
      items.push(itemId);
    });
  }
  return items;
};
