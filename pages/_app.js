import '../styles/globals.css';
import {LayoutProvider} from "../context/LayoutContext";

function MyApp({ Component, pageProps }) {
  return(
    <>
    <LayoutProvider>
    <Component {...pageProps} />
    </LayoutProvider>
    </>
  )
}

export default MyApp
