import "../styles/globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Web3Provider from "../context/Web3Provider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Web3Provider>
        <Navbar />
        <Component suppressHydrationWarning={true} {...pageProps} />
        <Footer />
      </Web3Provider>
    </>
  );
}

export default MyApp;
