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
      fills: [
        {
          color: { r, g, b },
        },
      ],
    } = d;
    return (
      fontSize === 12 && fontWeight === 400 && r === 0 && g === 0 && b === 0
    );
  });
};
