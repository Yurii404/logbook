//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import LogbookEntryContext from "./logbook-entry-context";
//@@viewOff:imports

export function useSome() {
  return useContext(LogbookEntryContext);
}

export default useSome;
