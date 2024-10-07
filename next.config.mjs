/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compress: true,
	eslint: { ignoreDuringBuilds: true },
	generateEtags: true,
	reactProductionProfiling: true,
};

export default nextConfig;
