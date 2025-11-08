export interface Tarifa {
  id: number
  fecha: string
  numeroGuia: string
  consignatario: string
  vendedor: string
  pcs: number
  volumen: number
  tarifa: number
  flete: number
  carrier: number
  agent: number
  totalAWB: number
  trfNeta: number
  difTarifa: number
  rentaTRF: number
  pagoCASS: number
  rentaCASS: number
  remark: string
}

export interface TarifasResponse {
  tarifas: Tarifa[]
  total: number
  skip: number
  limit: number
}

