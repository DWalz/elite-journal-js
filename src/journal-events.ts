import {
  BankStatistics,
  CombatStatistics,
  Component,
  Conflict,
  CraftingStatistics,
  CrewStatistics,
  CrimeStatistics,
  EngineerProgress,
  ExobiologyStatistics,
  ExplorationStatistics,
  FactionElement,
  FuelCapacity,
  LandingPads,
  MaterialTraderStatistics,
  MiningStatistics,
  Module,
  MulticrewStatistics,
  Parent,
  PassengersStatistics,
  Position,
  SearchAndRescueStatistics,
  SmugglingStatistics,
  StationEconomy,
  StationFaction,
  SystemFaction,
  TradingStatistics,
} from './journal-event-types';

/** A JSON Journal event entry */
export interface JournalEvent {
  /** Timestamp of the event */
  timestamp: string;
  /** The event type */
  event: JournalEventType;
}

export interface CargoEvent extends JournalEvent {
  Vessel: string;
  Count: number;
  Inventory: any[];
}

/**
 * Commander infomration event
 *
 * Emittet upon loading the player's commander, usually when game is started.
 */
export interface CommanderEvent extends JournalEvent {
  /** The commander's ID */
  FID: string;
  /** The commander's name */
  Name: string;
}

/**
 * Docked to station event
 *
 * Emitted upon being docked to a station. This can happen on game load or after
 * a successful docking process.
 */
export interface DockedEvent extends JournalEvent {
  /** The station name the commander is docked to */
  StationName: string;
  /** The type of station the commander is docked to */
  StationType: string; // TODO: Extract into enum
  /**  */
  Taxi: boolean; // TODO: Description
  /** If the docked ship is controlled by a multicrew */
  Multicrew: boolean;
  /** The name of the star system the station is in */
  StarSystem: string;
  /** The ID od the star system the station is in */
  SystemAddress: number;
  /** The ID of the market of the station; corresponds to a `Market.json` file */
  MarketID: number; // TODO: Test if can be null / undefined
  /** The controlling faction of the station */
  StationFaction: StationFaction;
  /** The controlling faction's government type */
  StationGovernment: string; // TODO: Extract into enum
  /** The controlling faction's government type as localized name */
  StationGovernment_Localised: string; // TODO Extract into enum?
  /** A list of all the station services provided by the station */
  StationServices: string[]; // TODO: Extract into enum
  /** The primary economy of the station */
  StationEconomy: string; // TODO: Extract into enum
  /** The primary economy of the station as localized name */
  StationEconomy_Localised: string;
  /** A list of all economy branches present at this station */
  StationEconomies: StationEconomy[];
  /** The station's distance from the star systems main star in ls (light seconds) */
  DistFromStarLS: number;
  /** The amount of landing pads present at this station */
  LandingPads: LandingPads;
}

/**
 * Docking request being granted event
 *
 * Emitted when a docking request by the player is accepted by the station.
 */
export interface DockingGrantedEvent extends JournalEvent {
  /** The number of the landing pad assigned to the player */
  LandingPad: number;
  /** The market ID of the station who granted the docking request */
  MarketID: number;
  /** The name of the station who granted the docking request */
  StationName: string;
  /** The type of the station who granted the docking request */
  StationType: string;
}

/**
 * Docking requested event
 *
 * Emitted when the player sends a docking request to a station
 */
export interface DockingRequestedEvent extends JournalEvent {
  /** The market ID of the station the docking request was sent to */
  MarketID: number;
  /** The name of the station the docking request was sent to */
  StationName: string;
  /** The type of the station the docking request was sent to */
  StationType: string;
  /** The amount of landing pads present at the station the docking request was sent to */
  LandingPads: LandingPads;
}

/**
 * Engineer progress event
 *
 * Emitted upon loading the commanders progress with the engineers, usually
 * when loading a game.
 */
export interface EngineerProgressEvent extends JournalEvent {
  /** A list of progress information for each engineer */
  Engineers: EngineerProgress[];
}

/**
 * Journal file header event
 *
 * Emitted when a journal file is created upon the start of the game.
 * Contains general information about the current game instance.
 */
export interface FileHeaderEvent extends JournalEvent {
  /**  */
  part: number; // TODO: Description
  /** The language the game was started in */
  language: string;
  /** If the game was started with the Odyssey extension enabled */
  Odyssey: boolean;
  /** The version of the game as version string */
  gameversion: string;
  /** The exact build id of the current game instance */
  build: string;
}

/**
 * Frame shift drive jump event
 *
 * Emitted when a frame shift drice jump was executed (after completion of the jump).
 */
