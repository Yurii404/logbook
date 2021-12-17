//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "../bricks/config/config.js";

import Tiles from "../bricks/logbookEntry/Tiles";
import DataListStateResolver from "../common/data-list-state-resolver";
import LogbookEntryLoader from "../bricks/logbookEntry/logbook-entry-loader";
import LogbookEntryContext from "../bricks/logbookEntry/logbook-entry-context";
import { ModalManager } from "../common/modal-manager";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LogbookEntry",
  //@@viewOff:statics
};

export const LogbookEntry = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render() {
    return (

      <ModalManager>
        <LogbookEntryLoader>
          <LogbookEntryContext.Consumer>
            {(dataListResult) => {
                return (
                  <DataListStateResolver dataList={dataListResult}>
                    <Tiles/>
                  </DataListStateResolver>
                )
              }
            }
          </LogbookEntryContext.Consumer>
        </LogbookEntryLoader>
      </ModalManager>
    );
  },
  //@@viewOff:render
});

export default LogbookEntry;
