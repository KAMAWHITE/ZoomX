export default {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*', // yoki kerakli routing
      },
    ];
  },
};