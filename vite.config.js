import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import sassDts from "vite-plugin-sass-dts";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/scss/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        react(),
        sassDts()
    ],
});
