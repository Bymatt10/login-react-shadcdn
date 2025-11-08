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
import { X } from 'lucide-react'
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
    <div className="flex items-end gap-3 mb-6">
      <div className="flex flex-col gap-1 min-w-fit">
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

      <div className="flex flex-col gap-1 min-w-fit">
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

      <div className="flex flex-col gap-1 min-w-fit">
        <Label className="text-xs">
          Fecha Desde
        </Label>
        <DatePicker
          date={filters.fechaDesde ? parse(filters.fechaDesde, 'yyyy-MM-dd', new Date()) : undefined}
          onDateChange={(date) => onFilterChange('fechaDesde', date ? format(date, 'yyyy-MM-dd') : '')}
          placeholder="Desde"
        />
      </div>

      <div className="flex flex-col gap-1 min-w-fit">
        <Label className="text-xs">
          Fecha Hasta
        </Label>
        <DatePicker
          date={filters.fechaHasta ? parse(filters.fechaHasta, 'yyyy-MM-dd', new Date()) : undefined}
          onDateChange={(date) => onFilterChange('fechaHasta', date ? format(date, 'yyyy-MM-dd') : '')}
          placeholder="Hasta"
        />
      </div>

      {hasActiveFilters && (
        <Button onClick={onClearFilters} variant="ghost" size="sm" className="h-9">
          <X className="h-4 w-4 mr-1" />
          Limpiar
        </Button>
      )}
    </div>
  )
}

