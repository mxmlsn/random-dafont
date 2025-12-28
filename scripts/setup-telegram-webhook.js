#!/usr/bin/env node
// Script to set up Telegram webhook with secret_token
// Usage: node scripts/setup-telegram-webhook.js

import 'dotenv/config';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const WEBHOOK_URL = process.env.WEBHOOK_URL; // e.g., https://your-domain.vercel.app/api/telegram-webhook

async function setupWebhook() {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('Error: TELEGRAM_BOT_TOKEN is not set');
    process.exit(1);
  }

  if (!TELEGRAM_WEBHOOK_SECRET) {
    console.error('Error: TELEGRAM_WEBHOOK_SECRET is not set');
    process.exit(1);
  }

  if (!WEBHOOK_URL) {
    console.error('Error: WEBHOOK_URL is not set');
    console.error('Example: WEBHOOK_URL=https://your-domain.vercel.app/api/telegram-webhook');
    process.exit(1);
  }

  console.log('Setting up Telegram webhook...');
  console.log(`URL: ${WEBHOOK_URL}`);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: WEBHOOK_URL,
          secret_token: TELEGRAM_WEBHOOK_SECRET,
          allowed_updates: ['callback_query']
        })
      }
    );

    const result = await response.json();

    if (result.ok) {
      console.log('Webhook set successfully!');
      console.log('Response:', JSON.stringify(result, null, 2));
    } else {
      console.error('Failed to set webhook:', result.description);
      process.exit(1);
    }

    // Get webhook info to verify
    const infoResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`
    );
    const info = await infoResponse.json();
    console.log('\nWebhook info:');
    console.log(JSON.stringify(info.result, null, 2));

  } catch (error) {
    console.error('Error setting up webhook:', error.message);
    process.exit(1);
  }
}

setupWebhook();
