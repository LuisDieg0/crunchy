export const constantes = {
  TYPE_VIEW_EDIT: 1,
  TYPE_VIEW_SHOW: 2,
  TYPE_VIEW_ITEM_SELECT: 3,

  ALERT_DELETE: 1,
  ALERT_UPDATE: 2,
  ALERT_ERROR: 3,
  ALERT_SUCCES: 4,
  NETWORK_CONECTION_FAIL: "Network request failed",
  PAYMENT_CASH: 1,
  PAYMENT_CREDIT: 3,
  // tipos de documentos
  TYP_DOCUMENT_BOLETA: 1,
  TYP_DOCUMENT_FACTURA: 2,
  TYP_DOCUMENT_PRECUENTA: 3,
  TYP_DOCUMENT_INCOME: 4,
  TYP_DOCUMENT_EXPENSES: 5,
  TYP_DOCUMENT_BOX_OPENING: 6,

  // status sunat
  STATUS_SUNAT_ENVIADO: 1,
  STATUS_SUNAT_NO_ENVIADO: 2,
  STATUS_SUNAT_DELETE: 3,
  //order status
  ORDER_STATUS_PENDING: 1,
  ORDER_STATUS_REDY: 2,
  ORDER_STATUS_CANCEL: 3,
  // Deliver type
  DELIVER_TYPE_SHOP: 1,
  DELIVER_TYPE_DELIVERY: 2,
  // tipos de cocumentos cliente
  DOCUMENT_DNI: 1,
  DOCUMENT_RUC: 2,
  DOCUMENT_CE: 3
};

export const status = {
  accepted: 202,
  success: 200,
  createSuccess: 201,
  unauthorized: 401
};
