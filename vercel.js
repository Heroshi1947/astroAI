{
  "version": 2,
  "builds": [
    {
      "src": "astroAI/astro_ai/package.json", 
      "use": "@vercel/react"
    },
    {
      "src": "api/get-interpretation.js", 
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/get-interpretation",
      "dest": "/backend/get-interpretation.js"
    },
    {
      "src": "/(.*)",
      "dest": "/astroAI/astro_ai/$1"
    }
  ]
}
