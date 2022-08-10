import "../styles/globals.css";
import { LayoutProvider } from "../context/LayoutContext";
import { ResponseProvider } from "../context/ResponseContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ResponseProvider>
        <LayoutProvider>
          <Component {...pageProps} />
        </LayoutProvider>
      </ResponseProvider>
    </>
  );
}

export default MyApp;
