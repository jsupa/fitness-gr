// set -a; source app.env; set +a

const config = {
  webPort: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || 'Ah0jJWTS3cr3t',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'Ah0jR3fr3shT0k3nS3cr3t',
  db: {
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'fitness_app',
    logging: process.env.DB_LOGGING === 'false',
  },
  password: {
    secret: process.env.PASSWORD_SECRET || 'your-secret-key-here-32-charspls',
    iv: process.env.PASSWORD_IV || 'your-iv-16-chars',
  },
}

export default config
