import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navbar.css";
import "../styles/drinks.css";
import '../styles/home.css'
import Layout from "../components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      <AnimatePresence>
        <motion.div
        key={router.route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            opacity: 0,
            x: 500,
            // zIndex: 1,
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            // position: 'fixed',
            // top: 135,
            // width: '100vw',
            // height: '100vh',
          },
          animateState: {
            opacity: 1,
            x: 0,
            // zIndex: 2,
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            // position: 'fixed',
            // top: 135,
            // width: '100vw',
            // height: '100vh',
            
          },
          exitState: {
            // clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
        }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
