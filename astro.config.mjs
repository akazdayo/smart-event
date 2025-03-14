import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";

export default defineConfig({
	output: "static",
	integrations: [tailwind(), solidJs()],
	adapter: vercel(),
	vite: {
		define: {
			"process.env.ANTHROPIC_API_KEY": JSON.stringify(
				process.env.ANTHROPIC_API_KEY,
			),
		},
	},
});
