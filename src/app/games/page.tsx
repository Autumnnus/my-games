"use client";
import useAppStore from "@/store/appStore";
import { Button } from "antd";

export default function Games() {
  const { count } = useAppStore((state) => state);
  console.log("count", count);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>{count}</h1>
      <Button onClick={() => useAppStore.getState().addCount()}>Add</Button>
      <Button onClick={() => useAppStore.getState().resetCount()}>Reset</Button>
    </div>
  );
}
