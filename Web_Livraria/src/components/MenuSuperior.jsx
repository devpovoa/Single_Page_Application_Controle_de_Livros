import React, { useState, useEffect } from "react";
import logo from "../assets/books.png";
import { Link } from "react-router-dom";

const MenuSuperior = () => {
  // Recupera o link ativo do localStorage ou usa "inclusao" como padrão
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") || "inclusao"
  );

  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
  };

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    if (storedActiveLink) {
      setActiveLink(storedActiveLink);
    }
  }, []);

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark sticky-top"
      style={{ background: "linear-gradient(to right, #2980b9, #6dd5fa)" }}
    >
      <div className="container">
        <span className="navbar-brand">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-center me-3"
            alt="Logo"
          />
          Controle de Livros
        </span>

        <ul className="navbar-nav nav-underline justify-content-end">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${
                activeLink === "inclusao" ? "active" : ""
              }`}
              aria-current={activeLink === "inclusao" ? "page" : undefined}
              onClick={() => handleLinkClick("inclusao")}
            >
              Inclusão
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/manutencao"
              className={`nav-link ${
                activeLink === "manutencao" ? "active" : ""
              }`}
              aria-current={activeLink === "manutencao" ? "page" : undefined}
              onClick={() => handleLinkClick("manutencao")}
            >
              Manutenção
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/resumo"
              className={`nav-link ${activeLink === "resumo" ? "active" : ""}`}
              aria-current={activeLink === "resumo" ? "page" : undefined}
              onClick={() => handleLinkClick("resumo")}
            >
              Resumo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;
