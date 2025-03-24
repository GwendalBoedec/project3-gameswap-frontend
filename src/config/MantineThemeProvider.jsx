import { MantineProvider } from "@mantine/core";

const MantineThemeProvider = ({ children }) => {
  return (
    <MantineProvider
      theme={{
        components: {
          PasswordInput: {
            styles: {
              input: {
                borderColor: "#444",
                "&:focus": {
                  borderColor: "#ffd400",
                },
                color: "white",
                backgroundColor: "#2b2b3c",
              },
            },
          },
          MultiSelect: {
            styles: {
              input: {
                color: "#000000",
                borderColor: "#444",
                "&:focus": {
                  borderColor: "#ffd400",
                },
                backgroundColor: "#2b2b3c",
                color: "#fff",
              },
              dropdown: {
                color: "#000000",
                backgroundColor: "#2b2b3c",
                border: "1px solid #444",
              },
              item: {
                color: "#000000",
                "&[data-hovered]": {
                  backgroundColor: "#ffd400",
                  color: "#000",
                },
              },
              value: {
                color: "#000000",
                backgroundColor: "#444",
                borderRadius: "4px",
                padding: "2px 6px",
              },
            },
          },
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default MantineThemeProvider;
