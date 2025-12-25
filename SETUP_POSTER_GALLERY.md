# Настройка галереи плакатов

Этот гайд поможет настроить бэкенд для галереи плакатов с модерацией. Используем **Supabase** - это полностью бесплатно (до 500MB базы данных + 1GB хранилища файлов).

---

## Шаг 1: Создание аккаунта Supabase

1. Перейди на [supabase.com](https://supabase.com)
2. Нажми **Start your project** (можно войти через GitHub)
3. Создай новый проект:
   - **Name**: `random-dafont` (или любое другое)
   - **Database Password**: придумай надёжный пароль (сохрани его!)
   - **Region**: выбери ближайший (например, Frankfurt для EU)
4. Дождись создания проекта (~2 минуты)

---

## Шаг 2: Создание таблицы для плакатов

1. В левом меню выбери **SQL Editor**
2. Нажми **New query**
3. Вставь этот SQL-код и нажми **Run**:

```sql
-- Создаём таблицу для плакатов
CREATE TABLE posters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Данные от пользователя
  nickname TEXT NOT NULL,
  instagram TEXT,
  image_url TEXT NOT NULL,

  -- Модерация
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  moderated_at TIMESTAMP WITH TIME ZONE,

  -- Дополнительно (для будущего)
  email TEXT,
  description TEXT
);

-- Создаём индекс для быстрой выборки одобренных плакатов
CREATE INDEX idx_posters_status ON posters(status);
CREATE INDEX idx_posters_created ON posters(created_at DESC);

-- Включаем Row Level Security
ALTER TABLE posters ENABLE ROW LEVEL SECURITY;

-- Политика: все могут читать ТОЛЬКО одобренные плакаты
CREATE POLICY "Anyone can view approved posters"
  ON posters FOR SELECT
  USING (status = 'approved');

-- Политика: все могут добавлять новые плакаты (они будут pending)
CREATE POLICY "Anyone can submit posters"
  ON posters FOR INSERT
  WITH CHECK (status = 'pending');
```

---

## Шаг 3: Настройка хранилища для изображений

1. В левом меню выбери **Storage**
2. Нажми **New bucket**
3. Настрой bucket:
   - **Name**: `posters`
   - **Public bucket**: ВКЛючи (toggle ON) - чтобы изображения были доступны публично
4. Нажми **Create bucket**

### Настройка политик для bucket:

1. Нажми на созданный bucket `posters`
2. Перейди во вкладку **Policies**
3. Нажми **New policy** → **For full customization**
4. Создай политику для загрузки:
   - **Policy name**: `Allow public uploads`
   - **Allowed operation**: INSERT
   - **Target roles**: оставь пустым (все)
   - **Policy definition**: `true`
5. Нажми **Review** → **Save policy**

6. Создай ещё одну политику для чтения:
   - **Policy name**: `Allow public reads`
   - **Allowed operation**: SELECT
   - **Target roles**: оставь пустым
   - **Policy definition**: `true`
7. Нажми **Review** → **Save policy**

---

## Шаг 4: Получение ключей API

1. В левом меню выбери **Project Settings** (иконка шестерёнки внизу)
2. Выбери **API**
3. Тебе нужны два значения:
   - **Project URL** (например: `https://xxxxx.supabase.co`)
   - **anon public** ключ (длинная строка, начинается с `eyJ...`)

---

## Шаг 5: Добавление ключей в Vercel

1. Открой свой проект на [vercel.com](https://vercel.com)
2. Перейди в **Settings** → **Environment Variables**
3. Добавь две переменные:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | твой Project URL |
| `SUPABASE_ANON_KEY` | твой anon public ключ |

4. Нажми **Save**
5. **Важно**: После добавления переменных нужно сделать redeploy:
   - Перейди во вкладку **Deployments**
   - Найди последний деплой
   - Нажми на три точки → **Redeploy**

---

## Шаг 6: Панель модерации

Для модерации плакатов используй встроенный интерфейс Supabase:

1. В левом меню выбери **Table Editor**
2. Выбери таблицу `posters`
3. Здесь ты видишь все заявки
4. Чтобы одобрить плакат:
   - Нажми на строку
   - Измени `status` с `pending` на `approved`
   - Нажми **Save**
5. Чтобы отклонить - измени на `rejected`

### Фильтрация:

- Нажми **Filter** вверху
- Добавь фильтр: `status` → `equals` → `pending`
- Теперь видны только плакаты на модерации

---

## Бесплатные лимиты Supabase

| Ресурс | Лимит |
|--------|-------|
| База данных | 500 MB |
| Хранилище файлов | 1 GB |
| Bandwidth | 2 GB/месяц |
| API запросы | Безлимитно |

Этого хватит на ~1000-2000 плакатов (при среднем размере 500KB на плакат).

---

## Структура данных

После настройки, каждый плакат будет содержать:

```json
{
  "id": "uuid-автоматически",
  "created_at": "2024-01-15T12:00:00Z",
  "nickname": "designer123",
  "instagram": "@designer123",
  "image_url": "https://xxx.supabase.co/storage/v1/object/public/posters/filename.jpg",
  "status": "pending | approved | rejected",
  "moderated_at": null
}
```

---

## Готово!

После выполнения всех шагов:
1. Пользователи смогут загружать плакаты через форму на сайте
2. Плакаты будут попадать в Supabase со статусом `pending`
3. Ты модерируешь их через Table Editor в Supabase
4. Одобренные плакаты автоматически появляются в галерее на сайте

---

## Troubleshooting

### Плакаты не загружаются
- Проверь, что bucket `posters` публичный
- Проверь политики bucket (должны быть INSERT и SELECT)

### Галерея пустая
- Проверь, что есть плакаты со статусом `approved`
- Проверь переменные окружения в Vercel

### Ошибка 401/403 при загрузке
- Проверь, что `SUPABASE_ANON_KEY` правильный
- Сделай redeploy после добавления переменных
