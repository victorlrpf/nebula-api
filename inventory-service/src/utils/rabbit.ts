import amqp from 'amqplib';

let channel: amqp.Channel | null = null;
export async function createPublisher() {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await conn.createChannel();
    await channel.assertExchange('inventory_events', 'fanout', { durable: false });
    console.log('RabbitMQ connected');
  } catch (err) {
    console.warn('RabbitMQ not available (continuing without),', (err as any).message);
  }
}

export async function publishEvent(payload: object) {
  if (!channel) return;
  channel.publish('inventory_events', '', Buffer.from(JSON.stringify(payload)));
}