export interface FSDJumpEvent extends JournalEvent {
  /** */
  Taxi: boolean; // TODO: Description
  /** If the ship performing the jump is controlled by a multicrew */
  Multicrew: boolean;
  /** The name of the star system the jump ended in */
  StarSystem: string;
  /** The ID of the star system the jump ended in */
  SystemAddress: number;
  /** The position of the star system the jump ended in; in galactic coordinates (Sol at 0) */
  StarPos: Position;
  /** The allegiance of the star system the jump ended in */
  SystemAllegiance: string; // TODO: Extract into enum
  /** The primary economy of the star system the jump ended in */
  SystemEconomy: string; // TODO: Extract into enum
  /** The primary economy of the star system the jump ended in as localized name */
  SystemEconomy_Localised: string;
  /** The secondary economy of the star system the jump ended in */
  SystemSecondEconomy: string;
  /** The secondary economy of the star system the jump ended in as localized name */
  SystemSecondEconomy_Localised: string;
  /** The government type of the star system the jump ended in */
  SystemGovernment: string; // TODO: Extract into enum
  /** The government type of the star system the jump ended in as localized name */
  SystemGovernment_Localised: string;
  /** The security level of the star system the jump ended in */
  SystemSecurity: string; // TODO: Extract into enum
  /** The security level of the star system the jump ended in as localized name */
  SystemSecurity_Localised: string;
  /** The number of citizens of the star system the jump ended in */
  Population: number;
  /** The name of the main body of the star system the jump ended in */
  Body: string;
  /** The ID of the main body of the star system the jump ended in */
  BodyID: number;
  /** The type of the main body of the star system the jump ended in */
  BodyType: string; // TODO: Extract into enum
  /** The distance the FSD jump covered */
  JumpDist: number;
  /** The amount of fuel used by the ship over the FSD jump */
  FuelUsed: number;
  /** The current fuel level of the ship after the FSD jump */
  FuelLevel: number;
  /** A list of all factions and their influence of the star system the jump ended in */
  Factions: FactionElement[];
  /** The controlling faction of the star system the jump ended in */
  SystemFaction: SystemFaction;
  /** The conflicts inside of the star system the jump ended in */
  Conflicts: Conflict[];
}

export interface FSDTargetEvent extends JournalEvent {
  Name: string;
  SystemAddress: number;
  StarClass: string;
}

export interface FSSSignalDiscoveredEvent extends JournalEvent {
  SystemAddress: number;
  SignalName: string;
}

export interface LoadGameEvent extends JournalEvent {
  FID: string;
  Commander: string;
  Horizons: boolean;
  Odyssey: boolean;
  Ship: string;
  ShipID: number;
  ShipName: string;
  ShipIdent: string;
  FuelLevel: number;
  FuelCapacity: number;
  GameMode: string;
  Credits: number;
  Loan: number;
  language: string;
  gameversion: string;
  build: string;
}

export interface LoadoutEvent extends JournalEvent {
  Ship: string;
  ShipID: number;
  ShipName: string;
  ShipIdent: string;
  ModulesValue: number;
  HullHealth: number;
  UnladenMass: number;
  CargoCapacity: number;
  MaxJumpRange: number;
  FuelCapacity: FuelCapacity;
  Rebuy: number;
  Modules: Module[];
}

export interface LocationEvent extends JournalEvent {
  DistFromStarLS: number;
  Docked: boolean;
  StationName: string;
  StationType: string;
  MarketID: number;
  StationFaction: StationFaction;
  StationGovernment: string;
  StationGovernment_Localised: string;
  StationServices: string[];
  StationEconomy: string;
  StationEconomy_Localised: string;
  StationEconomies: StationEconomy[];
  Taxi: boolean;
  Multicrew: boolean;
  StarSystem: string;
  SystemAddress: number;
  StarPos: number[];
  SystemAllegiance: string;
  SystemEconomy: string;
  SystemEconomy_Localised: string;
  SystemSecondEconomy: string;
  SystemSecondEconomy_Localised: string;
  SystemGovernment: string;
  SystemGovernment_Localised: string;
  SystemSecurity: string;
  SystemSecurity_Localised: string;
  Population: number;
  Body: string;
  BodyID: number;
  BodyType: string;
  Factions: FactionElement[];
  SystemFaction: SystemFaction;
  Conflicts: Conflict[];
}

export interface MarketEvent extends JournalEvent {
  MarketID: number;
  StationName: string;
  StationType: string;
  StarSystem: string;
}

export interface MaterialsEvent extends JournalEvent {
  Raw: any[];
  Manufactured: any[];
  Encoded: any[];
}

