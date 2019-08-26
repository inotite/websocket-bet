export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PruneModel<T, K> = Pick<T, Exclude<keyof T, keyof K>>;
export type Nullable<T> = T | undefined;

export type StringIndexType<K extends string, T> = { [key in K]: T };

export type JSONPrimitive = string | number | boolean | null | undefined;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}

export interface IOMessage {
  error?: string;
  msg_type: string;
  [key: string]: any;
}

export interface KOEventForGrab {
  bookmaker: string;
  eventName: string;
  id: number;
  /**
   * the event identity within same bookmaker and sport
   */
  eventId: string;
  isClosed: boolean;
  isLive: boolean;
  sport: string;
  startTime: string;
  url: string;
}

export interface AppError {
  message: string;
}

export interface KOGrabSweet {
  evt: KOGrabEventSweet;
  updates?: KOSelectionSweet[];
  removes?: KOSelectionSweet[];
}

export interface KOGrabEvent {
  // event name
  ena: string;
  // event time
  etm: string;
  // event id
  eid: string;
  // bookmaker
  bm: string;
  // sport
  spt: string;
  // live match or prematch
  lve: boolean;
  // event url
  url: string;
  // current odds data of Event
  oddsData: Array<KOSelectionSweet>;
  // already received first odds data
  received: boolean;
}

export type KOGrabEventSweet = Omit<
  KOGrabEvent,
  "oddsData" | "url" | "received"
>;
export interface KOSelectionSweet {
  // market type
  mtp: string;
  // market id
  mid: string;
  // selection id
  sid: string;
  // selection name
  sna: string;
  // handicap
  hd: number | null;
  // odds
  ods: number;
  // selection url
  url?: string;
  // market group id
  ggid?: string;
  // market id
  mmid?: string;
  // participant id
  ppid?: string;
  // market suspended
  sus?: boolean;
}

export interface KOChangeSweet {
  // live match or prematch
  isLive?: boolean;
  // end or no
  end?: boolean;
  // event index
  eIndex: number;
  // removed or changed event
  evt: KOGrabEvent;
  // removed or changed odds data
  oddsData: KOSelectionSweet;
}

export interface KOGrabIndex {
  // event index
  eIndex: number;
  // market index
  mIndex: number;
  // live match or prematch
  isLive: boolean;
}
