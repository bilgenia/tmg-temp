import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import FullReload from 'vite-plugin-full-reload';
import { resolve } from 'path';
import glob from 'fast-glob';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
    base: isProduction ? '' : '/',
    root: 'src',
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@img': resolve(__dirname, 'src/img'),
            '~': resolve(__dirname, 'public')
        }
    },
    publicDir: '../public',
    css: {
        postcss: './postcss.config.cjs',
        preprocessorOptions: {
            scss: {
                api: 'modern'
            }
        }
    },
    server: {
        proxy: {
            '/wp-admin': 'http://localhost:8888',
            '/wp-content': 'http://localhost:8888',
            '/wp-includes': 'http://localhost:8888',
            '/wp-json': 'http://localhost:8888',
        },
        watch: {
            usePolling: true,
            interval: 1000
        },
        hmr: {
            host: 'localhost'
        }
    },
    build: {
        outDir: '../dist',
        assetsDir: './',
        emptyOutDir: true,
        manifest: false,
        rollupOptions: {
            input: {
                'js/app': resolve(__dirname, 'src/js/app.js'),
                ...(
                    () => glob.sync('src/sass/[!_]*.scss', { cwd: __dirname })
                        .reduce((entries, filename) => {
                            const [, name] = filename.match(/([^/]+)\.scss$/);
                            return { ...entries, [name]: resolve(__dirname, filename) };
                        }, {})
                )(),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: (assetInfo) => {
                    const extType = assetInfo.name.split('.').pop();
                    // group fonts in a folder
                    if (['woff', 'woff2', 'ttf'].includes(extType)) {
                        return 'fonts/[name].[ext]';
                    }
                    // group images in a folder
                    if (['gif', 'jpg', 'jpeg', 'png', 'svg', 'webp'].includes(extType)) {
                        return 'img/[name].[ext]';
                    }
                    return '[ext]/[name].[ext]';
                },
            },
        }
    },
    optimizeDeps: {
        include: ['js/app.js']
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'template',
                    dest: ''
                },
                {
                    src: 'my-snow-monkey.php',
                    dest: ''
                },
                {
                    src: 'README.*',
                    dest: ''
                }
            ],
            failOnError: false
        }),
        FullReload(
            ['**/*.php'], { root: __dirname }
        ),
    ]
});