declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'

      APP_PORT: string

      KAFKA_ID: string
      KAFKA_BROKER: string
      KAFKA_RETRY_TIME: string
      KAFKA_RETRY_TIMES: string
    }
  }
}

export {}
