import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { TableRow, TableCell } from '@/components/ui/table'
import { Tarifa } from '@/types/tarifa'
import { parse, format } from 'date-fns'

interface TarifaTableRowProps {
  rowNumber: number
  initialData: Tarifa
  onUpdate?: (id: number, data: Partial<Tarifa>) => void
}

export const TarifaTableRow = ({ rowNumber, initialData, onUpdate }: TarifaTableRowProps) => {
  const [data, setData] = useState(initialData)

  const handleChange = (field: keyof Tarifa, value: string | number) => {
    const newData = { ...data, [field]: value }
    setData(newData)
    onUpdate?.(data.id, { [field]: value })
  }

  return (
    <TableRow className="text-xs">
      <TableCell className="text-center font-medium">{rowNumber}</TableCell>
      <TableCell>
        <DatePicker
          date={data.fecha ? parse(data.fecha, 'yyyy-MM-dd', new Date()) : undefined}
          onDateChange={(date) => handleChange('fecha', date ? format(date, 'yyyy-MM-dd') : '')}
          placeholder="Fecha"
          className="h-7 text-xs"
        />
      </TableCell>
      <TableCell>
        <Input
          value={data.numeroGuia}
          onChange={(e) => handleChange('numeroGuia', e.target.value)}
          className="h-7 text-xs w-28"
        />
      </TableCell>
      <TableCell>
        <Input
          value={data.consignatario}
          onChange={(e) => handleChange('consignatario', e.target.value)}
          className="h-7 text-xs min-w-[200px]"
        />
      </TableCell>
      <TableCell>
        <Input
          value={data.vendedor}
          onChange={(e) => handleChange('vendedor', e.target.value)}
          className="h-7 text-xs w-16"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={data.pcs}
          onChange={(e) => handleChange('pcs', parseFloat(e.target.value) || 0)}
          className="h-7 text-xs w-16 text-right"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={data.volumen}
          onChange={(e) => handleChange('volumen', parseFloat(e.target.value) || 0)}
          className="h-7 text-xs w-20 text-right"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step="0.01"
          value={data.tarifa}
          onChange={(e) => handleChange('tarifa', parseFloat(e.target.value) || 0)}
          className="h-7 text-xs w-20 text-right"
        />
      </TableCell>
      <TableCell className="text-right">{data.flete.toFixed(2)}</TableCell>
      <TableCell className="text-right">{data.carrier.toFixed(2)}</TableCell>
      <TableCell className="text-right">{data.agent.toFixed(2)}</TableCell>
      <TableCell className="text-right">{data.totalAWB.toFixed(2)}</TableCell>
      <TableCell className="text-right">{data.trfNeta.toFixed(2)}</TableCell>
      <TableCell className="text-right">{data.difTarifa.toFixed(2)}</TableCell>
      <TableCell className="text-right">{data.rentaTRF.toFixed(2)}</TableCell>
      <TableCell className="text-right">{data.pagoCASS.toFixed(2)}</TableCell>
      <TableCell className="text-right">{data.rentaCASS.toFixed(2)}</TableCell>
      <TableCell>{data.remark}</TableCell>
    </TableRow>
  )
}

