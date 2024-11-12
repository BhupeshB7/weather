import type { PropsWithChildren } from "react";
import Header from "./header";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header/>
      <main className="min-h-screen container mx-auto px-4 scroll-py-8">
        {children}
      </main>
       <footer className="border-t backdrop-blur py-10 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-center  ">
            <p>Made With ❤️ by Bhupesh Bhaskar</p>
        </div>
       </footer>
    </div>
  );
};

export default Layout;
