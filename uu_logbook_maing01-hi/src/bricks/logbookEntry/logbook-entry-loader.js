//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createComponent, useDataList, useState, useRef, useContext } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "../config/config";

import LogbookEntryContext from "./logbook-entry-context";

import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LogbookEntryLoader",
  //@@viewOff:statics
};

export const LogbookEntryLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.listLogbookEntrys,
        loadByPilot : Calls.listLogbookEntrysByPilot,
        create: Calls.createLogbookEntry
      },
      itemHandlerMap: {
        update: Calls.updateLogbookEntry,
        delete: Calls.deleteLogbookEntry,
        get: Calls.getLogbookEntry,
      }
    });


    return (
      <LogbookEntryContext.Provider value={dataListResult}>{props.children}</LogbookEntryContext.Provider>
    );
  },
  //@@viewOff:render
});

export default LogbookEntryLoader;
