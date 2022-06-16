export interface FuelCapacity {
  Main: number;
  Reserve: number;
}

export interface Module {
  Slot: string;
  Item: string;
  On: boolean;
  Priority: number;
  Health: number;
  Value?: number;
}

export interface Component {
  Name: string;
  Name_Localised?: string;
  OwnerID: number;
  Count: number;
}

export interface Parent {
  Null: number;
}

export interface Conflict {
  WarType: string;
  Status: string;
  Faction1: Faction;
  Faction2: Faction;
}

export interface Faction {
  Name: string;
  Stake: string;
  WonDays: number;
}

export interface FactionElement {
  Name: string;
  FactionState: string;
  Government: string;
  Influence: number;
  Allegiance: string;
  Happiness: string;
  Happiness_Localised: string;
  MyReputation: number;
  PendingStates?: IngState[];
  RecoveringStates?: IngState[];
}

export interface IngState {
  State: string;
  Trend: number;
}

export interface StationEconomy {
  Name: string;
  Name_Localised: string;
  Proportion: number;
}

export interface SystemFaction {
  Name: string;
}

export interface EngineerProgress {
  Engineer: string;
  EngineerID: number;
  Progress: Progress;
}

export enum Progress {
  Known = 'Known',
}

export interface LandingPads {
  Small: number;
  Medium: number;
  Large: number;
}

export interface StationFaction {
  Name: string;
}

export interface ExobiologyStatistics {
  Organic_Genus_Encountered: number;
  Organic_Species_Encountered: number;
  Organic_Variant_Encountered: number;
  Organic_Data_Profits: number;
  Organic_Data: number;
  First_Logged_Profits: number;
  First_Logged: number;
  Organic_Systems: number;
  Organic_Planets: number;
  Organic_Genus: number;
  Organic_Species: number;
}

export interface CraftingStatistics {
  Count_Of_Used_Engineers: number;
  Recipes_Generated: number;
  Recipes_Generated_Rank_1: number;
  Recipes_Generated_Rank_2: number;
  Recipes_Generated_Rank_3: number;
  Recipes_Generated_Rank_4: number;
  Recipes_Generated_Rank_5: number;
  Suit_Mods_Applied: number;
  Weapon_Mods_Applied: number;
  Suits_Upgraded: number;
  Weapons_Upgraded: number;
  Suits_Upgraded_Full: number;
  Weapons_Upgraded_Full: number;
  Suit_Mods_Applied_Full: number;
  Weapon_Mods_Applied_Full: number;
}

export interface SearchAndRescueStatistics {
  SearchRescue_Traded: number;
  SearchRescue_Profit: number;
  SearchRescue_Count: number;
  Salvage_Legal_POI: number;
  Salvage_Legal_Settlements: number;
  Salvage_Illegal_POI: number;
  Salvage_Illegal_Settlements: number;
  Maglocks_Opened: number;
  Panels_Opened: number;
  Settlements_State_FireOut: number;
  Settlements_State_Reboot: number;
}

export interface ExplorationStatistics {
  Systems_Visited: number;
  Exploration_Profits: number;
  Planets_Scanned_To_Level_2: number;
  Planets_Scanned_To_Level_3: number;
  Efficient_Scans: number;
  Highest_Payout: number;
  Total_Hyperspace_Distance: number;
  Total_Hyperspace_Jumps: number;
  Greatest_Distance_From_Start: number;
  Time_Played: number;
  OnFoot_Distance_Travelled: number;
  Shuttle_Journeys: number;
  Shuttle_Distance_Travelled: number;
  Spent_On_Shuttles: number;
  First_Footfalls: number;
  Planet_Footfalls: number;
  Settlements_Visited: number;
}

