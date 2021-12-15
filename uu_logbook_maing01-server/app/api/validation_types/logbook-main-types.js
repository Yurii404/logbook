/* eslint-disable */

const logBookInitDtoInType = shape({
  state: oneOf(["active", "underConstruction", "closed"]),
  uuAppProfileOperators: uuIdentity(),
  name: string(4000),
})

