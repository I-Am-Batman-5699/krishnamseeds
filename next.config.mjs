/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
	reactStrictMode: true,
	compress: true,
	eslint: { ignoreDuringBuilds: true },
	generateEtags: true,
	reactProductionProfiling: true,
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
            },
        ],
    }
};

export default nextConfig;
