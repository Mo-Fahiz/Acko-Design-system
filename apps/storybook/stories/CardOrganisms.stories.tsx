import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowRight,
  Bookmark,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Share2,
  User,
  Users,
  X,
} from "lucide-react";

import { Avatar } from "@acko/avatar";
import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Typography } from "@acko/typography";

const meta = {
  title: "Organisms/Cards",
  tags: ["autodocs"],
  parameters: {
    /** Single-card stories: comfortable canvas; override to fullscreen on Gallery. */
    layout: "padded",
    docs: {
      description: {
        component:
          "Card layouts composed from `@acko/card`, `@acko/button`, `@acko/typography`, `@acko/avatar`, and `lucide-react`. Open the **Docs** tab or **Show code** under Canvas. Source maps to named functions in this file (e.g. `Card01_CreatorList`, `Card27_CourseApply`).",
      },
      canvas: {
        sourceState: "shown",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const waveTitle = "Constructive and destructive waves";

const feedBody =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

const shortReadingBody =
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.";

const longReadingBody =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const twoLineInfoBody =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const threeLineListBody =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

function StarRatingOneOfFive() {
  return (
    <div className="sb-card-star-row" aria-label="Rating 1 out of 5 stars">
      <span className="sb-card-star--on">{"\u2605"}</span>
      <span className="sb-card-star--off">{"\u2605"}</span>
      <span className="sb-card-star--off">{"\u2605"}</span>
      <span className="sb-card-star--off">{"\u2605"}</span>
      <span className="sb-card-star--off">{"\u2605"}</span>
    </div>
  );
}

/** 1 — Creators + avatar stack (referenced by `CreatorList` story — shown in Storybook “Show code”). */
export function Card01_CreatorList() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-row-between">
        <Typography variant="body-md" weight="semibold" as="p">
          Creators you know
        </Typography>
        <div className="sb-card-avatar-row">
          <Avatar initials="A" size="sm" alt="Creator A" />
          <Avatar initials="B" size="sm" alt="Creator B" />
          <Avatar initials="C" size="sm" alt="Creator C" />
          <Avatar initials="D" size="sm" alt="Creator D" />
        </div>
      </div>
    </Card>
  );
}

/** 2 — Search row (icon, placeholder, chevron) */
export function Card02_SearchRow() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-search-row">
        <Search size={20} strokeWidth={2} aria-hidden />
        <span className="sb-card-search-placeholder">Search creator</span>
        <ChevronRight size={20} strokeWidth={2} aria-hidden />
      </div>
    </Card>
  );
}

/** 3 — Text left, image right, rating + bookmark */
export function Card03_HorizontalImageRight() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-split">
        <div className="sb-card-split-text">
          <Typography variant="heading-sm" as="h3">
            {waveTitle}
          </Typography>
          <div className="sb-card-rating-row">
            <StarRatingOneOfFive />
            <Button variant="ghost" size="sm" iconOnly iconLeft={<Bookmark />}>
              Save
            </Button>
          </div>
        </div>
        <div className="sb-card-wave sb-card-wave--square" aria-hidden />
      </div>
    </Card>
  );
}

/** 4 — Image left, title right */
export function Card04_HorizontalImageLeft() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-split sb-card-split--vcenter">
        <div className="sb-card-wave sb-card-wave--square" aria-hidden />
        <div className="sb-card-split-text">
          <Typography variant="heading-sm" as="h3">
            {waveTitle}
          </Typography>
        </div>
      </div>
    </Card>
  );
}

