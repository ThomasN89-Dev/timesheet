# Plan: Creazione Timesheet on-demand

## Stato attuale
La pagina Overview renderizza tutti i 12 mesi dell'anno, ciascuno con la propria card e logiche (orari, weekend, ecc.).

## Cosa cambiare
L'utente parte da una **pagina vuota** (nessun mese visibile).

1. Un pulsante permette di creare un nuovo timesheet.
2. Al click viene chiamata una funzione `createTimesheet(month, year)`.
3. Solo i timesheet creati dall'utente vengono renderizzati, con le card e le logiche attuali (orari, weekend, festivi, ecc.).

## Decisioni prese
- **Persistenza**: localStorage per ora, poi migrazione a Zustand.
- **Eliminazione**: prevista, ma si implementa in un secondo momento.
- **Validazione duplicati**: controllo su combinazione mese+anno prima di creare, per evitare timesheet doppi.
