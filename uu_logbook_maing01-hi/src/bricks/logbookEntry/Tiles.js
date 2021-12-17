//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent,useContext } from "uu5g04-hooks";
import Config from "../config/config";
import Uu5Tiles from "uu5tilesg02";

import CustomTile from "./custom-tile";
import { useContextModal } from "../../common/modal-manager";
import { useSome } from "./use-logbook-entry";

import { LogbookEntryUpdateForm, LogbookEntryUpdateHeader, LogbookEntryUpdateControls } from "./logbook-entry-update-form/logbook-entry-update-form";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Tiles",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const Tiles = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const [open, close, showAlert, getConfirmRef] = useContextModal();

    let { data, handlerMap: listHandlerMap } = useSome();

    //@@viewOff:hooks

    //@@viewOn:private
    function handleOpenDetailsModal(data) {
      open({
        header: <LogbookEntryUpdateHeader />,
        content: <LogbookEntryUpdateForm data={data} closeModal={close} showAlert={showAlert} />,
        footer: <LogbookEntryUpdateControls />,
      });
    }

    function handleOpenCreateModal() {
      open({
        header: <LogbookEntryUpdateHeader />,
        content: <LogbookEntryUpdateForm isCreateForm={true} listHandlerMap={listHandlerMap} closeModal={close} showAlert={showAlert} />,
        footer: <LogbookEntryUpdateControls isCreateForm={true} />,
      });
    }

    const getActions = () => [
      {
        active: true,
        icon: "mdi-plus-circle",
        content: "Add new logbook",
        colorSchema: "primary",
        bgStyle: "filled",
        onClick: handleOpenCreateModal,
      },
    ]
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(
      props,
      STATICS
    );
    return (
      <Uu5Tiles.ControllerProvider
        data={data}
      >
        <Uu5Tiles.ActionBar
          onItemSearch={handleItemSearch}
          actions={getActions()}
        />
        <UU5.Bricks.Resize>
        <UU5.Tiles.List
          tile={<CustomTile getConfirmRef={getConfirmRef} handleOpenDetailsModal={handleOpenDetailsModal} />}
          data={data}
          tileHeight={100}
          rowSpacing={2}
          scrollElement={window}
        />
        </UU5.Bricks.Resize>
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

function handleItemSearch(item, value) {
  let fragments = value.split(/[\s,.-;:_]/);
  return fragments.some((frag) => {
    item.data.departurePlace.toUpperCase().indexOf(frag.toUpperCase()) !== -1;
  });
}

export default Tiles;
