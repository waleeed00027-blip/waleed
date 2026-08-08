import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'AdForge AI — Creative Studio', description: 'AI-powered UGC advertising campaign studio' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
