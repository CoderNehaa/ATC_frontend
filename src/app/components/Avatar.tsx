import React from "react";

const colors: { [key: string]: string } = {
  A: "rgba(139, 0, 0, 0.8)", // Dark Red
  B: "rgba(85, 107, 47, 0.8)", // Dark Olive Green
  C: "rgba(139, 69, 19, 0.8)", // Saddle Brown
  D: "rgba(165, 42, 42, 0.8)", // Brown
  E: "rgba(47, 79, 79, 0.8)", // Dark Slate Gray
  F: "rgba(75, 0, 130, 0.8)", // Indigo
  G: "rgba(139, 0, 139, 0.9)", // Dark Magenta
  H: "rgba(153, 50, 204, 0.8)", // Dark Orchid
  I: "rgba(139, 0, 0, 0.8)", // Dark Red
  J: "rgba(128, 128, 0, 0.8)", // Olive
  K: "rgba(285, 120, 50, 0.9)", // Dark Orange
  L: "rgba(139, 69, 19, 0.8)", // Saddle Brown
  M: "rgba(160, 82, 45, 0.8)", // Sienna
  N: "rgba(107, 142, 35, 0.8)", // Olive Drab
  O: "rgba(210, 105, 30, 0.8)", // Chocolate
  P: "rgba(220, 90, 92)", // Indian Red
  Q: "rgba(105, 105, 105, 0.8)", // Dim Gray
  R: "rgba(112, 128, 144, 0.8)", // Slate Gray
  S: "rgba(143, 188, 143, 0.8)", // Dark Sea Green
  T: "rgba(160, 82, 45, 0.8)", // Sienna
  U: "rgba(85, 107, 47, 0.8)", // Dark Olive Green
  V: "rgba(107, 142, 35, 0.8)", // Olive Drab
  W: "rgba(184, 134, 11, 0.8)", // Dark Goldenrod
  X: "rgba(255, 69, 0, 0.8)", // Orange Red
  Y: "rgba(218, 165, 32, 0.8)", // Goldenrod
  Z: "rgba(139, 0, 0, 0.8)", // Dark Red
};

const Avatar: React.FC<{letter:string}> = ({letter}) => {
  const avatarStyle = {
    height: "40px",
    width: "40px",
    padding: "5px",
    borderRadius: "50%",
    backgroundColor: colors[letter] || "#000000",
    color: "white",
  };

  return (
    <div style={avatarStyle} className="flexColCenter">
      {letter}
    </div>
  );
};

export default Avatar;
