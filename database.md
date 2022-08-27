Die Überschriften sind die Namen der Tabellen, in Klammern der Datentyp (? > geraten)

# blacklist
| word (text) |
|-------------|
|             |

# botwelle

| userid (bigint)   | timestamp (bigint) |
|-------------------|--------------------|
|                   |                    |

# cases

| caseid (text)   | user (bigint)   | serverid (bigint)   | type (text) | tags (text) | reason (text) | moderator (bigint)   | channel (text) | timestamp (date)    | endTimestamp (bigint) |
|-----------------|-----------------|---------------------|-------------|-------------|---------------|----------------------|----------------|---------------------|-----------------------|
|                 |                 |                     |             |             |               |                      |                |                     |                       |

# mutes

| intern (int)    | id (text)     | serverid (bigint)   | bereich | duration | timestamp |
|-----------------|---------------|---------------------|---------|----------|-----------|
|                 |               |                     |         |          |           |

# noniceones

| id (bigint)   | serverid (bigint)   | timestamp (bigint)   |
|---------------|---------------------|----------------------|
|               |                     |                      |

# serverconfig

| logchannel (bigint)   |  welcomerole (bigint)  | serverlog (longtext) | modlog (longtext)  |
|-----------------------|------------------------|----------------------|--------------------|
|                       |                        |                      |                    |

# usedLinks

| link (text)   | count (bigint)|
|---------------|---------------|
|               |               |

# usernotes

| user (bigint)   | moderator (bigint)   | note (text)   | id (int)   |
|-----------------|----------------------|---------------|------------|
|                 |                      |               |            |

# userroles

| userid (bigint)   | roleid (bigint)   |
|-------------------|-------------------|
|                   |                   |


# whitelist

| link (text)   |
|---------------|
|               |
