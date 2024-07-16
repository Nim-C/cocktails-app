import { Link, useLocation } from "@tanstack/react-router";
import React from "react";
import { clsx } from "clsx";

import { URL_CREATE, URL_HOME } from "$src/constants";

import "./style.css";

type NavLink = {
  path: string;
  name: string;
};

const NAV_LINKS: NavLink[] = [
  { path: URL_HOME, name: "Home" },
  { path: URL_CREATE, name: "Create" },
];

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header>
      {NAV_LINKS.map(({ path, name }) => (
        <Link
          key={name}
          to={path}
          className={clsx("nav-link", {
            "selected-route": location.href === path,
          })}
        >
          <h1>{name}</h1>
        </Link>
      ))}
    </header>
  );
};

export default Header;
