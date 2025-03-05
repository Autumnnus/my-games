import { Space } from "antd";

export default function Home() {
  return (
    <div className="App">
      <Space
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        <WelcomeScreen image={images?.[0] || ""} />
        <DataTableScreen image={images?.[1] || ""} />
        <ScreenshotScreen image={images?.[2] || ""} />
        <HomeFooter />
      </Space>
    </div>
  );
}
