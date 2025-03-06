/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5699',
            },
            {
                protocol: 'https',
                hostname: 'krishnamseeds.in',
                port: '5699',
            },
            {
                protocol: 'https',
                hostname: 'krishnamseeds.in',
            },
        ],
    },
};

module.exports = nextConfig;