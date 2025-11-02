import { checkUser } from "@/lib/CheckUser";
export default function Navbar() {
  const user = checkUser();
  return <div className="text-amber-300">Navbar</div>;
}
