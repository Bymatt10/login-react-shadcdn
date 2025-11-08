import { TableRow, TableCell } from '@/components/ui/table'
import { Tarifa } from '@/types/tarifa'
import { format, parseISO } from 'date-fns'

interface TarifaTableRowProps {
  data: Tarifa
}

export const TarifaTableRow = ({ data }: TarifaTableRowProps) => {
  const formattedDate = data.fecha ? format(parseISO(data.fecha), 'dd/MM/yyyy') : '-'

  return (
    <TableRow className="text-xs">
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{data.numeroGuia}</TableCell>
      <TableCell className="min-w-[200px]">{data.consignatario}</TableCell>
      <TableCell className="text-right">{data.tarifa.toFixed(2)}</TableCell>
    </TableRow>
  )
}

