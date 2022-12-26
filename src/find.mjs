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
  /*
              "style": {
              "fontFamily": "Noto Sans JP",
              "fontPostScriptName": "NotoSansJP-Regular",
              "fontWeight": 400,
              "textAutoResize": "WIDTH_AND_HEIGHT",
              "fontSize": 13,
              "textAlignHorizontal": "LEFT",
              "textAlignVertical": "TOP",
              "letterSpacing": 0,
              "lineHeightPx": 24,
              "lineHeightPercent": 127.49681091308594,
              "lineHeightPercentFontSize": 184.61538696289062,
              "lineHeightUnit": "PIXELS"
            },
  */
  return data.filter((d) => {
    const {
      style: {
        fontFamily,
        fontWeight,
        fontSize,
        textAlignHorizontal,
        letterSpacing,
        lineHeightPx,
      },
      fills: [
        {
          color: { r, g, b },
        },
      ],
    } = d;
    return (
      fontFamily === "Inter" &&
      fontWeight === 400 &&
      fontSize === 12 &&
      textAlignHorizontal == "LEFT" &&
      letterSpacing === 0 &&
      lineHeightPx === 16
      // r === 0 &&
      // g === 0 &&
      // b === 0
    );
  });
};
