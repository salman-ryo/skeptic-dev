// import { AuthProvider } from "@/context/authContext";

import UserSessionProvider from "@/components/UserSessionProvider";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <UserSessionProvider>
        {children}
    </UserSessionProvider>
    // <AuthProvider>
    //     {children}
    // </AuthProvider>
  );
}
