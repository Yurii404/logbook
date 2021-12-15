/* eslint-disable */
const personalPilotCardCreateDtoInType = shape({
  uuIdentity: uuIdentity().isRequired(),
  name: string(25).isRequired(),
  dataOfBirth: date(),
  phoneNumber: string(12),
})
const personalPilotCardGetDtoInType = shape({
  id: id().isRequired(),
})
const personalPilotCardDeleteDtoInType = shape({
  id: id().isRequired(),
})
