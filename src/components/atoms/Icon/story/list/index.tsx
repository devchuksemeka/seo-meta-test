import Typography from "@/components/atoms/Typography";
import Icon from "../..";
import IconList, { IconType } from "../../icon-list";

const Icons = () => {
  const iconList = IconList;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      {Object.keys(iconList).map((icon, index) => {
        return (
          <div
            key={index.toString()}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".2rem",
              alignItems: "center",
            }}
          >
            <Icon name={icon as IconType} />
            <Typography>{icon}</Typography>
          </div>
        );
      })}
    </div>
  );
};
export default Icons;