/** 5 — Ticket + quantity */
export function Card05_Ticket() {
  const [n, setN] = useState(2);

  return (
    <Card variant="default" padding="md">
      <div className="sb-card-ticket-row">
        <div className="sb-card-body-grow">
          <Typography variant="body-md" weight="semibold" as="p">
            Ticket
          </Typography>
          <Typography variant="body-sm" color="secondary">
            Ages 2-12
          </Typography>
        </div>
        <div className="sb-card-stepper">
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            iconLeft={<Minus />}
            disabled={n <= 1}
            onClick={() => setN((x) => Math.max(1, x - 1))}
          >
            Decrease
          </Button>
          <Typography variant="body-md" weight="semibold" as="span">
            {n}
          </Typography>
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            iconLeft={<Plus />}
            onClick={() => setN((x) => x + 1)}
          >
            Increase
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** 6 — Profile + follow */
export function Card06_ProfileFollow() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-row-between">
        <Avatar initials="JB" size="lg" alt="Jerome Bell" />
        <div className="sb-card-body-grow">
          <Typography variant="body-md" weight="semibold">
            Jerome Bell
          </Typography>
          <Typography variant="body-sm" color="secondary">
            @whitefish664
          </Typography>
        </div>
        <Button variant="primary" size="sm">
          Follow
        </Button>
      </div>
    </Card>
  );
}

/** 7 — Social post */
export function Card07_SocialFeed() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-feed-header">
        <div className="sb-card-feed-user">
          <Avatar initials="JB" size="md" alt="Jerome Bell" />
          <div className="sb-card-body-grow">
            <Typography variant="body-md" weight="semibold">
              Jerome Bell
            </Typography>
            <Typography variant="caption" color="secondary">
              · 2 weeks ago
            </Typography>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconOnly iconLeft={<MoreHorizontal />}>
          More options
        </Button>
      </div>
      <Typography variant="body-sm" color="secondary">
        {feedBody}
      </Typography>
      <div className="sb-card-feed-stats">
        <span className="sb-card-feed-stat">
          <Heart size={18} strokeWidth={2} aria-hidden />
          816
        </span>
        <span className="sb-card-feed-stat">
          <Bookmark size={18} strokeWidth={2} aria-hidden />
          877
        </span>
        <span className="sb-card-feed-stat">
          <MessageCircle size={18} strokeWidth={2} aria-hidden />
          185
        </span>
      </div>
    </Card>
  );
}

/** 8 — Event / notification row */
export function Card08_EventRow() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-event-row">
        <div className="sb-card-wave sb-card-wave--thumb" aria-hidden />
        <div className="sb-card-body-grow sb-card-event-body">
          <span className="sb-card-time-badge">07:00 PM</span>
          <Typography variant="body-md" weight="semibold" as="p">
            {waveTitle}
          </Typography>
          <Typography variant="body-sm" color="secondary">
            October 30, 2023
          </Typography>
        </div>
        <Button variant="ghost" size="sm" iconOnly iconLeft={<MoreHorizontal />}>
          More options
        </Button>
      </div>
    </Card>
  );
}

/** 9 — Icon stat bar */
export function Card09_StatBar() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-stat-grid">
        <div className="sb-card-stat-cell">
          <Heart size={28} strokeWidth={1.35} aria-hidden />
          <Typography variant="body-md" weight="semibold" as="span">
            816
          </Typography>
        </div>
        <div className="sb-card-stat-cell">
          <Bookmark size={28} strokeWidth={1.35} aria-hidden />
          <Typography variant="body-md" weight="semibold" as="span">
            877
          </Typography>
        </div>
        <div className="sb-card-stat-cell">
          <MessageCircle size={28} strokeWidth={1.35} aria-hidden />
          <Typography variant="body-md" weight="semibold" as="span">
            185
          </Typography>
        </div>
      </div>
    </Card>
  );
}

/** 10 — Reading task: label + icon + title */
export function Card10_ReadingHeader() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <Typography variant="caption" color="secondary" as="p">
          Reading task
        </Typography>
        <div className="sb-card-icon-title-row">
          <Mail size={20} strokeWidth={2} aria-hidden />
          <Typography variant="heading-sm" as="h3">
            {waveTitle}
          </Typography>
        </div>
      </div>
    </Card>
  );
}

/** 11 — Icon, title, short description */
export function Card11_ReadingIconBody() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <Mail size={22} strokeWidth={2} aria-hidden />
        <Typography variant="heading-sm" as="h3">
          {waveTitle}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          {shortReadingBody}
        </Typography>
      </div>
    </Card>
  );
}

