// Ubicación: lib/graphql/rental/queries.ts

export const GET_VEHICLE_AVAILABILITY = `
query GetVehicleAvailability($vehicleId: Int!) {
  zxVehicleAvailability(vehicleId: $vehicleId) {
    pickupDate
    returnDate
  }
}
`;

export const GET_RENTAL_CONTRACT = `
query GetRentalContract($lang: String) {
  zxRentalContract(lang: $lang) {
    id
    title
    lang
    contractTemplate
    documentsEmailTemplate
    cancellationPolicy
    termsConditions
    companyName
    companyLegalName
    companyTaxId
    companyAddress
    securityDepositAmount
  }
}
`;

// Uso: por id (admin / dashboard con sesión) o por orderId + email
// (cliente headless sin sesión, mismo patrón que el guest order tracking).
//
// `vehicle` trae el producto público completo (ajusta el subconjunto de
// campos según necesites). `rentalData` trae SOLO los campos legales
// privados del vehículo (placa, VIN, año, color, transmisión, combustible).
export const GET_RENTAL_BOOKING = `
query GetRentalBooking($id: Int, $orderId: Int, $email: String) {
  zxRentalBooking(id: $id, orderId: $orderId, email: $email) {
    id
    status
    orderId
    customerName
    customerEmail
    customerPhone
    customerDocument
    customerLicense
    customerAddress
    pickupDate
    pickupLocation
    returnDate
    returnLocation
    totalDays
    totalPrice
    depositAmount
    pendingAmount
    paymentMethod
    documentsSent
    documentsSentAt
    contractAccepted
    contractAcceptedAt
    vehicle {
      id
      name
      slug
      sku
      categories { id name slug }
      image { id url alt title width height }
    }
    rentalData {
      plate
      vin
      year
      color
      transmission
      fuel
    }
  }
}
`;