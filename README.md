Medlemmar: Wilhelm Berggren, Nils Lundell

# Beskrivning:

Nilhelm Hacker News är en länkaggrigator. Från frontend kan man hämta alla inlägg, och skicka in nya inlägg.

# Mikrotjänster

## Frontend

Frontend är skrivet i Preact, ett alternativ till React. Vanligtvis används JSX, men för att undvika ett byggsteg används istället HTM. Frontenden använder nginx för att leverera den statiska sidan.

## Backend

Backend är ett C# WebAPI som använder Entity Framework. Backenden har GET och POST definerade för att hämta och lägga till nya inlägg.

## Persistenslager

Som persistenslager använder vi PostgreSQL, deployat i en egen container. Att separera kod från data har fördelen att man inte behöver oroa sig över att förlora data om man av någon anledning behöver återställa backend.

## Bonus: Adminer

Klassiska phpMyAdmin har bytt namn till Adminer, och är ett enkelt sätt att inspektera och konfigurera sin databas.