# Project Overview

## Description

This project is an interactive web-based platform designed to visualize satellite and related data, lunched by African nations, for education purposes. It combines data visualization (charts and maps) with a real-time 3D orbital simulation to provide both analytical insights and a dynamic spatial representation of all african satellites.

The goal is to make the space activity on the continent more understandable through accessible and interactive tools.

---

## Technology Stack

The project is built using the following technologies:

* **React.js** – Frontend development and UI structure
* **JavaScript (ES6+)** – Core logic and data processing
* **Recharts** – Statistical charts and data visualization
* **React Simple Maps** – Interactive world map display
* **SpaceKit** – 3D Earth and orbital simulation engine

---

## Data Structure

Satellite data is stored in a structured **JSON database** containing:

* Satellite name
* Country of origin
* Operational status (Active / Inactive)
* Orbital parameters
* Launch-related metadata

This approach ensures flexibility and scalability. New satellites can easily be added, and existing data can be updated as new information becomes available.

The project is designed to evolve continuously as satellite activity increases.

---

## Orbital Simulation

The 3D simulation is based on the **seven classical orbital elements**, which define each satellite’s trajectory. These parameters are passed to SpaceKit to generate realistic orbital motion around the Earth.

Currently, **TLE (Two-Line Element) data is not integrated**, but it may be considered in future updates to improve accuracy and allow real-time orbit synchronization.

The simulation runs from a defined reference date to ensure consistent orbital propagation.

---

## Data Visualization

The platform includes several visual tools:

* Pie charts (e.g., countries with space agencies vs. without)
* Bar charts (number of satellites per country)
* Grouped ranges to reflect satellite distribution levels (1, 2–3, 4-5, 6–8, 9-10, 11–20)

Charts are structured to highlight global disparities and the evolution of space activity among different african nations.

---

## Map Limitations

Some small island nations (such as Mauritius) may not appear clearly due to geographic dataset resolution limitations in the map files. This is related to the underlying GeoJSON/TopoJSON structure and not to missing data in the project.

---

# Future Improvements

The project remains open to expansion and technical improvements include:

### 1. 3D Visualization Expansion

* Add **all available satellites** to the 3D visualization.
* Implement filtering satellites by country.

### 2. Satellite Type Analysis

* Add a chart showing the **ratio by satellite category**:

  * Nano-satellites
  * Micro-satellites
  * Mini-satellites
  * Larger classes

### 3. Orbital Distribution Analysis

* Add a chart comparing satellite distribution by **orbit type**:

  * LEO
  * MEO
  * GEO
  * Other orbital classifications

---

## Conclusion

This project combines data visualization, orbital mechanics, and interactive simulation to provide a comprehensive view of african satellites. It is structured to remain scalable, adaptable, and continuously updatable as new satellites are launched and new data becomes available.
