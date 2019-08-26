/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
import { KOGrabEvent, KOSelectionSweet, KOGrabSweet } from "../model";
import { sendMessage } from "./serverSocket";

const filtered = (oddsData): KOSelectionSweet[] => {
  const allowed = ["hd", "mid", "mtp", "ods", "sid", "sna", "url"];
  return oddsData.map(data => {
    return Object.keys(data)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
  });
};

const sendUpdates = (
  event: KOGrabEvent,
  updates: KOSelectionSweet[] = [],
  removes: KOSelectionSweet[] = [],
  error?: string
) => {
  if (!updates || updates.length === 0) {
    updates = [];
  }
  if (!removes || removes.length === 0) {
    removes = [];
  }
  if (updates.length === 0 && removes.length === 0 && error === null) {
    return;
  }

  const evt = {
    ena: event.ena,
    etm: event.etm,
    eid: event.eid,
    bm: event.bm,
    spt: event.spt,
    lve: event.lve
  };

  const grab: KOGrabSweet = {
    evt,
    updates: filtered(updates),
    removes: filtered(removes)
  };
  fs.appendFileSync(
    "sentLog",
    new Date().toString() + " :-> " + JSON.stringify(grab) + "\n\n"
  );
};

export default sendUpdates;