export interface MissionsEvent extends JournalEvent {
  Active: any[];
  Failed: any[];
  Complete: any[];
}

export interface MusicEvent extends JournalEvent {
  MusicTrack: string;
}

export interface ProgressEvent extends JournalEvent {
  Combat: number;
  Trade: number;
  Explore: number;
  Soldier: number;
  Exobiologist: number;
  Empire: number;
  Federation: number;
  CQC: number;
}

export interface RankEvent extends JournalEvent {
  Combat: number;
  Trade: number;
  Explore: number;
  Soldier: number;
  Exobiologist: number;
  Empire: number;
  Federation: number;
  CQC: number;
}

export interface RecieveTextEvent extends JournalEvent {
  From: string;
  Message: string;
  Message_Localised: string;
  Channel: string;
}

export interface RefuelAllEvent extends JournalEvent {
  Cost: number;
  Amount: number;
}

export interface RepairAllEvent extends JournalEvent {
  Cost: number;
}

export interface ReputationEvent extends JournalEvent {
  Empire: number;
  Federation: number;
}

export interface ScanEvent extends JournalEvent {
  ScanType: string;
  BodyName: string;
  BodyID: number;
  Parents: Parent[];
  StarSystem: string;
  SystemAddress: number;
  DistanceFromArrivalLS: number;
  StarType: string;
  Subclass: number;
  StellarMass: number;
  Radius: number;
  AbsoluteMagnitude: number;
  Age_MY: number;
  SurfaceTemperature: number;
  Luminosity: string;
  SemiMajorAxis: number;
  Eccentricity: number;
  OrbitalInclination: number;
  Periapsis: number;
  OrbitalPeriod: number;
  AscendingNode: number;
  MeanAnomaly: number;
  RotationPeriod: number;
  AxialTilt: number;
  WasDiscovered: boolean;
  WasMapped: boolean;
}

export interface ShipLockerEvent extends JournalEvent {
  Items: any[];
  Components: Component[];
  Consumables: Component[];
  Data: any[];
}

export interface ShipTargetedEvent extends JournalEvent {
  TargetLocked: boolean;
}

export interface ShutdownEvent extends JournalEvent {}

export interface StartJumpEvent extends JournalEvent {
  JumpType: string;
  StarSystem: string;
  SystemAddress: number;
  StarClass: string;
}

export interface StatisticsEvent extends JournalEvent {
  Bank_Account: BankStatistics;
  Combat: CombatStatistics;
  Crime: CrimeStatistics;
  Smuggling: SmugglingStatistics;
  Trading: TradingStatistics;
  Mining: MiningStatistics;
  Exploration: ExplorationStatistics;
  Passengers: PassengersStatistics;
  Search_And_Rescue: SearchAndRescueStatistics;
  Crafting: CraftingStatistics;
  Crew: CrewStatistics;
  Multicrew: MulticrewStatistics;
  Material_Trader_Stats: MaterialTraderStatistics;
  Exobiology: ExobiologyStatistics;
}

export interface SupercruiseExitEvent extends JournalEvent {
  Taxi: boolean;
  Multicrew: boolean;
  StarSystem: string;
  SystemAddress: number;
  Body: string;
  BodyID: number;
  BodyType: string;
}

export interface UndockedEvent extends JournalEvent {
  StationName: string;
  StationType: string;
  MarketID: number;
  Taxi: boolean;
  Multicrew: boolean;
}

export enum JournalEventType {
  Cargo = 'Cargo',
  Commander = 'Commander',
  Docked = 'Docked',
  DockingGranted = 'DockingGranted',
  DockingRequested = 'DockingRequested',
  EngineerProgress = 'EngineerProgress',
  Fileheader = 'Fileheader',
  FSDJump = 'FSDJump',
  FSDTarget = 'FSDTarget',
  FSSSignalDiscovered = 'FSSSignalDiscovered',
  LoadGame = 'LoadGame',
  Loadout = 'Loadout',
  Location = 'Location',
  Market = 'Market',
  Materials = 'Materials',
  Missions = 'Missions',
  Music = 'Music',
  Progress = 'Progress',
  Rank = 'Rank',
  ReceiveText = 'ReceiveText',
  RefuelAll = 'RefuelAll',
  RepairAll = 'RepairAll',
  Reputation = 'Reputation',
  Scan = 'Scan',
  ShipLocker = 'ShipLocker',
  ShipTargeted = 'ShipTargeted',
  Shutdown = 'Shutdown',
  StartJump = 'StartJump',
  Statistics = 'Statistics',
  SupercruiseExit = 'SupercruiseExit',
  Undocked = 'Undocked',
}
