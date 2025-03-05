import { Typography } from "antd";

type HomeSectionCardProps = {
  image: string;
  heading: string;
  body: string;
  imagePosition?: "left" | "right";
};

const { Title, Text } = Typography;

export function HomeSectionCard({
  image,
  heading,
  body,
  imagePosition = "left",
}: HomeSectionCardProps) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: imagePosition === "left" ? "row-reverse" : "row",
        scrollSnapAlign: "start",
        // backgroundImage: {
        //   xs: `url(${image})`,
        //   md: "url()",
        // },
        backgroundImage: `url()`,
      }}
    >
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50%",
          //   display: {
          //     xs: "none",
          //     md: "flex",
          //   },
          padding: 1,
          alignItems: "center",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          //   width: {
          //     xs: "100%",
          //     md: "50%",
          //   },
          width: "50%",
          justifyContent: "center",
          gap: 2,
          padding: 1,
          alignItems: "center",
        }}
      >
        <Title
          style={{
            color: "#fff",
            // fontSize: {
            //   xs: "2rem",
            //   md: "3rem",
            // },
            // textShadow: {
            //   xs: "5px 10px 10px #000000bf,-3px 10px 12px #000000bf",
            //   md: "0px 0px 0px #000000bf,0px 0px 0px #000000bf",
            // },
            textAlign: "center",
          }}
        >
          {heading}
        </Title>
        <Text
          style={{
            color: "#fff",
            // fontSize: {
            //   xs: "0.8rem",
            //   md: "1rem",
            // },
            // textShadow: {
            //   xs: "5px 10px 10px #000000bf,-3px 10px 12px #000000bf",
            //   md: "0px 0px 0px #000000bf,0px 0px 0px #000000bf",
            // },
            textAlign: "center",
          }}
        >
          {body}
        </Text>
      </div>
    </div>
  );
}
