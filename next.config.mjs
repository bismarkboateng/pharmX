/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.guim.co.uk",
                port: "",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "i0.wp.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "i.pinimg.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "s.yimg.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "i.guim.co.uk",
                port: "",
            }
        ]
    }
};

export default nextConfig;
