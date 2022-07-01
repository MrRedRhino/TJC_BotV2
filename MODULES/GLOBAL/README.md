# Debug-System
Systeme, die die Zusammenarbeit erleichtern.

### Console-Messages
Beschreibung: Erstellt einen Debug-Eintrag für alle anderen Developer in der Console.
Ort: `/MODULES/GLOBAL/DEBUG.js`
Nutzung: `GLOBAL_DEBUG.console(type, identifier, message)` 

`type`: Muss "log", "warn" oder "error" sein
`identifier`: Gebe hier einen Debug Code ein, der deinen Code Snippet erkennbar macht (bsp.: BOT.js_DISCORD_READY)
`message`: Eine detaillierte Nachricht. Kann auf Deutsch oder Englisch sein.


### Throw-System
Beschreibung: Beende den Code, weil dein Code Snippet einen schweren Fehler erzeugt.
Ort: `/MODULES/GLOBAL/THROW.js`
Nutzung: `GLOBAL_THROW.go(name, message)` 

`name`: Gebe hier einen Debug Code ein, der deinen Code Snippet erkennbar macht (bsp.: BOT.js_DISCORD_READY)
`message`: Eine detaillierte Nachricht. Kann auf Deutsch oder Englisch sein.

Das Throw-System gibt gleichzeitig die Information an, an welcher Stelle des Codes dein Code Snippet aufgerufen wird. So kann sichergestellt werden, dass die richtige Zeile verändert wird.