export interface CrimeStatistics {
  Notoriety: number;
  Fines: number;
  Total_Fines: number;
  Bounties_Received: number;
  Total_Bounties: number;
  Highest_Bounty: number;
  Malware_Uploaded: number;
  Settlements_State_Shutdown: number;
  Production_Sabotage: number;
  Production_Theft: number;
  Total_Murders: number;
  Citizens_Murdered: number;
  Omnipol_Murdered: number;
  Guards_Murdered: number;
  Data_Stolen: number;
  Goods_Stolen: number;
  Sample_Stolen: number;
  Total_Stolen: number;
  Turrets_Destroyed: number;
  Turrets_Overloaded: number;
  Turrets_Total: number;
  Value_Stolen_StateChange: number;
  Profiles_Cloned: number;
}

export interface CombatStatistics {
  Bounties_Claimed: number;
  Bounty_Hunting_Profit: number;
  Combat_Bonds: number;
  Combat_Bond_Profits: number;
  Assassinations: number;
  Assassination_Profits: number;
  Highest_Single_Reward: number;
  Skimmers_Killed: number;
  OnFoot_Combat_Bonds: number;
  OnFoot_Combat_Bonds_Profits: number;
  OnFoot_Vehicles_Destroyed: number;
  OnFoot_Ships_Destroyed: number;
  Dropships_Taken: number;
  Dropships_Booked: number;
  Dropships_Cancelled: number;
  ConflictZone_High: number;
  ConflictZone_Medium: number;
  ConflictZone_Low: number;
  ConflictZone_Total: number;
  ConflictZone_High_Wins: number;
  ConflictZone_Medium_Wins: number;
  ConflictZone_Low_Wins: number;
  ConflictZone_Total_Wins: number;
  Settlement_Defended: number;
  Settlement_Conquered: number;
  OnFoot_Skimmers_Killed: number;
  OnFoot_Scavs_Killed: number;
}

export interface BankStatistics {
  Current_Wealth: number;
  Spent_On_Ships: number;
  Spent_On_Outfitting: number;
  Spent_On_Repairs: number;
  Spent_On_Fuel: number;
  Spent_On_Ammo_Consumables: number;
  Insurance_Claims: number;
  Spent_On_Insurance: number;
  Owned_Ship_Count: number;
  Spent_On_Suits: number;
  Spent_On_Weapons: number;
  Spent_On_Suit_Consumables: number;
  Suits_Owned: number;
  Weapons_Owned: number;
  Spent_On_Premium_Stock: number;
  Premium_Stock_Bought: number;
}

export interface CrewStatistics {
  NpcCrew_TotalWages: number;
  NpcCrew_Hired: number;
  NpcCrew_Fired: number;
  NpcCrew_Died: number;
}

export interface MaterialTraderStatistics {
  Trades_Completed: number;
  Materials_Traded: number;
  Assets_Traded_In: number;
  Assets_Traded_Out: number;
}

export interface MiningStatistics {
  Mining_Profits: number;
  Quantity_Mined: number;
  Materials_Collected: number;
}

export interface MulticrewStatistics {
  Multicrew_Time_Total: number;
  Multicrew_Gunner_Time_Total: number;
  Multicrew_Fighter_Time_Total: number;
  Multicrew_Credits_Total: number;
  Multicrew_Fines_Total: number;
}

export interface PassengersStatistics {
  Passengers_Missions_Bulk: number;
  Passengers_Missions_VIP: number;
  Passengers_Missions_Delivered: number;
  Passengers_Missions_Ejected: number;
}

export interface SmugglingStatistics {
  Black_Markets_Traded_With: number;
  Black_Markets_Profits: number;
  Resources_Smuggled: number;
  Average_Profit: number;
  Highest_Single_Transaction: number;
}

export interface TradingStatistics {
  Markets_Traded_With: number;
  Market_Profits: number;
  Resources_Traded: number;
  Average_Profit: number;
  Highest_Single_Transaction: number;
  Data_Sold: number;
  Goods_Sold: number;
  Assets_Sold: number;
}

export type Position = [number, number, number];