/** 12 — Inline icon + title, long description */
export function Card12_ReadingInlineLong() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <div className="sb-card-icon-title-row">
          <Mail size={20} strokeWidth={2} aria-hidden />
          <Typography variant="heading-sm" as="h3">
            {waveTitle}
          </Typography>
        </div>
        <Typography variant="body-sm" color="secondary">
          {longReadingBody}
        </Typography>
      </div>
    </Card>
  );
}

/** 13 — Reading task list + Continue */
export function Card13_ReadingTaskList() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <Typography variant="caption" color="secondary" as="p">
          Reading task
        </Typography>
        <Typography variant="heading-sm" as="h3">
          {waveTitle}
        </Typography>
        <div className="sb-card-reading-list">
          {["Item", "Item", "Item", "Item"].map((label, i) => (
            <div key={i} className="sb-card-reading-item">
              <Mail size={18} strokeWidth={2} aria-hidden />
              <Typography variant="body-md" weight="semibold" as="span">
                {label}
              </Typography>
            </div>
          ))}
        </div>
        <Button variant="secondary" fullWidth>
          Continue
        </Button>
      </div>
    </Card>
  );
}

/** 14 — Time badge + title + long body */
export function Card14_ReadingTimed() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <span className="sb-card-time-badge">07:00 PM</span>
        <Typography variant="heading-sm" as="h3">
          {waveTitle}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          {longReadingBody}
        </Typography>
      </div>
    </Card>
  );
}

/** 15 — Media + overlay badge, body, footer meta */
export function Card15_ReadingMediaMeta() {
  return (
    <Card variant="default" padding="none" className="sb-card-clip">
      <div className="sb-card-media-wrap">
        <div className="sb-card-wave sb-card-wave--hero" aria-hidden />
        <span className="sb-card-time-badge sb-card-time-badge--overlay">
          07:00 PM
        </span>
      </div>
      <div className="sb-card-reading-body">
        <Typography variant="heading-sm" as="h3">
          {waveTitle}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          {shortReadingBody}
        </Typography>
        <div className="sb-card-rating-row">
          <div className="sb-card-meta-stack">
            <Typography variant="caption" color="secondary">
              2 hours 40 minutes
            </Typography>
            <StarRatingOneOfFive />
          </div>
          <Button variant="ghost" size="sm" iconOnly iconLeft={<Bookmark />}>
            Save
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** 16 — Profile header + article (follow, title, body) */
export function Card16_ProfilePostArticle() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <div className="sb-card-row-between">
          <div className="sb-card-feed-user">
            <Avatar initials="JB" size="lg" alt="Jerome Bell" />
            <div className="sb-card-body-grow">
              <Typography variant="body-md" weight="semibold">
                Jerome Bell
              </Typography>
              <Typography variant="body-sm" color="secondary">
                @whitefish664
              </Typography>
            </div>
          </div>
          <Button variant="primary" size="sm">
            Follow
          </Button>
        </div>
        <Typography variant="heading-sm" as="h3">
          {waveTitle}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          {feedBody}
        </Typography>
      </div>
    </Card>
  );
}

/** 17 — Centered avatar, title, body, full-width Continue */
export function Card17_HeroCentered() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-hero-center">
        <Avatar initials="JB" size="xl" alt="Jerome Bell" />
        <Typography variant="heading-sm" as="h3" align="center">
          {waveTitle}
        </Typography>
        <Typography variant="body-sm" color="secondary" align="center">
          {shortReadingBody}
        </Typography>
        <Button variant="primary" fullWidth iconRight={<ArrowRight />}>
          Continue
        </Button>
      </div>
    </Card>
  );
}

/** 18 — Title, body, duration, footer “View more” + chevron */
export function Card18_InfoViewMore() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <Typography variant="heading-sm" as="h3">
          {waveTitle}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          {twoLineInfoBody}
        </Typography>
        <Typography variant="caption" color="secondary">
          2 hours 40 minutes
        </Typography>
        <div className="sb-card-footer-divider">
          <div className="sb-card-footer-link-row">
            <Typography variant="body-md" weight="semibold" as="span">
              View more
            </Typography>
            <ChevronRight size={20} strokeWidth={2} aria-hidden />
          </div>
        </div>
      </div>
    </Card>
  );
}

