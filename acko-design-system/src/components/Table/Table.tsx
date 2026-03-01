import React from 'react';
import styles from './Table.module.css';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  striped = false,
  hoverable = false,
  className,
  children,
  ...rest
}) => {
  const wrapperClasses = [
    styles.wrapper,
    striped && styles.striped,
    hoverable && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <table className={styles.table} {...rest}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.header, className].filter(Boolean).join(' ');
  return (
    <thead className={classNames} {...rest}>
      {children}
    </thead>
  );
};

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.body, className].filter(Boolean).join(' ');
  return (
    <tbody className={classNames} {...rest}>
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.row, className].filter(Boolean).join(' ');
  return (
    <tr className={classNames} {...rest}>
      {children}
    </tr>
  );
};

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.head, className].filter(Boolean).join(' ');
  return (
    <th className={classNames} {...rest}>
      {children}
    </th>
  );
};

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.cell, className].filter(Boolean).join(' ');
  return (
    <td className={classNames} {...rest}>
      {children}
    </td>
  );
};

export const TableCaption: React.FC<TableCaptionProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.caption, className].filter(Boolean).join(' ');
  return (
    <caption className={classNames} {...rest}>
      {children}
    </caption>
  );
};
