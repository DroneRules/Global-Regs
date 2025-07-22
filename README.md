# 🌍 Global UAS Regulatory Map

An interactive world map that displays clickable links to national civil aviation authorities. Designed to be embedded into [The Drone Rules Ltd](https://thedronerules.com) website as a quick-access regulatory resource.

![Screenshot](screenshot.png)

---

## ✨ Features

- 🗺️ Leaflet-based interactive world map with ESRI satellite layer
- 🌐 Centered tooltips with country names on hover
- 🎯 Search bar to locate countries quickly
- 🔗 Clickable popups linking to national civil aviation authority websites
- 📦 Fully responsive, embeddable via GitHub Pages
- 🔒 Intended for exclusive use on [thedronerules.com](https://thedronerules.com)

---

## 📁 Project Structure

/index.html → Main map interface
/styles.css → Custom map and popup styles
/script.js → Leaflet map setup, hover, search, and interaction
/regulations.js → Mapping of country names to regulator URLs
/countries.geo.json → GeoJSON country boundaries
/README.md → This documentation
/LICENSE → Legal licensing document

---

This project is live at:

➡️ https://dronerules.github.io/Global-Regs/

It is automatically hosted via GitHub Pages. To embed it on your website, you can use an <iframe>:
<iframe src="https://dronerules.github.io/Global-Regs/" width="100%" height="700px" frameborder="0"></iframe>

## License

This codebase is proprietary and is licensed only for internal use by [The Drone Rules Ltd](https://thedronerules.com). It is not open source and may not be copied, modified, or redistributed without explicit written permission.

See the [LICENSE](./LICENSE) file for full details.
