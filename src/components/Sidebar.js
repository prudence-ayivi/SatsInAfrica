import React, { useState } from "react";
import { FaBars, FaSearch, FaTimes, FaQuestionCircle } from "react-icons/fa";
import CountryPage from "./CountryPage.js";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // État pour la sidebar étendue
  const [searchQuery, setSearchQuery] = useState(""); // État pour le champ de recherche
  const [mode, setMode] = useState("normal"); // État pour afficher la section "À propos";

  // Fonction pour gérer l'ouverture et la fermeture de la sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Fonction pour effacer la recherche
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div
      className={`flex flex-col h-screen bg-zinc-100 border-solid border-r transition-width duration-100 ${
        isOpen 
          ? "w-[75%] md:w-[700px]"
          : "w-[75px] justify-between"
      } overflow-y-auto overflow-x-hidden`}
    >
      {/* Icône du menu et de la barre de recherche */}
      <div className="flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-7">
          <FaBars
            className="text-lg cursor-pointer"
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
                setMode("normal"); // reset
              } else {
                setIsOpen(true);
                setMode("normal"); // ouverture en mode normal
              }
            }}
          />
          {!isOpen && (
            <FaSearch
              className="text-lg cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
        </div>
        {isOpen && (
          <div className="flex items-center w-full">
            {mode === "about" ? (
              <h2 className="text-md ml-2 md:ml-4 font-title font-bold md:text-2xl">
                About this project
              </h2>
            ) : (
              <div className="flex items-center ml-2 md:ml-4 w-full">
                <input
                  type="text"
                  className="ml-2 p-2 w-full bg-white rounded-[24px] font-sans border focus:outline-none focus:border-slate-900"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <FaTimes
                    className="ml-2 text-lg cursor-pointer"
                    onClick={clearSearch}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section pour les filtres et les informations par pays */}
      {isOpen && (
        <div className="p-4 space-y-4">
          {mode === "about" ? (
            <div className="text-left md:text-justify font-sans space-y-3 text-md">
              <p>
                This website is the data visualisation of the evolution of space
                sector in Africa, mainly through satellite lunch and operation,
                space agencies and national space budget.
                The goal is to provide up to date insights on african space industry in interactive and educative way 
                for researchers, students and space enthusiasts.
              </p>
              <p>
                This project is entirely{" "}
                <span className="font-bold">open source</span>, carried out
                voluntarily and free of charge. The data come from
                open and accessible sources :<span className="font-bold">
                  {" "}
                  Space in Africa, SpaceHubs Africa, Space-Track and In The Sky
                </span>.
              </p>               
              <p>
                To ensure clarity in comparisons, only formal and officially
                established space agencies have been included. In some countries,
                space programs are managed by universities or governmental
                entities, but without the legal status of a national space
                agency. 
              </p>
              <p>              
                Efforts will me made to keep the information as up to date as possible, especially
                by considering the most recent space activities in Africa.
              </p>
            </div>
          ) : (
            <div>
              <CountryPage searchQuery={searchQuery} />
            </div>
          )}
        </div>
      )}

      {/* About the project (only when sidebar is closed) */}
      {!isOpen && (
        <div className="self-center">
          <hr className="border-t-1 border-black w-full mb-3" />
          <FaQuestionCircle
            className="text-lg cursor-pointer mb-7"
            onClick={() => {
              setIsOpen(true);
              setMode("about"); // ouverture en mode "À propos"
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
