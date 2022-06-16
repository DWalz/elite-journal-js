# Elite Journal

A lightweight TS/JS event-driven watcher and API for the Elite Dangerous Journal.

Polls the journal files from the Game Elite Dangerous and looks for event updates
which are emitted as journal events. The event property names are the same as the
property names in the actual journal file.

Advanced Typescript types and overloads are provided for the event system.


## Usage

CommonJS:
```js
const journal = require('elite-journal');

const watcher = journal().on('docked', (event) => console.log(`Docked at ${event.StationName}`));

watcher.on('fsd-jump', (event) => console.log(`Jumped to ${event.StarSystem}`));
```

ES Module:
```js
import journal from 'elite-journal';

// ...
```