import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'elevated' | 'demoted';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardInsetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'lg',
  children,
  className,
  ...rest
}) => {
  const classNames = [
    styles.card,
    styles[variant],
    styles[`padding_${padding}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.header, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.content, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.footer, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

/**
 * CardInset — a nested panel inside a Card.
 * Applies the nested radius rule: R1 = R2 − D (floored to 4px / --radius-sm).
 * Use for icon boxes, info panels, image thumbnails, or demoted sections
 * that sit inside a card. Never apply --radius-3xl to rectangular nested elements.
 */
export const CardInset: React.FC<CardInsetProps> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [styles.inset, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

export default Card;
