export default () => ({
  database: {
    uri:
      process.env.BOOKING_MICROSERVICE_DATABASE_URL ||
      'mongodb://booking-mongodb:27017/database',
  },
  eventstore: {
    category: process.env.BOOKING_MICROSERVICE_EVENTSTORE_STREAM,
    connection:
      process.env.BOOKING_MICROSERVICE_EVENTSTORE_URL ||
      'esdb://booking-eventstore:2113?tls=false',
  },
});
