import { Tarifa } from '@/types/tarifa'

const consignatarios = [
  'CHAMPION AIR CARGO DEL ELCHA',
  'RR FLORERIA FLOR Y FLOR',
  'RR GOLDEN IMPORT',
  'MR ZENIT',
  'RR ROMANTIK',
  'RR ASTORGA EXPORT',
  'MR ARTARUS',
  'PAC EMBAJADA DE LA REPUB',
  'PAC EMBAJADA DE ERBRACO',
  'MR FRESH LINE',
  'PAC DR.RICARDO COSTALES',
  'MR BELICH HOT FLOWER',
  'MR ANTON FM',
  'MR FLOWER MASTER',
  'MR LERESTOK',
  'MR GREENDEAL LIMITED',
  'MR GEBRIEL FLORA',
  'MR FL UCRANIA',
  'MR F. RUSSO',
]

const vendedores = ['RR', 'MR', 'PAC', 'NR']
const carriers = ['KLM', 'AFR', 'LTU', 'IBE', 'AAL']

const generateGuia = (index: number): string => {
  const prefix = Math.floor(100 + Math.random() * 500)
  const suffix = 2000 + index
  return `${prefix}-${suffix}`
}

const generateDate = (daysAgo: number): string => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const generateFakeTarifas = (count: number, startIndex = 0): Tarifa[] => {
  const tarifas: Tarifa[] = []

  for (let i = 0; i < count; i++) {
    const index = startIndex + i
    const volumen = randomBetween(200, 10000)
    const tarifa = randomBetween(1.0, 5.0)
    const flete = volumen * tarifa
    const carrier = randomBetween(40, 220)
    const agent = randomBetween(40, 150)
    const totalAWB = flete + carrier + agent
    const trfNeta = randomBetween(2.0, 5.0)
    const difTarifa = tarifa - trfNeta
    const rentaTRF = flete - (volumen * trfNeta)
    const pagoCASS = randomBetween(800, 12000)
    const rentaCASS = pagoCASS - flete

    tarifas.push({
      id: index + 1,
      fecha: generateDate(Math.floor(Math.random() * 60)),
      numeroGuia: generateGuia(index),
      consignatario: consignatarios[Math.floor(Math.random() * consignatarios.length)],
      vendedor: vendedores[Math.floor(Math.random() * vendedores.length)],
      pcs: Math.floor(randomBetween(1, 200)),
      volumen: parseFloat(volumen.toFixed(2)),
      tarifa: parseFloat(tarifa.toFixed(2)),
      flete: parseFloat(flete.toFixed(2)),
      carrier: parseFloat(carrier.toFixed(2)),
      agent: parseFloat(agent.toFixed(2)),
      totalAWB: parseFloat(totalAWB.toFixed(2)),
      trfNeta: parseFloat(trfNeta.toFixed(2)),
      difTarifa: parseFloat(difTarifa.toFixed(2)),
      rentaTRF: parseFloat(rentaTRF.toFixed(2)),
      pagoCASS: parseFloat(pagoCASS.toFixed(2)),
      rentaCASS: parseFloat(rentaCASS.toFixed(2)),
      remark: Math.random() > 0.8 ? 'OTC' : '',
    })
  }

  return tarifas
}

export const filterTarifas = (
  tarifas: Tarifa[],
  filters: {
    search?: string
    vendedor?: string
    fechaDesde?: string
    fechaHasta?: string
  }
): Tarifa[] => {
  let filtered = [...tarifas]

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.consignatario.toLowerCase().includes(searchLower) ||
        t.numeroGuia.toLowerCase().includes(searchLower)
    )
  }

  if (filters.vendedor && filters.vendedor !== 'all') {
    filtered = filtered.filter((t) => t.vendedor === filters.vendedor)
  }

  if (filters.fechaDesde) {
    filtered = filtered.filter((t) => t.fecha >= filters.fechaDesde!)
  }

  if (filters.fechaHasta) {
    filtered = filtered.filter((t) => t.fecha <= filters.fechaHasta!)
  }

  return filtered
}

