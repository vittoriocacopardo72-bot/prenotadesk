export const planCards = [
  { nome: "Free", prezzo: "€0/mese", target: "1 utente", features: "Funzioni base" },
  { nome: "Pro", prezzo: "€29/mese", target: "3 utenti", features: "Prenotazioni illimitate, report base" },
  { nome: "Business", prezzo: "€79/mese", target: "10 utenti", features: "Flotta avanzata, report completi, backup" },
  { nome: "Enterprise", prezzo: "Su richiesta", target: "Multi-sede", features: "Supporto prioritario, integrazioni personalizzate" },
] as const

export type StaticSettingsItem = {
  label: string
  value: string
}

export type ToggleSettingsItem = {
  label: string
  /** Default copy when preference is unset (treated as on). */
  value: string
  prefKey: string
  control: "toggle"
  onLabel: string
  offLabel: string
}

export type SettingsItemDef = StaticSettingsItem | ToggleSettingsItem

export type SettingsGroupDef = {
  id: string
  title: string
  subtitle: string
  items: readonly SettingsItemDef[]
}

export type SettingsItemResolved =
  | { label: string; value: string; control: "static" }
  | { label: string; value: string; control: "toggle"; prefKey: string; isOn: boolean }

export const settingsGroups: readonly SettingsGroupDef[] = [
  { id: "profilo-azienda", title: "Profilo azienda", subtitle: "Identita legale e dati ufficiali", items: [{ label: "Ragione sociale", value: "PrenotaDesk Marine S.r.l." }, { label: "Nome commerciale", value: "PrenotaDesk Marine" }, { label: "Email operativa", value: "operativo@prenotadeskmarine.it" }, { label: "Telefono", value: "+39 081 555 0133" }, { label: "Sede", value: "Marina Centro, Napoli" }, { label: "Partita IVA", value: "IT01234567890" }, { label: "Logo placeholder", value: "Logo quadrato 512x512 (mock)" }, { label: "Descrizione attivita", value: "Tour marini, charter e servizi accessori." }] },
  {
    id: "preferenze-app",
    title: "Preferenze app",
    subtitle: "Comportamenti standard per gli utenti operativi",
    items: [
      { label: "Vista iniziale", value: "Dashboard" },
      { label: "Notifiche operative", value: "Email giornaliera attiva" },
      { label: "Ordine sezioni", value: "Priorita a prenotazioni e calendario" },
      {
        label: "Suggerimenti rapidi",
        value: "Abilitati",
        prefKey: "suggerimenti-rapidi",
        control: "toggle",
        onLabel: "Abilitati",
        offLabel: "Disabilitati",
      },
      {
        label: "Conferme azioni sensibili",
        value: "Attive",
        prefKey: "conferme-azioni-sensibili",
        control: "toggle",
        onLabel: "Attive",
        offLabel: "Disattive",
      },
    ],
  },
  { id: "operativita-giornaliera", title: "Operativita giornaliera", subtitle: "Regole operative per il coordinamento partenze", items: [{ label: "Orari apertura", value: "08:00 - 20:00" }, { label: "Slot prenotazione", value: "Ogni 30 minuti" }, { label: "Buffer tra partenze", value: "20 minuti" }, { label: "Limite massimo ospiti", value: "120 ospiti/giorno" }, { label: "Tempo check-in", value: "15 minuti" }, { label: "Gestione meteo", value: "Soglia vento > 22 nodi: revisione uscite" }, { label: "Chiusure straordinarie", value: "Nessuna chiusura programmata" }] },
  { id: "flotta-imbarcazioni", title: "Flotta e manutenzioni", subtitle: "Capacita, manutenzione e priorita assegnazione", items: [{ label: "Capacita massima default", value: "8 pax per open, 12 pax premium" }, { label: "Stato manutenzioni", value: "2 ticket aperti, 1 in scadenza" }, { label: "Priorita assegnazione barche", value: "Per disponibilita + rating cliente" }, { label: "Intervalli tagliandi", value: "Ogni 150h motore" }, { label: "Tracking utilizzo", value: "Aggiornamento giornaliero mock" }, { label: "Stato carburante mock", value: "Media flotta: 72%" }] },
  { id: "staff-equipaggi", title: "Staff e permessi", subtitle: "Ruoli, disponibilita e conformita documentale", items: [{ label: "Ruoli operativi", value: "Skipper, steward, banchina, coordinatore" }, { label: "Disponibilita skipper", value: "7 disponibili oggi" }, { label: "Turni", value: "Mattina/Pomeriggio con copertura completa" }, { label: "Permessi staff", value: "Profili base, manager, admin" }, { label: "Accessi amministrativi", value: "3 account admin attivi" }, { label: "Stato documenti equipaggio", value: "1 rinnovo in scadenza (7 giorni)" }] },
  { id: "prenotazioni-clienti", title: "Prenotazioni e clienti", subtitle: "Automazioni booking e governance anagrafiche", items: [{ label: "Conferma automatica", value: "Attiva per richieste standard" }, { label: "Stati prenotazione", value: "In attesa, Confermata, In arrivo, Cancellata" }, { label: "Policy cancellazione", value: "48h con rimborso parziale" }, { label: "Reminder automatici", value: "T-24h email, T-2h SMS mock" }, { label: "Gestione clienti VIP", value: "Tag VIP con priorita upgrade" }, { label: "Blacklist clienti mock", value: "2 profili segnalati" }] },
  { id: "pagamenti-fatturazione", title: "Finanza operativa e fatturazione", subtitle: "Parametri economici, incassi e flussi contabili (mock)", items: [{ label: "Valuta", value: "EUR (€)" }, { label: "Metodi pagamento supportati", value: "Carta, bonifico, contanti" }, { label: "Stato Stripe mock", value: "Non configurato" }, { label: "Stato PayPal mock", value: "In revisione" }, { label: "Fatturazione automatica", value: "Disattiva" }, { label: "Depositi cauzionali", value: "Abilitati per noleggio premium" }, { label: "Rimborsi", value: "Manuali con approvazione manager" }] },
  { id: "piani-abbonamento", title: "Piani e abbonamento", subtitle: "Gestione piano corrente, limiti e opzioni upgrade", items: [{ label: "Piano corrente", value: "Free" }, { label: "Utilizzo piano", value: "42 prenotazioni mese (mock)" }, { label: "Limiti utenti", value: "1 utente attivo" }, { label: "Limiti prenotazioni", value: "100/mese in profilo Free (mock)" }, { label: "Stato rinnovo", value: "Non attivo" }, { label: "Storico fatture mock", value: "Nessuna fattura disponibile" }] },
  { id: "lingua-localizzazione", title: "Lingua e localizzazione", subtitle: "Regole locali per UI e reportistica", items: [{ label: "Lingua", value: "Italiano (it-IT)" }, { label: "Fuso orario", value: "Europe/Rome (UTC+1/UTC+2)" }, { label: "Formato data", value: "gg/mm/aaaa" }, { label: "Formato valuta", value: "€ 1.234,56" }, { label: "Settimana lavorativa", value: "Lunedi - Domenica" }, { label: "Paese operativo", value: "Italia" }] },
  { id: "aspetto-applicazione", title: "Aspetto applicazione", subtitle: "Preferenze interfaccia per il team operativo", items: [{ label: "Tema chiaro/scuro", value: "Chiaro predefinito (scuro mock)" }, { label: "Radius interfaccia", value: "Medium (8px)" }, { label: "Densita layout", value: "Compatta operativa" }, { label: "Sidebar compatta", value: "Disattiva" }, { label: "Dimensione testo", value: "Standard" }, { label: "Colore principale mock", value: "Sky 600" }, { label: "Preferenze dashboard", value: "Widget KPI + agenda attivi" }] },
  { id: "sicurezza-backup", title: "Sicurezza e backup", subtitle: "Protezione accessi e integrita dati", items: [{ label: "Backup automatici", value: "Attivi" }, { label: "Frequenza backup", value: "Ogni 24 ore" }, { label: "Conservazione dati", value: "30 giorni" }, { label: "2FA mock", value: "Richiesta per utenti admin" }, { label: "Sessioni attive mock", value: "5 sessioni attive" }, { label: "Registro accessi mock", value: "Nessuna anomalia ultime 48h" }, { label: "Stato sicurezza sistema", value: "Buono" }] },
  { id: "api-integrazioni", title: "API e integrazioni", subtitle: "Connettori esterni e endpoint tecnici", items: [{ label: "Meteo marino", value: "Connesso (mock feed)" }, { label: "Google Calendar", value: "Non collegato" }, { label: "Stripe", value: "Placeholder API key presente" }, { label: "WhatsApp", value: "Template notifiche pronti (mock)" }, { label: "Email SMTP", value: "smtp.mock.local:587" }, { label: "Webhook mock", value: "3 endpoint registrati" }, { label: "API key placeholders", value: "pk_live_xxx / sk_live_xxx" }] },
  { id: "avanzate", title: "Sistema e manutenzione", subtitle: "Controlli tecnici piattaforma e diagnostica", items: [{ label: "Modalita manutenzione", value: "Disattiva" }, { label: "Ambiente sviluppo", value: "Staging mock" }, { label: "Cache sistema", value: "Warm cache attiva" }, { label: "Log applicazione", value: "Livello info" }, { label: "Versione piattaforma", value: "v0.1.0-mock" }, { label: "Reset configurazioni", value: "Azione protetta (mock)" }] },
]

export const baseSettingsGroupIds = ["profilo-azienda", "preferenze-app", "lingua-localizzazione", "aspetto-applicazione", "piani-abbonamento"] as const
export const advancedSettingsGroupIds = ["operativita-giornaliera", "flotta-imbarcazioni", "staff-equipaggi", "pagamenti-fatturazione", "sicurezza-backup", "api-integrazioni", "avanzate"] as const
