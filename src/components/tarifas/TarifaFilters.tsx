import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, X } from 'lucide-react'
import { parse, format } from 'date-fns'

interface TarifaFiltersProps {
  filters: {
    search: string
    vendedor: string
    fechaDesde: string
    fechaHasta: string
  }
  onFilterChange: (key: string, value: string) => void
  onClearFilters: () => void
}

export const TarifaFilters = ({ filters, onFilterChange, onClearFilters }: TarifaFiltersProps) => {
  const hasActiveFilters = filters.search || filters.vendedor !== 'all' || filters.fechaDesde || filters.fechaHasta

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold flex items-center">
          <Search className="h-4 w-4 mr-2" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <Button onClick={onClearFilters} variant="ghost" size="sm">
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-xs">
            Buscar
          </Label>
          <Input
            id="search"
            placeholder="Consignatario o guía..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vendedor" className="text-xs">
            Vendedor
          </Label>
          <Select value={filters.vendedor} onValueChange={(value) => onFilterChange('vendedor', value)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Selecciona vendedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="RR">RR</SelectItem>
              <SelectItem value="MR">MR</SelectItem>
              <SelectItem value="PAC">PAC</SelectItem>
              <SelectItem value="NR">NR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">
            Fecha Desde
          </Label>
          <DatePicker
            date={filters.fechaDesde ? parse(filters.fechaDesde, 'yyyy-MM-dd', new Date()) : undefined}
            onDateChange={(date) => onFilterChange('fechaDesde', date ? format(date, 'yyyy-MM-dd') : '')}
            placeholder="Desde"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">
            Fecha Hasta
          </Label>
          <DatePicker
            date={filters.fechaHasta ? parse(filters.fechaHasta, 'yyyy-MM-dd', new Date()) : undefined}
            onDateChange={(date) => onFilterChange('fechaHasta', date ? format(date, 'yyyy-MM-dd') : '')}
            placeholder="Hasta"
          />
        </div>
      </div>
    </div>
  )
}

