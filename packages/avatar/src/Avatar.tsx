import { forwardRef } from "react";
import { clsx } from "clsx";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
  className?: string;
}

const UserIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const iconSizes: Record<NonNullable<AvatarProps["size"]>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      initials,
      size = "md",
      shape = "circle",
      className,
      ...rest
    },
    ref
  ) => {
    const hasImage = Boolean(src);
    const hasInitials = Boolean(initials);

    const content = hasImage ? (
      <img
        src={src}
        alt={alt ?? ""}
        className="acko-avatar-img"
        referrerPolicy="no-referrer"
      />
    ) : hasInitials ? (
      <span className={clsx("acko-avatar-initials", `acko-avatar-initials-${size}`)}>
        {initials}
      </span>
    ) : (
      <span className="acko-avatar-fallback" aria-hidden="true">
        <UserIcon size={iconSizes[size]} />
      </span>
    );

    return (
      <div
        ref={ref}
        role={hasImage ? undefined : "img"}
        aria-label={hasImage ? undefined : alt ?? (initials ? `Avatar for ${initials}` : "Default avatar")}
        className={clsx(
          "acko-avatar",
          `acko-avatar-${shape}`,
          `acko-avatar-${size}`,
          className
        )}
        {...rest}
      >
        {content}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
