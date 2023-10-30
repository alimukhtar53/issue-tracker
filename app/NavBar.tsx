import Link from "next/link";
import React from "react";
import { AiOutlineBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex items-center justify-between border-b mb-5 p-6">
      <Link href="/">
        <AiOutlineBug size={28} />
      </Link>
      <ul className="flex gap-6">
        {links.map((link, index) => (
          <Link
            key={index}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
