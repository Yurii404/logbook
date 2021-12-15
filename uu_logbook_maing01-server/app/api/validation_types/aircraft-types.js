/* eslint-disable */
const aircraftCreateDtoInType = shape({
  regNum: string(6).isRequired(),
  model: string(100).isRequired(),
  image: binary().isRequired(),
})

const aircraftGetDtoInType = shape({
  id: id().isRequired("regNum"),
  regNum: string(6).isRequired("id")
})

const aircraftDeleteDtoInType = shape({
  id: id().isRequired("regNum"),
  regNum: string(6).isRequired("id")
})
const aircraftListDataDtoInType = shape ({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});
const aircraftGetImageDataDtoInType = shape ({
  image: code().isRequired(),
  contentDisposition: oneOf(["inline", "attachment"])
});

const aircraftSetStateDtoInType = shape({
  id: id().isRequired(),
  state: oneOf(["active","inactive"]).isRequired(),
});
