//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CustomTile",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const CustomTile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
    handleOpenDetailsModal: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { handleOpenDetailsModal, data: logbookEntry } = props;
    const confirm = props.getConfirmRef();
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

    return currentNestingLevel ? (
      <div  {...attrs} >
        <UU5.Bricks.Div style={"background-color: pink;"} >
        <UU5.Bricks.Text content={logbookEntry?.data?.departurePlace} />
        <UU5.Bricks.Text content={logbookEntry?.data?.departureDate} />
        <UU5.Bricks.Text content={logbookEntry?.data?.uuIdentity} />

        <UU5.Bricks.Button
          className="active"
          onClick={() => handleOpenDetailsModal(logbookEntry)}
        >
          Update
          <UU5.Bricks.Icon icon="mdi-apple"/>
        </UU5.Bricks.Button>

        <UU5.Bricks.Button
          style={"margin-left: 50px"}
          className="active"
          onClick={() => {
            return confirm.open({
              header: <UU5.Bricks.Header level={4} content="Delete logbook entry" />,
              content: <UU5.Bricks.Div>Are you sure you want to logbook entry?</UU5.Bricks.Div>,
              onRefuse: () => close(),
              onConfirm: logbookEntry?.handlerMap?.delete
            })
          }}
        >
          DELETE
        </UU5.Bricks.Button>
        </UU5.Bricks.Div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default CustomTile;
