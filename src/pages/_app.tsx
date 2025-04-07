import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import { TaskProvider } from '@/context/TaskContext';
import { DefaultEventsProvider } from '@/context/DefaultEventsContext';
import Layout from '../components/Layout';
import Head from 'next/head';
import React, { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('ServiceWorker registration successful');
          })
          .catch((err) => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>MySchedule</title>
        <meta name="description" content="Agenda e gerenciador de tarefas" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#7c3aed" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MySchedule" />
      </Head>
      <ThemeProvider>
        <TaskProvider>
          <DefaultEventsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DefaultEventsProvider>
        </TaskProvider>
      </ThemeProvider>
    </>
  );
}

export default App; 