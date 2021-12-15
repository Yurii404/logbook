/* eslint-disable */
const placeCreateDtoInType = shape({
  codeOfPlace: string(3).isRequired(), // code of airport
  cityOfPlace: string(85).isRequired(), // in which city is airport
  coordinates: string(100).isRequired() // GPS coordinates of airport
})
const placeGetDtoInType = shape({
  id: id().isRequired(),
})
const placeDeleteDtoInType = shape({
  id: id().isRequired(),
})
const placeListDataDtoInType = shape ({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});
