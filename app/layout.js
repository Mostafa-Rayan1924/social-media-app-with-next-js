import { Work_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/app/_util/Nav";
import UserContext from "./_context/UserContext";
import PostsContext from "./_context/PostsContext";
import ModeProvider from "./_context/ModeProvider";

const WorkSans = Work_Sans({ subsets: ["latin"], weights: ["400", "700"] });

export const metadata = {
  title: "Social Media",
  description: "Enjoy with us in our social world",
};

export default function RootLayout({ children }) {
  return (
    <html className="overflow-x-hidden" lang="en">
      <body className={`${WorkSans.className}  bg-lightBg   `}>
        <ModeProvider>
          <UserContext>
            <PostsContext>
              <Nav />
              {children}
            </PostsContext>
          </UserContext>
        </ModeProvider>
      </body>
    </html>
  );
}
