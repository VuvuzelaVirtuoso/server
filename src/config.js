function config(env) {
  return {
    server: {
      host: env.HOST || 'localhost',
      port: env.PORT || 80,
      https_port: env.HTTPS_PORT || 443,
      steam_api_key: env.STEAM_API_KEY || false,
      website_url: (!env.WEBSITE_URL) ? false : ('//' + env.WEBSITE_URL),
      secret: env.SECRET || false,
    },
    db: {
      user: env.POSTGRES_USER || env.PGUSER || false,
      password: env.POSTGRES_PASSWORD || env.PGPASSWORD || false,
      database: env.POSTGRES_DB || env.PGDATABASE || false,
      host: env.POSTGRES_HOST || 'db',
      port: env.POSTGRES_PORT || 5432,
      ssl: (!env.POSTGRES_SSL) ? false : true,
      // maximum number of clients in client pool
      max: env.POSTGRES_POOL_MAX || 10,
      // duration that clients are kept open while idle
      idleTimeoutMillis: env.POSTGRES_TIMEOUT || 30000
    },
    templates: {
      title: 'RD2L'
    }
  }
}

module.exports = config
