# Настройка Telegram бота для модерации постеров

## Шаг 1: Создание бота

1. Открой Telegram и найди [@BotFather](https://t.me/BotFather)
2. Отправь команду `/newbot`
3. Введи имя бота (например: `Random DaFont Moderation`)
4. Введи username бота (например: `randomdafont_mod_bot`)
5. **Сохрани токен!** Он выглядит примерно так:
   ```
   7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
   ```

## Шаг 2: Получение Chat ID

1. Напиши боту любое сообщение в Telegram
2. Открой в браузере:
   ```
   https://api.telegram.org/bot<ТВОЙ_ТОКЕН>/getUpdates
   ```
   Замени `<ТВОЙ_ТОКЕН>` на токен из шага 1
3. В ответе найди `"chat":{"id":123456789}` — это твой Chat ID

**Альтернативный способ:**
- Найди бота [@userinfobot](https://t.me/userinfobot)
- Отправь ему `/start`
- Он покажет твой User ID (это и есть Chat ID)

## Шаг 3: Добавление переменных в Vercel

1. Зайди в [Vercel Dashboard](https://vercel.com)
2. Выбери проект `random-dafont`
3. Перейди в **Settings** → **Environment Variables**
4. Добавь три новые переменные:

| Имя | Значение |
|-----|----------|
| `TELEGRAM_BOT_TOKEN` | Токен бота из шага 1 |
| `TELEGRAM_CHAT_ID` | Chat ID из шага 2 |
| `SUPABASE_SERVICE_KEY` | Service Role Key из Supabase (см. ниже) |

### Где взять SUPABASE_SERVICE_KEY:
1. Зайди в [Supabase Dashboard](https://app.supabase.com)
2. Выбери проект
3. Перейди в **Project Settings** → **API**
4. Скопируй **service_role key** (секретный ключ, НЕ anon key!)

⚠️ **Важно:** service_role key обходит Row Level Security и нужен для обновления статуса постера из webhook.

## Шаг 4: Установка Webhook

После деплоя на Vercel нужно сообщить Telegram, куда отправлять уведомления о нажатиях кнопок.

Открой в браузере (замени значения):
```
https://api.telegram.org/bot<ТВОЙ_ТОКЕН>/setWebhook?url=https://<ТВОЙ_ДОМЕН>/api/telegram-webhook
```

Пример:
```
https://api.telegram.org/bot7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw/setWebhook?url=https://randomdafont.vercel.app/api/telegram-webhook
```

Ты увидишь ответ:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

## Шаг 5: Redeploy

1. В Vercel Dashboard → **Deployments**
2. Найди последний деплой
3. Нажми три точки → **Redeploy**
4. Дождись завершения

## Готово!

Теперь при каждом новом постере ты получишь сообщение в Telegram с картинкой и двумя кнопками:
- ✅ **Approve** — одобрить постер
- ❌ **Reject** — отклонить постер

Кнопки работают как toggle — можно передумать и нажать другую кнопку в любой момент. Статус обновится в базе данных автоматически.

---

## Проверка работы

### Проверить webhook:
```
https://api.telegram.org/bot<ТВОЙ_ТОКЕН>/getWebhookInfo
```

### Удалить webhook (если нужно):
```
https://api.telegram.org/bot<ТВОЙ_ТОКЕН>/deleteWebhook
```

### Тестовое сообщение (проверить что бот работает):
```
https://api.telegram.org/bot<ТВОЙ_ТОКЕН>/sendMessage?chat_id=<ТВОЙ_CHAT_ID>&text=Test
```

---

## Troubleshooting

**Бот не присылает сообщения:**
- Проверь что `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` добавлены в Vercel
- Проверь что был сделан Redeploy после добавления переменных
- Убедись что Chat ID правильный (попробуй тестовое сообщение)

**Кнопки не работают:**
- Проверь что webhook установлен (см. getWebhookInfo)
- Проверь что `SUPABASE_SERVICE_KEY` добавлен в Vercel
- Проверь логи в Vercel Dashboard → Deployments → Functions

**Ошибка "Poster not found":**
- Это значит что постер был удалён из базы данных
