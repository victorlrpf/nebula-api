Inventory Service
=================

Endpoints:
- POST /api/v1/products  { name, sku, price, quantity }
- GET  /api/v1/products

Notes:
- Caches list in Redis for 60s.
- Publishes events to RabbitMQ exchange 'inventory_events' when product created.
