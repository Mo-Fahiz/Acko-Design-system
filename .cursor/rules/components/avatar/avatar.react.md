---
description: Avatar React implementation — props, fallback hierarchy, image loading, usage guidance
globs: "**/avatar/**,**/Avatar/**"
---

# Avatar — React

Package: `@acko/avatar`
Directive: none (presentational)

## Props Interface

```typescript
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  className?: string;
}
```

## Fallback Hierarchy

The Avatar renders content based on available props, with automatic fallback if an image fails to load:

1. `src` provided and loads successfully → renders `<img>` with `object-fit: cover`
2. `src` fails to load (broken URL, CORS, CDN down) → falls through to next level
3. `initials` provided → renders text with primary-subtle background
4. Neither available → renders fallback User icon

**Always pass `initials` alongside `src` when the image source is unreliable** (external APIs, user uploads). This guarantees a graceful fallback.

## Content Selection

| Data source reliability | Props to pass | Why |
|------------------------|---------------|-----|
| **Guaranteed** (CMS headshot, internal asset) | `src` + `alt` | Photo will always load |
| **Uncertain** (user upload, Google review, App Store) | `src` + `initials` + `alt` | Graceful fallback if image fails |
| **No photo** (user-entered name only) | `initials` + `alt` | Name is the only data |
| **Anonymous** (no data at all) | (none) | Fallback icon renders |

### Use case examples

```tsx
// Expert review — CMS guarantees a headshot
<Avatar src={expert.headshot} alt={expert.name} size="lg" />

// User profile — photo may not exist
<Avatar src={user.photo} initials={getInitials(user.name)} alt={user.name} size="xl" />

// Google/App Store review — external URL, may break
<Avatar src={review.authorPhoto} initials={getInitials(review.authorName)} alt={review.authorName} size="sm" />

// Family member — rarely has a photo
<Avatar initials={getInitials(member.name)} alt={member.name} size="md" />

// Anonymous system avatar
<Avatar size="md" />
```

## Shape Selection

| Represents | Shape | Example |
|-----------|-------|---------|
| Person (user, family member, reviewer, expert) | `circle` | `<Avatar initials="PS" shape="circle" />` |
| Entity (company, hospital, garage, app) | `square` | `<Avatar src={logo} shape="square" />` |

**Decision rule:** Is this a human? → `circle`. Everything else → `square`.

Default: `circle` — most avatars represent people.

## Size Selection

| Context | Size |
|---------|------|
| Inline in table cell, compact list, notification indicator | `xs` |
| Review list (Google, App Store), small metadata | `sm` |
| Card-level (testimonial, family member, quote, comments) | `md` |
| Profile section, expert review highlight | `lg` |
| Hero profile, settings page header | `xl` |

Default: `md`.

## Exports

```typescript
export { Avatar } from './Avatar';
export type { AvatarProps } from './Avatar';
```
