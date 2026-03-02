import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  type ReactNode,
} from "react";
import { clsx } from "clsx";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
  children: ReactNode;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children: ReactNode;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children: ReactNode;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  children: ReactNode;
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: ReactNode;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: ReactNode;
}

export interface TableCaptionProps
  extends HTMLAttributes<HTMLTableCaptionElement> {
  className?: string;
  children: ReactNode;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      striped = false,
      hoverable = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="acko-table-wrapper">
        <table
          ref={ref}
          className={clsx(
            "acko-table",
            striped && "acko-table-striped",
            hoverable && "acko-table-hoverable",
            className
          )}
          {...rest}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...rest }, ref) => (
    <thead
      ref={ref}
      className={clsx("acko-table-header", className)}
      {...rest}
    >
      {children}
    </thead>
  )
);

TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...rest }, ref) => (
    <tbody
      ref={ref}
      className={clsx("acko-table-body", className)}
      {...rest}
    >
      {children}
    </tbody>
  )
);

TableBody.displayName = "TableBody";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...rest }, ref) => (
    <tr
      ref={ref}
      className={clsx("acko-table-row", className)}
      {...rest}
    >
      {children}
    </tr>
  )
);

TableRow.displayName = "TableRow";

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, ...rest }, ref) => (
    <th
      ref={ref}
      className={clsx("acko-table-head", className)}
      {...rest}
    >
      {children}
    </th>
  )
);

TableHead.displayName = "TableHead";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...rest }, ref) => (
    <td
      ref={ref}
      className={clsx("acko-table-cell", className)}
      {...rest}
    >
      {children}
    </td>
  )
);

TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, children, ...rest }, ref) => (
  <caption
    ref={ref}
    className={clsx("acko-table-caption", className)}
    {...rest}
  >
    {children}
  </caption>
));

TableCaption.displayName = "TableCaption";