/** 19 — Title, price, Choose; footer Share */
export function Card19_PricingChooseShare() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <Typography variant="heading-sm" as="h3">
          {waveTitle}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          $39 / person
        </Typography>
        <Button variant="primary" size="sm">
          Choose
        </Button>
        <div className="sb-card-footer-divider">
          <div className="sb-card-footer-share-row">
            <Share2 size={18} strokeWidth={2} aria-hidden />
            <Typography variant="body-md" as="span">
              Share
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}

/** 20 — List row: thumb, text, time; footer members + location */
export function Card20_ListEventRow() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <div className="sb-card-list-event-body">
          <div className="sb-card-wave sb-card-wave--list-thumb" aria-hidden />
          <div className="sb-card-list-event-main">
            <div className="sb-card-list-event-head">
              <div className="sb-card-meta-stack">
                <Typography variant="heading-sm" as="h3">
                  {waveTitle}
                </Typography>
                <Typography variant="body-sm" color="secondary">
                  {threeLineListBody}
                </Typography>
              </div>
              <Typography
                variant="caption"
                color="secondary"
                className="sb-card-list-time"
                as="span"
              >
                1:07 PM
              </Typography>
            </div>
          </div>
        </div>
        <div className="sb-card-footer-divider">
          <div className="sb-card-footer-split">
            <div className="sb-card-footer-split-item">
              <Users size={18} strokeWidth={2} aria-hidden />
              <Typography variant="body-md" as="span">
                2 members
              </Typography>
            </div>
            <div className="sb-card-footer-split-item">
              <MapPin size={18} strokeWidth={2} aria-hidden />
              <Typography variant="body-md" as="span">
                Seoul
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/** 21 — Full-bleed wave, centered play, bottom caption bar */
export function Card21_CoverPlayBottomBar() {
  return (
    <Card variant="default" padding="none" className="sb-card-clip">
      <div className="sb-card-media-wrap sb-card-cover-full">
        <div className="sb-card-wave sb-card-wave--cover-tall" aria-hidden />
        <div className="sb-card-cover-play-center">
          <Button
            variant="primary"
            size="lg"
            iconOnly
            iconLeft={<Play strokeWidth={2} aria-hidden />}
            className="sb-card-cover-play-fab"
          >
            Play
          </Button>
        </div>
        <div className="sb-card-cover-bottom-bar">
          <Typography variant="caption" color="static" as="span">
            Jerome Bell
          </Typography>
          <Typography variant="heading-sm" color="static" as="h3">
            {waveTitle}
          </Typography>
        </div>
      </div>
    </Card>
  );
}

