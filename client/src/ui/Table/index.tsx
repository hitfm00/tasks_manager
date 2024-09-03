import { Table as MantineTable } from "@mantine/core";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";

import { ElementActions } from "../ElementActions";


export type TableActionsProps = {
  onEdit?: (element: unknown) => void;
  onDelete?: (element: unknown) => void;
  onInfo?: (element: unknown) => void;
};

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  actions?: TableActionsProps;
};

export const Table = <T extends object>({
  data,
  columns,
  actions,
}: TableProps<T>) => {
  const tableColumns = actions
    ? [
        ...columns,

        {
          id: "actions",
          header: "Actions",
          cell: (info) => (
            <ElementActions actions={actions} element={info.row.original} />
          ),
        } as ColumnDef<T, unknown>,
      ]
    : columns;

  const table = useReactTable<T>({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <MantineTable>
      <MantineTable.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <MantineTable.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <MantineTable.Th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </MantineTable.Th>
            ))}
          </MantineTable.Tr>
        ))}
      </MantineTable.Thead>
      <MantineTable.Tbody>
        {table.getRowModel().rows.map((row) => (
          <MantineTable.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <MantineTable.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </MantineTable.Td>
            ))}
          </MantineTable.Tr>
        ))}
      </MantineTable.Tbody>
      <MantineTable.Tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <MantineTable.Tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <MantineTable.Th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </MantineTable.Th>
            ))}
          </MantineTable.Tr>
        ))}
      </MantineTable.Tfoot>
    </MantineTable>
  );
};
