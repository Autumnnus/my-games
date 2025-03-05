import { ThemeConfig } from "antd";

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#fcba03",
    colorPrimaryBg: "#333333",
    colorBgBase: "#121212",
    colorTextBase: "#E0E0E0",
    colorBorder: "#424242",
    colorBgContainer: "#1E1E1E",
    colorBgElevated: "#262626",
    colorTextSecondary: "#B0B0B0",
    colorTextTertiary: "#808080",
  },
  components: {
    Tree: {
      nodeSelectedBg: "#333333",
    },
    Layout: {
      headerBg: "#1E1E1E",
      bodyBg: "#121212",
    },
    Menu: {
      itemBg: "transparent",
      subMenuItemBg: "transparent",
      itemHoverBg: "#333333",
      itemSelectedBg: "#fcba03",
      itemSelectedColor: "#FFFFFF",
    },
    Button: {
      colorPrimary: "#fcba03",
      colorPrimaryHover: "#ffce47",
      colorPrimaryActive: "#fcba03",
    },
    Table: {
      rowSelectedBg: "#333333",
      rowSelectedHoverBg: "#333333",
    },
  },
};

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#fcba03",
    colorBgBase: "#F5F5F5",
    colorTextBase: "#2D3436",
    colorBorder: "#D3D3D3",
    colorBgContainer: "#FFFFFF",
    colorBgElevated: "#FFFFFF",
    colorTextSecondary: "#636E72",
    colorTextTertiary: "#B2BEC3",
  },
  components: {
    Tree: {
      nodeSelectedBg: "#D3D3D3",
    },
    Layout: {
      headerBg: "#FFFFFF",
      bodyBg: "#F5F5F5",
    },
    Menu: {
      itemBg: "transparent",
      subMenuItemBg: "transparent",
      itemHoverBg: "#F0F0F0",
      itemSelectedBg: "#fcba03",
      itemSelectedColor: "#FFFFFF",
    },
    Button: {
      colorPrimary: "#fcba03",
      colorPrimaryHover: "#ffce47",
      colorPrimaryActive: "#fcba03",
    },
    Table: {
      rowSelectedBg: "#D3D3D3",
      rowSelectedHoverBg: "#D3D3D3",
    },
  },
};