/** 22 — Full-bleed wave, bottom gradient row: avatar, title stack, more */
export function Card22_CoverAvatarGradientFooter() {
  return (
    <Card variant="default" padding="none" className="sb-card-clip">
      <div className="sb-card-media-wrap sb-card-cover-full">
        <div className="sb-card-wave sb-card-wave--cover-tall" aria-hidden />
        <div className="sb-card-cover-footer">
          <Avatar initials="JB" size="lg" alt="Jerome Bell" />
          <div className="sb-card-cover-footer-mid">
            <Typography variant="caption" color="static" as="span">
              Jerome Bell
            </Typography>
            <Typography variant="heading-sm" color="static" as="h3">
              {waveTitle}
            </Typography>
            <Typography
              variant="caption"
              as="span"
              className="sb-card-on-gradient-muted"
            >
              2 hours 40 minutes
            </Typography>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            iconLeft={<MoreHorizontal strokeWidth={2} aria-hidden />}
          >
            More options
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** 23 — White card, inset rounded wave, profile row + more */
export function Card23_InsetMediaProfileRow() {
  return (
    <Card variant="default" padding="none" className="sb-card-clip">
      <div className="sb-card-inset-media">
        <div className="sb-card-wave sb-card-wave--inset-top" aria-hidden />
      </div>
      <div className="sb-card-reading-body">
        <div className="sb-card-row-between">
          <Avatar initials="JB" size="lg" alt="Jerome Bell" />
          <div className="sb-card-meta-stack sb-card-cover-footer-mid">
            <Typography variant="body-md" weight="semibold" as="p">
              Jerome Bell
            </Typography>
            <Typography variant="body-sm" color="secondary" as="p">
              @whitefish664
            </Typography>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            iconLeft={<MoreHorizontal strokeWidth={2} aria-hidden />}
          >
            More options
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** 24 — Purple–blue gradient, facepile, reading task, play chip */
export function Card24_ReadingGradientFacepile() {
  return (
    <Card
      variant="outline"
      padding="md"
      className="sb-card-reading-gradient sb-card-clip"
    >
      <div className="sb-card-reading-gradient-stack">
        <div className="sb-card-avatar-row" aria-hidden>
          <Avatar initials="A" size="md" alt="" />
          <Avatar initials="B" size="md" alt="" />
          <Avatar initials="C" size="md" alt="" />
          <Avatar initials="D" size="md" alt="" />
        </div>
        <Typography
          variant="overline"
          as="span"
          className="sb-card-on-gradient-muted"
        >
          Reading task
        </Typography>
        <Typography variant="heading-md" color="static" as="h3">
          {waveTitle}
        </Typography>
        <Typography
          variant="caption"
          as="span"
          className="sb-card-on-gradient-muted"
        >
          2 hours 40 minutes
        </Typography>
        <Button
          variant="primary"
          size="sm"
          iconLeft={<Play strokeWidth={2} aria-hidden />}
          className="sb-card-play-chip"
        >
          Play
        </Button>
      </div>
    </Card>
  );
}

/** 25 — Solid primary host card: avatar, host pill, title, location */
export function Card25_HostSolidLocation() {
  return (
    <Card variant="outline" padding="md" className="sb-card-host-solid">
      <div className="sb-card-reading-stack">
        <div className="sb-card-host-user-row">
          <Avatar initials="RP" size="md" alt="Rani Park" />
          <Typography variant="body-md" weight="medium" color="static" as="span">
            Rani Park
          </Typography>
          <span className="sb-card-host-pill">Host</span>
        </div>
        <Typography variant="heading-md" color="static" as="h3">
          {waveTitle}
        </Typography>
        <div className="sb-card-footer-split-item">
          <MapPin size={18} strokeWidth={2} aria-hidden />
          <Typography variant="body-md" color="static" as="span">
            Seoul
          </Typography>
        </div>
      </div>
    </Card>
  );
}

/** 26 — Dense host: title row, facepile + audience count, date + play */
export function Card26_HostDenseAudience() {
  return (
    <Card variant="outline" padding="md" className="sb-card-host-solid">
      <div className="sb-card-reading-stack">
        <div className="sb-card-host-header-row">
          <Typography variant="heading-md" color="static" as="h3">
            {waveTitle}
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            iconLeft={<MoreHorizontal strokeWidth={2} aria-hidden />}
          >
            More options
          </Button>
        </div>
        <div className="sb-card-audience-row">
          <Avatar initials="A" size="xl" alt="" />
          <Avatar initials="B" size="xl" alt="" />
          <Avatar initials="C" size="xl" alt="" />
          <Avatar initials="D" size="xl" alt="" />
          <div className="sb-card-audience-extra" aria-label="40.2 thousand attendees">
            <User size={18} strokeWidth={2} aria-hidden />
            <span className="sb-card-audience-count">40.2k</span>
          </div>
        </div>
        <div className="sb-card-host-footer-row">
          <Typography
            variant="caption"
            as="span"
            className="sb-card-host-foot-muted"
          >
            2 hours · October 30, 2023
          </Typography>
          <Button
            variant="primary"
            size="sm"
            iconLeft={<Play strokeWidth={2} aria-hidden />}
            className="sb-card-play-chip"
          >
            Play
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** 27 — Time badge, title, duration, full-width Apply */
export function Card27_CourseApply() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <span className="sb-card-time-badge">07:00 PM</span>
        <Typography variant="heading-sm" as="h3">
          {waveTitle}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          2 hours 40 minutes
        </Typography>
        <Button variant="primary" fullWidth>
          Apply
        </Button>
      </div>
    </Card>
  );
}

/** 28 — Dismiss, centered avatar, handle, full-width Follow */
export function Card28_ProfileSheetFollow() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-reading-stack">
        <div className="sb-card-profile-dismiss-row">
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            iconLeft={<X strokeWidth={2} aria-hidden />}
          >
            Close
          </Button>
        </div>
        <div className="sb-card-hero-center">
          <Avatar initials="JB" size="xl" alt="Jerome Bell" />
          <Typography variant="heading-sm" as="h3" align="center">
            Jerome Bell
          </Typography>
          <Typography variant="body-sm" color="secondary" align="center">
            @whitefish664
          </Typography>
          <Button variant="primary" fullWidth>
            Follow
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** 29 — Horizontal mini profile: avatar, name, Creator label */
export function Card29_CreatorChip() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-feed-user">
        <Avatar initials="JB" size="md" alt="Jerome Bell" />
        <div className="sb-card-meta-stack">
          <Typography variant="body-md" weight="semibold" as="p">
            Jerome Bell
          </Typography>
          <Typography variant="body-sm" color="brand" as="p">
            Creator
          </Typography>
        </div>
      </div>
    </Card>
  );
}

/** 30 — Hero wave, left-aligned instructor + title + duration */
export function Card30_CoursePreviewStack() {
  return (
    <Card variant="default" padding="none" className="sb-card-clip">
      <div className="sb-card-wave sb-card-wave--hero" aria-hidden />
      <div className="sb-card-reading-body">
        <Typography variant="caption" color="secondary" as="p">
          Jerome Bell
        </Typography>
        <Typography variant="heading-sm" as="h3">
          {waveTitle}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          2 hours 40 minutes
        </Typography>
      </div>
    </Card>
  );
}

/** 31 — Hero wave, overlapping centered avatar, footer View contents */
export function Card31_CoursePreviewOverlap() {
  return (
    <Card variant="default" padding="none" className="sb-card-clip">
      <div className="sb-card-media-wrap">
        <div className="sb-card-wave sb-card-wave--hero" aria-hidden />
      </div>
      <div className="sb-card-course-overlap-wrap">
        <div className="sb-card-course-overlap-avatar">
          <Avatar initials="JB" size="xl" alt="Jerome Bell" />
        </div>
        <Typography variant="body-md" weight="semibold" as="p">
          Jerome Bell
        </Typography>
        <Typography variant="body-sm" color="secondary" as="p">
          {waveTitle}
        </Typography>
        <div className="sb-card-view-contents">
          <Button variant="link" className="sb-card-view-contents-btn">
            View contents
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** 32 — Centered title, square wave, View contents */
export function Card32_CoursePreviewTitleFirst() {
  return (
    <Card variant="default" padding="md">
      <div className="sb-card-course-c-stack">
        <Typography variant="heading-sm" as="h3" align="center">
          {waveTitle}
        </Typography>
        <div className="sb-card-wave sb-card-wave--promo-square" aria-hidden />
        <div className="sb-card-view-contents">
          <Button variant="link" className="sb-card-view-contents-btn">
            View contents
          </Button>
        </div>
      </div>
    </Card>
  );
}

const GALLERY_CARDS = [
  Card01_CreatorList,
  Card02_SearchRow,
  Card03_HorizontalImageRight,
  Card04_HorizontalImageLeft,
  Card05_Ticket,
  Card06_ProfileFollow,
  Card07_SocialFeed,
  Card08_EventRow,
  Card09_StatBar,
  Card10_ReadingHeader,
  Card11_ReadingIconBody,
  Card12_ReadingInlineLong,
  Card13_ReadingTaskList,
  Card14_ReadingTimed,
  Card15_ReadingMediaMeta,
  Card16_ProfilePostArticle,
  Card17_HeroCentered,
  Card18_InfoViewMore,
  Card19_PricingChooseShare,
  Card20_ListEventRow,
  Card21_CoverPlayBottomBar,
  Card22_CoverAvatarGradientFooter,
  Card23_InsetMediaProfileRow,
  Card24_ReadingGradientFacepile,
  Card25_HostSolidLocation,
  Card26_HostDenseAudience,
  Card27_CourseApply,
  Card28_ProfileSheetFollow,
  Card29_CreatorChip,
  Card30_CoursePreviewStack,
  Card31_CoursePreviewOverlap,
  Card32_CoursePreviewTitleFirst,
] as const;

export const Gallery: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
  },
  render: () => (
    <div>
      <div className="sb-gallery-heading">
        <Typography variant="heading-lg" as="h1">
          Card organisms
        </Typography>
        <Typography variant="body-sm" color="secondary">
          Reference layouts: social, search, course apply, profile sheets, creator
          chips, course previews, reading tasks, media covers, gradient reading
          tasks, host cards, profile articles, pricing, and list rows.
        </Typography>
      </div>
      <div className="sb-card-gallery">
        {GALLERY_CARDS.map((CardFn, index) => (
          <CardFn key={index} />
        ))}
      </div>
    </div>
  ),
};

/** Use `render: Card01_CreatorList` so “Show code” surfaces the story function, not a wrapper. */
export const CreatorList: Story = {
  render: Card01_CreatorList,
};

export const SearchRow: Story = {
  render: Card02_SearchRow,
};

export const HorizontalImageRight: Story = {
  render: Card03_HorizontalImageRight,
};

export const HorizontalImageLeft: Story = {
  render: Card04_HorizontalImageLeft,
};

export const Ticket: Story = {
  render: Card05_Ticket,
};

export const ProfileFollow: Story = {
  render: Card06_ProfileFollow,
};

export const SocialFeed: Story = {
  render: Card07_SocialFeed,
};

export const EventRow: Story = {
  render: Card08_EventRow,
};

export const StatBar: Story = {
  render: Card09_StatBar,
};

export const ReadingHeader: Story = {
  render: Card10_ReadingHeader,
};

export const ReadingIconBody: Story = {
  render: Card11_ReadingIconBody,
};

export const ReadingInlineLong: Story = {
  render: Card12_ReadingInlineLong,
};

export const ReadingTaskList: Story = {
  render: Card13_ReadingTaskList,
};

export const ReadingTimed: Story = {
  render: Card14_ReadingTimed,
};

export const ReadingMediaMeta: Story = {
  render: Card15_ReadingMediaMeta,
};

export const ProfilePostArticle: Story = {
  render: Card16_ProfilePostArticle,
};

export const HeroCentered: Story = {
  render: Card17_HeroCentered,
};

export const InfoViewMore: Story = {
  render: Card18_InfoViewMore,
};

export const PricingChooseShare: Story = {
  render: Card19_PricingChooseShare,
};

export const ListEventRow: Story = {
  render: Card20_ListEventRow,
};

export const CoverPlayBottomBar: Story = {
  render: Card21_CoverPlayBottomBar,
};

export const CoverAvatarGradientFooter: Story = {
  render: Card22_CoverAvatarGradientFooter,
};

export const InsetMediaProfileRow: Story = {
  render: Card23_InsetMediaProfileRow,
};

export const ReadingGradientFacepile: Story = {
  render: Card24_ReadingGradientFacepile,
};

export const HostSolidLocation: Story = {
  render: Card25_HostSolidLocation,
};

export const HostDenseAudience: Story = {
  render: Card26_HostDenseAudience,
};

export const CourseApply: Story = {
  render: Card27_CourseApply,
};

export const ProfileSheetFollow: Story = {
  render: Card28_ProfileSheetFollow,
};

export const CreatorChip: Story = {
  render: Card29_CreatorChip,
};

export const CoursePreviewStack: Story = {
  render: Card30_CoursePreviewStack,
};

export const CoursePreviewOverlap: Story = {
  render: Card31_CoursePreviewOverlap,
};

export const CoursePreviewTitleFirst: Story = {
  render: Card32_CoursePreviewTitleFirst,
};
