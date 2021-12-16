/* eslint-disable */
const logBookEntryCreateDtoInType = shape({
  departureDate: datetime().isRequired(),
  arrivalDate: datetime().isRequired(),
  departurePlace: string(3).isRequired(),
  arrivalPlace: string(3).isRequired(),
  coPilotIdentity: uuIdentity(),
  regNum: string(6).isRequired()
})
const logBookEntryGetDtoInType = shape({
  id: id().isRequired()
})

const logBookEntryDeleteDtoInType = shape({
  id: id().isRequired()
})
const logBookEntryUpdateDtoInType = shape({
  id: id().isRequired(),
  departureDate: datetime(),
  arrivalDate: datetime(),
  departurePlace: string(3),
  arrivalPlace: string(3),
  coPilotIdentity: uuIdentity(),
  regNum: string(6),
  entryState: oneOf(["approved", "disapproved", "in_progress"])
})
const logBookEntryListDtoInType = shape({
  sortBy: oneOf(["regNum", "departureDate"]),
  order: oneOf(["asc", "desc"]),
  regNum: string(6),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
})
