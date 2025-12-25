# Миграция на Cloudinary

Ты уже настроил Supabase по старой инструкции. Теперь добавляем Cloudinary для хранения изображений (25GB бесплатно вместо 1GB).

**Что меняется:**
- ✅ Supabase таблица `posters` — остаётся как есть
- ✅ Supabase Storage bucket — больше не нужен, можно удалить
- ➕ Cloudinary — новое хранилище для изображений

---

## Часть 1: Настройка Cloudinary (✅ выполнено)

### Шаг 1.1: Создание аккаунта ✅

1. Перейди на [cloudinary.com](https://cloudinary.com)
2. Нажми **Sign Up Free**
3. Зарегистрируйся (можно через Google/GitHub)
4. После регистрации попадёшь в Dashboard

### Шаг 1.2: Получение ключей ✅

1. В Dashboard сразу видны твои credentials:
   - **Cloud Name** (например: `dxxxxxxxxx`)
   - **API Key** (число)
   - **API Secret** (строка)

2. Скопируй все три значения — они понадобятся в Части 2

### Шаг 1.3: Создание Upload Preset (важно!) ✅

1. В левом меню выбери **Settings** (шестерёнка)
2. Перейди во вкладку **Upload**
3. Прокрути вниз до **Upload presets**
4. Нажми **Add upload preset**
5. Настрой:
   - **Upload preset name**: `unsigned_posters`
   - **Signing Mode**: **Unsigned** (важно!)
   - **Folder**: `random-dafont`
6. Нажми **Save**

---

## Часть 2: Добавление Cloudinary ключей в Vercel

1. Открой свой проект на [vercel.com](https://vercel.com)
2. Перейди в **Settings** → **Environment Variables**
3. **Добавь 3 новые переменные** (Supabase переменные уже есть, их трогать не нужно):

| Name | Value | Примечание |
|------|-------|------------|
| `CLOUDINARY_CLOUD_NAME` | твой Cloud Name из Части 1 | Новая |
| `CLOUDINARY_API_KEY` | твой API Key из Части 1 | Новая |
| `CLOUDINARY_API_SECRET` | твой API Secret из Части 1 | Новая |

4. Нажми **Save** для каждой переменной
5. **Обязательно сделай Redeploy:**
   - Вкладка **Deployments**
   - Найди последний деплой
   - Три точки → **Redeploy**
   - Дождись завершения (~1-2 минуты)

---

## Часть 3: Очистка Supabase Storage (опционально)

Bucket `posters` больше не используется, можно удалить:

1. В Supabase выбери **Storage**
2. Найди bucket `posters`
3. Три точки → **Delete bucket**

**Важно:** Удали bucket только если уверен, что там нет важных данных!

---

## Готово!

Теперь всё работает с Cloudinary:
- Изображения загружаются в Cloudinary (25GB бесплатно)
- Метаданные хранятся в Supabase (таблица `posters`)
- Модерация остаётся в Supabase Table Editor

---

## Модерация плакатов (как раньше)

Модерация через Supabase Table Editor:

1. В Supabase выбери **Table Editor** → таблица `posters`
2. Все новые заявки имеют статус `pending`
3. Чтобы одобрить:
   - Кликни на строку
   - Измени `status` на `approved`
   - Нажми **Save**
4. Чтобы отклонить — измени на `rejected`

### Быстрая фильтрация:

- Нажми **Filter** → `status` → `equals` → `pending`
- Теперь видны только плакаты на модерации

---

## Новые возможности с Cloudinary

### Автоматическая оптимизация

Cloudinary автоматически:
- Конвертирует изображения в WebP (меньше размер)
- Создаёт thumbnails разных размеров
- Раздаёт через CDN (быстрее загружается)

### Трансформации изображений

URL изображений можно модифицировать на лету:

**Исходный URL:**
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/v123/random-dafont/poster.jpg
```

**С оптимизацией (400px ширина, авто-качество):**
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_400,q_auto/v123/random-dafont/poster.jpg
```

Параметры:
- `w_400` — ширина 400px
- `h_300` — высота 300px
- `q_auto` — автоматическое качество
- `f_auto` — автоматический формат (WebP)
- `c_fill` — обрезать по центру

---

## Troubleshooting

### Ошибка "Cloudinary not configured"
- Проверь, что все 3 Cloudinary переменные добавлены в Vercel
- Убедись, что имена переменных точно совпадают
- Сделай Redeploy после добавления

### Ошибка при загрузке изображения
- Проверь, что Upload Preset называется **точно** `unsigned_posters`
- Проверь, что Signing Mode = **Unsigned**
- Проверь Folder = `random-dafont`

### Галерея пустая
- Проверь, что есть плакаты со статусом `approved` в Supabase
- Старые плакаты из Supabase Storage не отобразятся (URL изменился)

### Изображения не отображаются
- Проверь URL в колонке `image_url` в Supabase
- Новые плакаты должны иметь URL: `https://res.cloudinary.com/...`
- Старые плакаты с URL `https://xxx.supabase.co/storage/...` не будут работать

---

## Бесплатные лимиты

| Сервис | Хранилище | Bandwidth | Примечание |
|--------|-----------|-----------|------------|
| **Cloudinary** | **25 GB** | 25 GB/мес | Автооптимизация, CDN |
| **Supabase** | 500 MB | 2 GB/мес | Только метаданные (~200,000 записей) |

**Итого:** При среднем размере плаката 500KB это **~50,000 плакатов**!
