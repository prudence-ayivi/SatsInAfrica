import React, { useState } from "react"; 
import { FaBars, FaSearch, FaTimes, FaQuestionCircle } from "react-icons/fa";
import CountryPage from './CountryPage.js';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // État pour la sidebar étendue
  const [searchQuery, setSearchQuery] = useState(""); // État pour le champ de recherche

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
        isOpen ? "w-[700px]" : "w-[75px] justify-between"
      } overflow-y-auto overflow-x-hidden`}
    >
      {/* Icône du menu et de la barre de recherche */}
      <div className="flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-7">
          <FaBars className="text-lg cursor-pointer" onClick={toggleSidebar} />
          {!isOpen && (
            <FaSearch
              className="text-lg cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
        </div>
        {isOpen && (
          <div className="flex items-center ml-4 w-full">
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

      {/* Section pour les filtres et les informations par pays */}
      {isOpen && (
        <div className="p-4 space-y-4">
          <div> 
          <CountryPage searchQuery={searchQuery}/>
          </div>          
        </div>
      )}

      {/* Icône du point d'interrogation en bas (disparaît quand la sidebar est ouverte) */}
      {!isOpen && (
        <div className="self-center">
          <hr className="border-t-1 border-black w-full mb-3" />
          <FaQuestionCircle className="text-lg cursor-pointer mb-7" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
