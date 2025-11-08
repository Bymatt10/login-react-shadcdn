import { useState, useMemo } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { TarifaFilters } from './TarifaFilters'
import { Pagination } from './Pagination'
import { DataTableViewOptions } from './DataTableViewOptions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RefreshCw } from 'lucide-react'
import { generateFakeTarifas, filterTarifas } from '@/lib/fakeTarifas'
import { Tarifa } from '@/types/tarifa'

const ITEMS_PER_PAGE = 20
const TOTAL_FAKE_DATA = 150

const columns: ColumnDef<Tarifa>[] = [
  {
    accessorKey: 'numeroGuia',
    header: 'Num. Guía',
    cell: ({ row }) => <div className="text-xs">{row.original.numeroGuia}</div>,
  },
  {
    accessorKey: 'consignatario',
    header: 'Consignatario',
    cell: ({ row }) => <div className="text-xs">{row.original.consignatario}</div>,
  },
  {
    accessorKey: 'vendedor',
    header: 'Vend',
    cell: ({ row }) => <div className="text-xs text-center">{row.original.vendedor}</div>,
  },
  {
    accessorKey: 'tarifa',
    header: () => <div className="text-right">Tarifa</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.tarifa.toFixed(2)}</div>,
  },
  {
    accessorKey: 'fecha',
    header: 'F. Vuelo',
    cell: ({ row }) => <div className="text-xs text-center">{row.original.fecha}</div>,
  },
  {
    accessorKey: 'pcs',
    header: () => <div className="text-center">Pcs</div>,
    cell: ({ row }) => <div className="text-center text-xs">{row.original.pcs}</div>,
  },
  {
    accessorKey: 'volumen',
    header: () => <div className="text-right">Volumen</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.volumen.toFixed(2)}</div>,
  },
  {
    accessorKey: 'flete',
    header: () => <div className="text-right">Flete</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.flete.toFixed(2)}</div>,
  },
  {
    accessorKey: 'carrier',
    header: () => <div className="text-right">Carrier</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.carrier.toFixed(2)}</div>,
  },
  {
    accessorKey: 'agent',
    header: () => <div className="text-right">Agent</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.agent.toFixed(2)}</div>,
  },
  {
    accessorKey: 'totalAWB',
    header: () => <div className="text-right">Total AWB</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.totalAWB.toFixed(2)}</div>,
  },
  {
    accessorKey: 'trfNeta',
    header: () => <div className="text-right">Trf Neta</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.trfNeta.toFixed(2)}</div>,
  },
  {
    accessorKey: 'difTarifa',
    header: () => <div className="text-right">Dif Tarifa</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.difTarifa.toFixed(2)}</div>,
  },
  {
    accessorKey: 'rentaTRF',
    header: () => <div className="text-right">Renta TRF</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.rentaTRF.toFixed(2)}</div>,
  },
  {
    accessorKey: 'pagoCASS',
    header: () => <div className="text-right">Pago CASS</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.pagoCASS.toFixed(2)}</div>,
  },
  {
    accessorKey: 'rentaCASS',
    header: () => <div className="text-right">Renta CASS</div>,
    cell: ({ row }) => <div className="text-right text-xs">{row.original.rentaCASS.toFixed(2)}</div>,
  },
  {
    accessorKey: 'remark',
    header: 'Remark',
    cell: ({ row }) => <div className="text-xs">{row.original.remark}</div>,
  },
]

export const TarifaTable = () => {
  const [allTarifas] = useState<Tarifa[]>(() => generateFakeTarifas(TOTAL_FAKE_DATA))
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    search: '',
    vendedor: 'all',
    fechaDesde: '',
    fechaHasta: '',
  })

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    fecha: false,
    pcs: false,
    volumen: false,
    flete: false,
    carrier: false,
    agent: false,
    totalAWB: false,
    trfNeta: false,
    difTarifa: false,
    rentaTRF: false,
    pagoCASS: false,
    rentaCASS: false,
    remark: false,
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

  const table = useReactTable({
    data: paginatedTarifas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  })

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
              <DataTableViewOptions table={table} />
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
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-brand-primary">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-xs whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
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
