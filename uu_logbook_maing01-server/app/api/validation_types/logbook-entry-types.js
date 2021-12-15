/* eslint-disable */
const logBookEntryCreateDtoInType = shape({
  departureFlight: datetime().isRequired(),
  arrivalFlight: datetime().isRequired(),
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
