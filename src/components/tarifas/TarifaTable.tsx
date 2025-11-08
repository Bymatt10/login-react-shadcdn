import { useState, useMemo } from 'react'
import { TarifaTableRow } from './TarifaTableRow'
import { TarifaFilters } from './TarifaFilters'
import { Pagination } from './Pagination'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RefreshCw } from 'lucide-react'
import { generateFakeTarifas, filterTarifas } from '@/lib/fakeTarifas'
import { Tarifa } from '@/types/tarifa'

const ITEMS_PER_PAGE = 20
const TOTAL_FAKE_DATA = 150

export const TarifaTable = () => {
  const [allTarifas] = useState<Tarifa[]>(() => generateFakeTarifas(TOTAL_FAKE_DATA))
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    search: '',
    vendedor: 'all',
    fechaDesde: '',
    fechaHasta: '',
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setFilters({
      search: '',
      vendedor: 'all',
      fechaDesde: '',
      fechaHasta: '',
    })
    setCurrentPage(1)
  }

  const filteredTarifas = useMemo(() => {
    return filterTarifas(allTarifas, filters)
  }, [allTarifas, filters])

  const totalPages = Math.ceil(filteredTarifas.length / ITEMS_PER_PAGE)
  const paginatedTarifas = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredTarifas.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredTarifas, currentPage])

  return (
    <div className="space-y-4">
      <TarifaFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Análisis de Tarifas Netas</CardTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-brand-primary sticky top-0">
              <TableRow className="hover:bg-brand-primary">
                <TableHead className="text-xs whitespace-nowrap text-white">Fecha</TableHead>
                <TableHead className="text-xs whitespace-nowrap text-white">Num. Guía</TableHead>
                <TableHead className="text-xs whitespace-nowrap text-white">Consignatario</TableHead>
                <TableHead className="text-xs whitespace-nowrap text-white text-right">Tarifa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTarifas.map((tarifa) => (
                <TarifaTableRow
                  key={tarifa.id}
                  data={tarifa}
                />
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={filteredTarifas.length}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

