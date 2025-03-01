import React, { useState } from "react";
import logo from "../assets/books.png";

const MenuSuperior = () => {
  const [activeLink, setActiveLink] = useState("inclusao");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark sticky-top"
      style={{ background: "linear-gradient(to right, #2980b9, #6dd5fa)" }}
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-center me-3"
            alt="Logo"
          />
          Controle de Livros
        </a>

        <ul className="navbar-nav nav-underline justify-content-end">
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeLink === "inclusao" ? "active" : ""
              }`}
              aria-current={activeLink === "inclusao" ? "page" : undefined}
              href="#"
              onClick={() => handleLinkClick("inclusao")}
            >
              Inclusão
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeLink === "manutencao" ? "active" : ""
              }`}
              aria-current={activeLink === "manutencao" ? "page" : undefined}
              href="#"
              onClick={() => handleLinkClick("manutencao")}
            >
              Manutenção
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeLink === "resumo" ? "active" : ""}`}
              aria-current={activeLink === "resumo" ? "page" : undefined}
              href="#"
              onClick={() => handleLinkClick("resumo")}
            >
              Resumo
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;
