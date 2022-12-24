export const findTypeIsText = (data) => {
  if (data.children) {
    return data.children
      .map((child) => findTypeIsText(child))
      .filter((d) => d !== null);
  }
  if (data.type === "TEXT") {
    return data;
  }
  return null;
};

export const filterFont = (data) => {
  return data.filter((d) => {
    const {
      style: { fontWeight, fontSize },
    } = d;
    return fontSize === 12 && fontWeight === 400;
  });
};
