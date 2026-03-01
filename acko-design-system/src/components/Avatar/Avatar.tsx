import React from 'react';
import { User } from 'lucide-react';
import styles from './Avatar.module.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  initials,
  size = 'md',
  shape = 'circle',
  className,
}) => {
  const classNames = [
    styles.avatar,
    styles[size],
    styles[shape],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (src) {
    return (
      <span
        className={classNames}
        role="img"
        aria-label={alt || undefined}
      >
        <img
          src={src}
          alt={alt}
          className={styles.img}
        />
      </span>
    );
  }

  if (initials) {
    return (
      <span
        className={classNames}
        role="img"
        aria-label={initials}
      >
        <span className={styles.initials}>{initials}</span>
      </span>
    );
  }

  return (
    <span
      className={classNames}
      role="img"
      aria-label="User avatar"
    >
      <User className={styles.icon} aria-hidden />
    </span>
  );
};

export default Avatar;
