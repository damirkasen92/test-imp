import {defineConfig} from 'vite'

export default defineConfig({
    base: "/test-imp/",
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
            },
        },
    },
});