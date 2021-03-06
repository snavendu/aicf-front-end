import React from 'react';
import { Layout } from 'antd';
import AppSidebar from './sidebar';
import AppHeader from './header';

export default function AppLayout({ children }: any) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <AppSidebar />
        <Layout style={{ backgroundColor: '#ffffff' }}>
          <AppHeader />

          <Layout.Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
