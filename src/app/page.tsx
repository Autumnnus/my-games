'use client';
import { DataTableScreen } from '@/app/_components/data-table-screen';
import { ScreenshotScreen } from '@/app/_components/screenshot-screen';
import WelcomeScreen from '@/app/_components/welcome-screen';
import { Screenshot } from '@/types/screenshot';
import { Layout } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const [images, setImages] = useState<Screenshot['url'][]>();
  const url = `${backendUrl}/screenshot/get/random/3`;

  useEffect(() => {
    axios
      .get(url)
      .then((res: AxiosResponse<{ data: Screenshot[] }>) => {
        setImages(res.data.data.map(screenshot => screenshot.url));
      })
      .catch(error => {
        console.error(error);
        setImages(['https://i.imgur.com/Jj1rFT8.png']);
      });
  }, []);

  return (
    <Layout.Content
      style={{
        flexDirection: 'column',
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
      }}
    >
      <WelcomeScreen image={images?.[0] || ''} />
      <DataTableScreen image={images?.[1] || ''} />
      <ScreenshotScreen image={images?.[2] || ''} />
    </Layout.Content>
  );
}
