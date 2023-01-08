// Путь для запуска

1) Простой вариант
npx json-server -w "./server-json/db/db_01122022.json" -p 4000

2) С подгрузкой конфигурации
npx json-server -c "./server-json/json-server.json" "./server-json/db/db_01122022.json"

3) ...из папки \server-json\db
npx json-server -w db-1671963058175.json -p 4000