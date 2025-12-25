# Варианты решения проблемы скачивания шрифтов

## Проблема

При клике на кнопку скачивания шрифт не скачивается напрямую. Есть две основные причины:

### Причина 1: Неправильный формат slug в URL

**Текущий код (app.js:242):**
```javascript
const downloadUrl = `https://dl.dafont.com/dl/?f=${font.slug}`;
```

`font.slug` содержит дефисы (например `thapkie-mg`), но DaFont использует **нижние подчёркивания** (`thapkie_mg`).

### Причина 2: Защита от хотлинкинга / CORS

DaFont проверяет заголовки запроса:
- **Referer** - должен быть с dafont.com
- **CORS** - dl.dafont.com не разрешает кросс-доменные запросы
- Возможна проверка cookies/сессии

Когда пользователь кликает ссылку с вашего сайта, браузер отправляет:
```
Referer: https://your-site.com/
```
Вместо ожидаемого:
```
Referer: https://www.dafont.com/...
```

---

## Варианты решения

### Вариант 1: Исправить формат slug (МИНИМАЛЬНОЕ ИСПРАВЛЕНИЕ)

**Статус:** НЕ ПРОБОВАЛИ

Заменить дефисы на нижние подчёркивания:

```javascript
// app.js, строка 242
const downloadSlug = font.slug.replace(/-/g, '_');
const downloadUrl = `https://dl.dafont.com/dl/?f=${downloadSlug}`;
```

**Плюсы:** Простое исправление, не требует серверной части
**Минусы:** Не решает проблему с Referer/CORS если она есть

---

### Вариант 2: Открывать страницу шрифта на DaFont (РАБОТАЮЩИЙ ОБХОДНОЙ ПУТЬ)

**Статус:** НЕ ПРОБОВАЛИ

Вместо прямой ссылки на скачивание - открывать страницу шрифта:

```javascript
const downloadUrl = font.url; // https://www.dafont.com/thapkie-mg.font
```

**Плюсы:** 100% будет работать, официальный способ
**Минусы:** Пользователю нужно нажать ещё раз на DaFont

---

### Вариант 3: Серверный прокси для скачивания

**Статус:** НЕ ПРОБОВАЛИ

Создать API endpoint который:
1. Принимает slug шрифта
2. Делает запрос к dl.dafont.com с правильными заголовками
3. Возвращает файл пользователю

```javascript
// api/download.js
export default async function handler(req, res) {
  const { slug } = req.query;
  const downloadSlug = slug.replace(/-/g, '_');

  const response = await fetch(`https://dl.dafont.com/dl/?f=${downloadSlug}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0...',
      'Referer': 'https://www.dafont.com/',
      'Accept': '*/*'
    }
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Download failed' });
  }

  // Передаём заголовки для скачивания
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="${downloadSlug}.zip"`);

  const buffer = await response.arrayBuffer();
  res.send(Buffer.from(buffer));
}
```

Клиентский код:
```javascript
const downloadUrl = `/api/download?slug=${font.slug}`;
```

**Плюсы:** Полный контроль, обходит все ограничения
**Минусы:** Нагрузка на ваш сервер, потенциальные юридические вопросы

---

### Вариант 4: Использовать атрибут download с blob (ЭКСПЕРИМЕНТАЛЬНЫЙ)

**Статус:** НЕ ПРОБОВАЛИ

Скачать через fetch и создать blob URL:

```javascript
async function downloadFont(slug) {
  const downloadSlug = slug.replace(/-/g, '_');
  const url = `/api/download?slug=${downloadSlug}`; // через прокси

  const response = await fetch(url);
  const blob = await response.blob();

  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = `${downloadSlug}.zip`;
  a.click();
  URL.revokeObjectURL(blobUrl);
}
```

**Плюсы:** Файл скачивается без открытия новых вкладок
**Минусы:** Требует серверный прокси (вариант 3)

---

### Вариант 5: rel="noreferrer" для скрытия Referer

**Статус:** НЕ ПРОБОВАЛИ

Добавить атрибут для скрытия источника:

```html
<a class="btn-download"
   href="${downloadUrl}"
   target="_blank"
   rel="nofollow noreferrer noopener"
   download>
```

**Плюсы:** Простое изменение
**Минусы:** Может не сработать, DaFont может требовать Referer

---

### Вариант 6: Парсить реальную ссылку со страницы шрифта

**Статус:** НЕ ПРОБОВАЛИ

При получении данных шрифта, также парсить ссылку скачивания:

```javascript
async function getFontData(fontUrl) {
  const html = await fetchHTML(fontUrl);

  // Существующий код...
  const previewMatch = html.match(/src="(\/img\/charmap\/[^"]+)"/);

  // Добавить парсинг ссылки скачивания
  const downloadMatch = html.match(/href="(\/\/dl\.dafont\.com\/dl\/\?f=[^"]+)"/);
  const downloadUrl = downloadMatch
    ? 'https:' + downloadMatch[1]
    : null;

  return { previewUrl, name, downloadUrl };
}
```

**Плюсы:** Получаем точную ссылку с DaFont
**Минусы:** Всё равно может быть проблема с Referer

---

## Рекомендуемый порядок тестирования

1. **Сначала попробовать Вариант 1** - просто исправить формат slug
2. Если не помогло - добавить **Вариант 5** (noreferrer)
3. Если не помогло - **Вариант 6** (парсинг реальной ссылки)
4. Если не помогло - **Вариант 3** (серверный прокси)
5. Если всё не работает - **Вариант 2** (открывать страницу DaFont)

---

## Текущий статус

- [ ] Вариант 1: Исправить slug (заменить - на _)
- [ ] Вариант 5: Добавить noreferrer
- [ ] Вариант 6: Парсить ссылку с DaFont
- [ ] Вариант 3: Серверный прокси
- [ ] Вариант 2: Открывать страницу DaFont (fallback)
