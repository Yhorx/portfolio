/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Solo aplicamos basePath en el servidor CI (como GitHub Actions) o producción,
  // para que localmente funcione sin la ruta /portfolio
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
