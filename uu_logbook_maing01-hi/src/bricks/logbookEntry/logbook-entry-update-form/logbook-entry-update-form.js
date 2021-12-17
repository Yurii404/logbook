//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues, useState } from "uu5g04-hooks";
import Config from "../../config/config";

import Lsi from "./logbook-entry-update-form-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LogbookEntryUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const LogbookEntryUpdateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const {
      closeModal,
      showAlert,
      data,
      listHandlerMap,
      isCreateForm
    } = props;

    //@@viewOn:hooks
    const inputLsi = useLsiValues(Lsi);
    const [isLoading, setLoading] = useState(false);
    //@@viewOff:hooks

    //@@viewOn:private
    async function handleUpdate(formData) {
      const { values, component } = formData;
      let action;
      let response;

      if(isCreateForm) {
        action = listHandlerMap.create;
      } else {
        action = data?.handlerMap?.update;
      }

      component.setPending();

      try {
        response = await action(values);
      } catch (e) {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveError} />} />,
          colorSchema: "danger",
        });
      }


      component.setReady();

      if(response) {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveSuccess} />} />,
          colorSchema: "success",
        });

        closeModal();
      }
    }
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
      <UU5.Forms.ContextForm
        onSave={handleUpdate}
        onCancel={closeModal}
        progressIndicator={<UU5.Bricks.Loading />}
        disabled={isLoading}
      >
        <UU5.Forms.Text
          label="departureDate"
          name="departureDate"
          value={data?.data?.departureDate}
        />
        <UU5.Forms.Text
          label="arrivalDate"
          name="arrivalDate"
          value={data?.data?.arrivalDate}
        />
        <UU5.Forms.Text
          label="regNum"
          name="regNum"
          value={data?.data?.regNum}
        />
        <UU5.Forms.Text
          label="departurePlace"
          name="departurePlace"
          value={data?.data?.departurePlace}
        />
        <UU5.Forms.Text
          label="arrivalPlace"
          name="arrivalPlace"
          value={data?.data?.arrivalPlace}
        />
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
const LogbookEntryUpdateHeader = () => {
  return (
    <UU5.Forms.ContextHeader
      content={<UU5.Bricks.Lsi lsi={Lsi.header} />}
    />
  );
};

const LogbookEntryUpdateControls = ({ isCreateForm }) => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={isCreateForm ? Lsi.submit("Create") : Lsi.submit("Update")} /> }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};
//viewOff:helpers

//viewOn:exports
export { LogbookEntryUpdateForm, LogbookEntryUpdateHeader, LogbookEntryUpdateControls };
export default LogbookEntryUpdateForm;
//viewOff:exports
