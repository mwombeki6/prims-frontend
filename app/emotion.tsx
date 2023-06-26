"use client";

import React, { useState } from "react";

import { CacheProvider } from "@emotion/react";

import {
  useEmotionCache,
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useServerInsertedHTML } from "next/navigation";
import { useColorScheme } from "@mantine/hooks";

import { Provider } from "react-redux";

import { store, persistor } from "./store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { motion, AnimatePresence } from "framer-motion";
//import { useRouter } from "next/navigation";
import { useRouter } from "next/router";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={cache}>
          <AnimatePresence mode="wait">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exitState"
              transition={{
                duration: 0.75,
              }}
              variants={{
                hidden: {
                  scale: 0.8,
                  opacity: 0,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.4,
                  },
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                },
                exitState: {
                  clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
                },
              }}
              className="base-page-size"
            >
              <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
              >
                <MantineProvider
                  theme={{
                    fontFamily: "Greycliff CF, sans-serif",
                    headings: {
                      // properties for all headings
                      fontWeight: 900,

                      //fontFamily: "Roboto",

                      // properties for individual headings, all of them are optional
                      sizes: {
                        h1: {
                          fontWeight: 900,
                          fontSize: "74px",
                          //fontSize: "5rem",
                          lineHeight: 1.4,
                        },
                        h2: { fontSize: "2.2rem", lineHeight: 1.5 },
                        // ...up to h6
                        h3: { fontSize: "1.2rem", lineHeight: 1.5 },
                        h6: { fontWeight: 900 },
                      },
                    },
                    colorScheme,
                    breakpoints: {
                      xs: "30em",
                      sm: "48em",
                      md: "64em",
                      lg: "74em",
                      xl: "90em",
                    },
                  }}
                  withGlobalStyles
                  withNormalizeCSS
                >
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                  />
                  <Notifications position="top-center" />

                  {children}
                </MantineProvider>
              </ColorSchemeProvider>
            </motion.div>
          </AnimatePresence>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}
