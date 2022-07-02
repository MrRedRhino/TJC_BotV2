Die Überschriften sind die Namen der Tabellen, in Klammern der Datentyp (? > geraten)

# serverconfig
| logchannel (bigint ?) | welcomerole (bigint ?) | serverlog (bigint ?) |
|-----------------------|------------------------|----------------------|
|                       |                        |                      |

# userroles
| userid (bigint ?) | roleid (bigint ?) |
|-------------------|-------------------|
|                   |                   |

# noniceones

| id (bigint ?) | serverid (bigint ?) | timestamp (bigint ?) |
|---------------|---------------------|----------------------|
|               |                     |                      |

# mutes

| intern (bool ?) | id (bigint ?) | serverid (bigint ?) | bereich | duration | timestamp |
|-----------------|---------------|---------------------|---------|----------|-----------|
|                 |               |                     |         |          |           |

# blacklist
| word (text ?) |
|---------------|
|               |

# cases
| caseid (int ?) | user (bigint ?) | serverid (bigint ?) | type (text) | tags (text) | reason (text) | moderator (bigint ?) | channel (text) | timestamp (date/text ?) | endTimestamp (text) |
|----------------|-----------------|---------------------|-------------|-------------|---------------|----------------------|----------------|-------------------------|---------------------|
|                |                 |                     |             |             |               |                      |                |                         |                     |

# whitelist

| link (text ?) |
|---------------|
|               |

