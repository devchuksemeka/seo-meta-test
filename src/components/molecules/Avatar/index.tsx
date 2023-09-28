interface AvatarProps {
  size?: "smallest" | "small" | "medium" | "large";
  children?: any;
  padding?: any;
}
const Avatar = ({ size = "medium", children, padding = "" }: AvatarProps) => {
  let dimensions: { height: string; width: string } = {
    height: "40px",
    width: "40px",
  };

  if (size === "large") {
    dimensions.height = "90px";
    dimensions.width = "90px";
  }
  if (size === "small") {
    dimensions.height = "36px";
    dimensions.width = "36px";
  }
  if (size === "smallest") {
    dimensions.height = "30px";
    dimensions.width = "30px";
  }

  return (
    <div
      style={{
        background: "#D5D5D5",
        borderRadius: "50%",
        padding,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        ...dimensions,
      }}
    >
      {children}
    </div>
  );
};

export default Avatar;
