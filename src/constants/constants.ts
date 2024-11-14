enum ProfileType {
  CUSTOMER = "customer",
  CUSTOMER_GROUP = "customer/group",
  TERMINAL = "terminal",
  TERMINAL_GROUP = "terminal/group",
  CITY_STATE = "cityState",
  CITY_STATE_GROUP = "cityState/group",
  STATE = "state",
  STATE_GROUP = "state/group",
  COUNTRY = "country",
  COUNTRY_GROUP = "country/group",
  ANY = "ANY",
  CONTAINER_TYPE = "containerType",
  CONTAINER_SIZE = "containerSize",
  SSL = "ssl",
  CSR = "csr",
  CUSTOMER_DEPARTMENT = "customerDepartment",
  CUSTOMER_EMPLOYEE = "customerEmployee",
  ZIP_CODE = "zipCode",
  ZIP_CODE_GROUP = "zipCode/group",
  CHASSIS_SIZE = "chassisSize",
  CHASSIS_TYPE = "chassisType",
  CHASSIS_OWNER = "chassisOwner",
  MATCH_WAREHOUSE = "matchWarehouse",
  MATCH_CUSTOMER = "matchCustomer",
  ALL_CUSTOMER = "All Customers",
  DRIVER = "driver",
  DRIVER_GROUP = "driver/group",
  CARRIER = "carrier",
  CARRIER_GROUP = "carrier/group",
  DRIVER_CONTAINER_MOVE = "containerMove/driver",
  CARRIER_CONTAINER_MOVE = "containerMove/carrier",
  TRAIN_CONTAINER_MOVE = "containerMove/train",
  BARGES_CONTAINER_MOVE = "containersMove/train",
  ANY_VENDOR = "containerMoves/any",
  ALL_DRIVER_GROUP = "driverGroups/all",
}

export enum VendorTypes {
  DRIVER = "driver",
  CARRIER = "carrier",
}

export { ProfileType };
