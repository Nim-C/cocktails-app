import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { Root } from "$routes/RootComponent";
import "$src/index.css";
import "$src/theme-override.css";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Theme appearance="light">
        <Root />
      </Theme>
    </StrictMode>
  );
}
