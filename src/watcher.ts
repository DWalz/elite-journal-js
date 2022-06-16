import fs, { Stats } from 'fs';
import path from 'path';
import os from 'os';
import chokidar, { FSWatcher } from 'chokidar';

import {
  CargoEvent,
  CommanderEvent,
  DockedEvent,
  DockingGrantedEvent,
  DockingRequestedEvent,
  EngineerProgressEvent,
  FileHeaderEvent,
  FSDJumpEvent,
  FSDTargetEvent,
  FSSSignalDiscoveredEvent,
  JournalEvent,
  JournalEventType,
  LoadGameEvent,
  LoadoutEvent,
  LocationEvent,
  MarketEvent,
  MaterialsEvent,
  MissionsEvent,
  MusicEvent,
  ProgressEvent,
  RankEvent,
  RecieveTextEvent,
  RefuelAllEvent,
  RepairAllEvent,
  ReputationEvent,
  ScanEvent,
  ShipLockerEvent,
  ShipTargetedEvent,
  ShutdownEvent,
  StartJumpEvent,
  StatisticsEvent,
  SupercruiseExitEvent,
  UndockedEvent,
} from './journal-events';
import { EventEmitter } from 'stream';
import { ELITE_DIR_REL, ELITE_JOURNAL_RE } from './constants';
import { randomUUID } from 'crypto';

export default class EliteWatcher extends EventEmitter {
  eliteDataPath: string;
  directoryWatcher: FSWatcher;

  activeJournal?: string;
  lastJournalEvent: Date = new Date();

  cacheDirectory?: string;

  constructor(options?: EliteJournalWatchOptions) {
    super();

    console.log(`Creating watcher...`);

    this.eliteDataPath = path.join(os.homedir(), ELITE_DIR_REL);
    console.log(`Path: ${this.eliteDataPath}`);

    this.directoryWatcher = chokidar.watch(this.eliteDataPath, {
      ignoreInitial: true,
      awaitWriteFinish: true,
      usePolling: true,
    });

    if (options?.cache) {
      console.log(`Caching to ${options.cache}`);
      this.cacheDirectory = options.cache;
    }

    this.directoryWatcher.on('add', (path, stats) =>
      this.handleAddFile(path, stats)
    );
    this.directoryWatcher.on('change', (path, stats) =>
      this.handleChangeFile(path, stats)
    );
  }

  private handleAddFile(file_path: string, stats?: Stats) {
    console.log(`File added: ${file_path}`);

    if (ELITE_JOURNAL_RE.test(path.basename(file_path))) {
      if (this.activeJournal) {
        console.error('Journal already active, skipping');
        return;
      }

      this.activeJournal = file_path;
      this.emit('journal', file_path);

      this.emitEventsFromFile(file_path);
    }
  }

  private handleChangeFile(file_path: string, stats?: Stats) {
    console.log(`File changed: ${file_path}`);
    if (ELITE_JOURNAL_RE.test(path.basename(file_path))) {
      this.emit('journal', file_path);

      this.emitEventsFromFile(file_path);
    }
  }

  private emitEventsFromFile(file_path: string) {
    console.log(`Emitting events from ${file_path}`);

    const events = fs
      .readFileSync(file_path)
      .toString()
      .split('\n')
      .filter((str) => str != '')
      .map((str) => JSON.parse(str) as JournalEvent);

    if (events.length == 0) {
      console.log('No events, skipping');
      return;
    }

    events
      .filter((ev) => new Date(ev.timestamp) > this.lastJournalEvent)
      .forEach((ev) => {
        this.emitEvent(ev);
      });

    this.lastJournalEvent = new Date(events[events.length - 1].timestamp);
  }

