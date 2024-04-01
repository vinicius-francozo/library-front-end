import { Footer, AppBar } from "./components";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <AppBar />
      <Outlet />
      <Footer />
    </>
  );
}
