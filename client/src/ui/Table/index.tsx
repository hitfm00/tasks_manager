import { Table as MantineTable } from "@mantine/core";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";


export const Table = <T extends object>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnDef<T, keyof T>[];
}) => {
  const table = useReactTable<T>({
    data,
    columns,
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