  private emitEvent(event: JournalEvent) {
    console.log(`Emitting event of type ${event.event}`);

    // TODO: Maybe this can be abbreviated by a map somehow?
    switch (event.event) {
      case JournalEventType.Cargo:
        {
          this.emit('cargo', event as CargoEvent);
        }
        break;

      case JournalEventType.Commander:
        {
          this.emit('commander', event as CommanderEvent);
        }
        break;

      case JournalEventType.Docked:
        {
          this.emit('docked', event as DockedEvent);
        }
        break;

      case JournalEventType.DockingGranted:
        {
          this.emit('docking-granted', event as DockingGrantedEvent);
        }
        break;

      case JournalEventType.DockingRequested:
        {
          this.emit('docking-requested', event as DockingRequestedEvent);
        }
        break;

      case JournalEventType.EngineerProgress:
        {
          this.emit('engineer', event as EngineerProgressEvent);
        }
        break;

      case JournalEventType.FSDJump:
        {
          this.emit('fsd-jump', event as FSDJumpEvent);
        }
        break;

      case JournalEventType.FSDTarget:
        {
          this.emit('fsd-target', event as FSDTargetEvent);
        }
        break;

      case JournalEventType.FSSSignalDiscovered:
        {
          this.emit('fss-signal-discovered', event as FSSSignalDiscoveredEvent);
        }
        break;

      case JournalEventType.Fileheader:
        {
          this.emit('fileheader', event as FileHeaderEvent);
        }
        break;

      case JournalEventType.LoadGame:
        {
          this.emit('load-game', event as LoadGameEvent);
        }
        break;

      case JournalEventType.Loadout:
        {
          this.emit('loadout', event as LoadoutEvent);
        }
        break;

      case JournalEventType.Location:
        {
          this.emit('location', event as LocationEvent);
        }
        break;

      case JournalEventType.Market:
        {
          this.emit('market', event as MarketEvent);
        }
        break;

      case JournalEventType.Materials:
        {
          this.emit('materials', event as MaterialsEvent);
        }
        break;

      case JournalEventType.Missions:
        {
          this.emit('missions', event as MissionsEvent);
        }
        break;

      case JournalEventType.Music:
        {
          this.emit('music', event as MusicEvent);
        }
        break;

      case JournalEventType.Progress:
        {
          this.emit('progress', event as ProgressEvent);
        }
        break;

      case JournalEventType.Rank:
        {
          this.emit('rank', event as RankEvent);
        }
        break;

      case JournalEventType.ReceiveText:
        {
          this.emit('receive-text', event as RecieveTextEvent);
        }
        break;

      case JournalEventType.RefuelAll:
        {
          this.emit('refuel-all', event as RefuelAllEvent);
        }
        break;

      case JournalEventType.RepairAll:
        {
          this.emit('repair-all', event as RepairAllEvent);
        }
        break;

      case JournalEventType.Reputation:
        {
          this.emit('reputation', event as ReputationEvent);
        }
        break;

      case JournalEventType.Scan:
        {
          this.emit('scan', event as ScanEvent);
        }
        break;

      case JournalEventType.ShipLocker:
        {
          this.emit('ship-locker', event as ShipLockerEvent);
        }
        break;

      case JournalEventType.ShipTargeted:
        {
          this.emit('ship-tagreted', event as ShipTargetedEvent);
        }
        break;

      case JournalEventType.Shutdown:
        {
          this.emit('shutdown', event as ShutdownEvent);
        }
        break;

      case JournalEventType.StartJump:
        {
          this.emit('fsd-start-jump', event as StartJumpEvent);
        }
        break;

      case JournalEventType.Statistics:
        {
          this.emit('statistics', event as StatisticsEvent);
        }
        break;

      case JournalEventType.SupercruiseExit:
        {
          this.emit('supercruise-exit', event as SupercruiseExitEvent);
        }
        break;

      case JournalEventType.Undocked:
        {
          this.emit('undocked', event as UndockedEvent);
        }
        break;

      default: {
        console.log(`New event of type ${event.event}`);
      }
    }

    if (this.cacheDirectory) {
      const file_path = path.join(
        this.cacheDirectory,
        `${event.event}.${randomUUID()}.json`
      );
      console.log(`Caching event into file ${file_path}`);
      fs.writeFile(file_path, JSON.stringify(event), (error) => {
        if (error) {
          console.log(`Write error: ${error}`);
        }
      });
    }
  }

  on(event: 'journal', listener: (file_path: string) => void): this;
  on(event: 'cargo', listener: (event: CargoEvent) => void): this;
  on(event: 'commander', listener: (event: CommanderEvent) => void): this;
  on(event: 'docked', listener: (event: DockedEvent) => void): this;
  on(
    event: 'docking-granted',
    listener: (event: DockingGrantedEvent) => void
  ): this;
  on(
    event: 'docking-requested',
    listener: (event: DockingRequestedEvent) => void
  ): this;
  on(event: 'engineer', listener: (event: EngineerProgressEvent) => void): this;
  on(event: 'fileheader', listener: (event: FileHeaderEvent) => void): this;
  on(event: 'fsd-jump', listener: (event: FSDJumpEvent) => void): this;
  on(event: 'fsd-target', listener: (event: FSDTargetEvent) => void): this;
  on(
    event: 'fss-signal-discovered',
    listener: (event: FSSSignalDiscoveredEvent) => void
  ): this;
  on(event: 'load-game', listener: (event: LoadGameEvent) => void): this;
  on(event: 'loadout', listener: (event: LoadoutEvent) => void): this;
  on(event: 'location', listener: (event: LocationEvent) => void): this;
  on(event: 'market', listener: (event: MarketEvent) => void): this;
  on(event: 'materials', listener: (event: MaterialsEvent) => void): this;
  on(event: 'missions', listener: (event: MissionsEvent) => void): this;
  on(event: 'music', listener: (event: MusicEvent) => void): this;
  on(event: 'progress', listener: (event: ProgressEvent) => void): this;
  on(event: 'rank', listener: (event: RankEvent) => void): this;
  on(event: 'receive-text', listener: (event: RecieveTextEvent) => void): this;
  on(event: 'refuel-all', listener: (event: RefuelAllEvent) => void): this;
  on(event: 'repair-all', listener: (event: RepairAllEvent) => void): this;
  on(event: 'reputation', listener: (event: ReputationEvent) => void): this;
  on(event: 'scan', listener: (event: ScanEvent) => void): this;
  on(event: 'ship-locker', listener: (event: ShipLockerEvent) => void): this;
  on(
    event: 'ship-targeted',
    listener: (event: ShipTargetedEvent) => void
  ): this;
  on(event: 'shutdown', listener: (event: ShutdownEvent) => void): this;
  on(event: 'fsd-start-jump', listener: (event: StartJumpEvent) => void): this;
  on(event: 'statistics', listener: (event: StatisticsEvent) => void): this;
  on(
    event: 'supercruise-exit',
    listener: (event: SupercruiseExitEvent) => void
  ): this;
  on(event: 'undocked', listener: (event: UndockedEvent) => void): this;
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }
}

export type EliteJournalWatchOptions = {
  cache?: string;
};
