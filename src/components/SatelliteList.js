import React from 'react'

const SatelliteList = ({ satellites }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full max-h-[500px] overflow-y-auto bg-white shadow-md rounded-md p-2">
      {satellites.map((sat, index) => (
        <div
          key={index}
          className="flex flex-col items-center border rounded-lg shadow-sm p-2 space-y-1 bg-zinc-100"
        >
          {/* Première ligne : Nom du satellite et badge de statut */}
          <div className="flex items-center w-full">
            <span className="font-semibold text-lg mr-2">{sat.name}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                sat.status === 'Active'
                  ? 'bg-[#082F91] text-white'
                  : 'bg-[#F7FF99] text-black'
              }`}
            >
              {sat.status}
            </span>
          </div>

          {/* Deuxième ligne : Pays et date de lancement */}
          <div className="flex flex-row gap-6 w-full text-sm text-gray-600">
            <span> {sat.country} </span>
            <span> {new Date(sat.launch_date).toLocaleDateString()}
            </span>
          </div>
           {/* Troisièmr ligne : Mission du satellite */}
           <div className="flex flex-row gap-6 w-full text-sm text-gray-600">
            <span> Mission : {sat.mission} </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SatelliteList;