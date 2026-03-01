import React from 'react';
import styles from './Typography.module.css';

export interface TypographyProps {
  variant:
    | 'display-xl'
    | 'display-lg'
    | 'display-md'
    | 'display-sm'
    | 'heading-xl'
    | 'heading-lg'
    | 'heading-md'
    | 'heading-sm'
    | 'body-lg'
    | 'body-md'
    | 'body-sm'
    | 'label-lg'
    | 'label-md'
    | 'label-sm'
    | 'caption'
    | 'overline';
  as?: React.ElementType;
  color?: 'default' | 'strong' | 'muted' | 'disabled' | 'primary' | 'error' | 'success';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}

const VARIANT_TO_TAG: Record<TypographyProps['variant'], React.ElementType> = {
  'display-xl': 'h1',
  'display-lg': 'h1',
  'display-md': 'h1',
  'display-sm': 'h2',
  'heading-xl': 'h1',
  'heading-lg': 'h2',
  'heading-md': 'h3',
  'heading-sm': 'h4',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'label-lg': 'label',
  'label-md': 'label',
  'label-sm': 'label',
  caption: 'span',
  overline: 'span',
};

const VARIANT_TO_CLASS: Record<TypographyProps['variant'], string> = {
  'display-xl': styles.displayXl,
  'display-lg': styles.displayLg,
  'display-md': styles.displayMd,
  'display-sm': styles.displaySm,
  'heading-xl': styles.headingXl,
  'heading-lg': styles.headingLg,
  'heading-md': styles.headingMd,
  'heading-sm': styles.headingSm,
  'body-lg': styles.bodyLg,
  'body-md': styles.bodyMd,
  'body-sm': styles.bodySm,
  'label-lg': styles.labelLg,
  'label-md': styles.labelMd,
  'label-sm': styles.labelSm,
  caption: styles.caption,
  overline: styles.overline,
};

const COLOR_TO_CLASS: Record<NonNullable<TypographyProps['color']>, string> = {
  default: styles.colorDefault,
  strong: styles.colorStrong,
  muted: styles.colorMuted,
  disabled: styles.colorDisabled,
  primary: styles.colorPrimary,
  error: styles.colorError,
  success: styles.colorSuccess,
};

const WEIGHT_TO_CLASS: Record<NonNullable<TypographyProps['weight']>, string> = {
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
};

const ALIGN_TO_CLASS: Record<NonNullable<TypographyProps['align']>, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
};

export const Typography: React.FC<TypographyProps> = ({
  variant,
  as,
  color = 'default',
  weight,
  align,
  truncate = false,
  className,
  children,
}) => {
  const Component = as ?? VARIANT_TO_TAG[variant];
  const classNames = [
    styles.root,
    VARIANT_TO_CLASS[variant],
    COLOR_TO_CLASS[color],
    weight && WEIGHT_TO_CLASS[weight],
    align && ALIGN_TO_CLASS[align],
    truncate && styles.truncate,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classNames}>{children}</Component>;
};

export default Typography;
