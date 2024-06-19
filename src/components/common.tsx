import { FC } from 'react'
import { TableCell } from '@mui/material'

import { CenteredTableCellProps } from '@src/common/interfaces'


export const CenteredTableCell: FC<CenteredTableCellProps> = ({ rowSpan = 1, colSpan = 1, children }) => (
  <TableCell align='center' rowSpan={ rowSpan } colSpan={ colSpan }>
    { children }
  </TableCell>
)
