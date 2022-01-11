module.exports = {
    lintOnSave: false,
    configureWebpack: (config) => {
        config.module.rules.push({
            test: /\.worker.js$/,
            use: {
                loader: 'worker-loader',
                // 允许将内联的 web worker 作为 BLOB
                options: { inline: 'no-fallback' },
            },
        });
    },
};
