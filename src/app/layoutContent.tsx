
// Client component to handle usePathname
'use client'; // Mark as client component
import QueryProvider from '@/components/QueryProvider';
import { usePathname } from 'next/navigation'; // Import usePathname
import Sidebar from './sidebar';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current pathname

  return (
    <QueryProvider>
      {pathname === '/' || pathname === "/auth/register" || pathname === "/auth/login" ? (
        <>{children}</>
      ) : (
        <Sidebar>
          {children}
        </Sidebar>
      )}
    </QueryProvider>
  );
}