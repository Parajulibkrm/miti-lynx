const lynxPreset = require("@lynx-js/tailwind-preset");

module.exports = {
	presets: [lynxPreset], // Use the preset
	content: ["./src/**/*.{js,ts,jsx,tsx}"], // Adjust paths as needed
	plugins: [],
};
