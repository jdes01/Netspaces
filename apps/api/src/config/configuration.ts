export default () => ({
  database: {
    uri: process.env.DATABASE_URL || 'mongodb://mongodb:27017/database',
  },
  eventstore: {
    category: process.env.EVENTSTORE_STREAM,
    connection:
      process.env.EVENTSTORE_URL || 'esdb://eventstore:2113?tls=false',
  },
});
