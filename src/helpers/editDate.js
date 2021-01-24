export const changedate = (data) => {
  if (data !== undefined) {
    return new Date(data).toLocaleDateString("fr-CA");
  }
  return null;
};
