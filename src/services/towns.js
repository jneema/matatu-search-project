export const getTowns = (search = "") => {
  const towns = [
    { id: "nairobi", name: "Nairobi", description: "Kenya's capital city" },
  ];
  if (!search) return Promise.resolve(towns);
  return Promise.resolve(
    towns.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
  );
};