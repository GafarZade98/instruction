import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import sassDts from "vite-plugin-sass-dts";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/scss/app.scss',
                'resources/scss/main.scss',
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
        react(),
        sassDts()
    ],
});
