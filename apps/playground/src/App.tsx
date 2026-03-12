import { useState, type ReactNode } from "react";
import { ArrowRight, Plus, Heart, Send, Search, Download, Trash2, Share2, Settings } from "lucide-react";
import { Dialog } from "@acko/dialog";
import { ToastProvider, useToast } from "@acko/toast";
import { Slider } from "@acko/slider";
import { OtpInput } from "@acko/text-input";
import { Drawer } from "@acko/drawer";
import { Form, FormItem, FormMessage } from "@acko/form";
import { Button } from "@acko/button";
import { Badge, CounterBadge } from "@acko/badge";
import { RadioGroup } from "@acko/radio";
import { Checkbox } from "@acko/checkbox";
import { TextInput } from "@acko/text-input";
import { Breadcrumb } from "@acko/breadcrumb";
import { Dropdown } from "@acko/dropdown";
import { Calendar } from "@acko/calendar";
import type { DateRange } from "@acko/calendar";
import { Card, CardHeader, CardContent, CardFooter } from "@acko/card";
import { Typography } from "@acko/typography";
import { Alert } from "@acko/alert";
import { Progress } from "@acko/progress";
import { Switch } from "@acko/switch";
import { Separator } from "@acko/separator";
import { Field } from "@acko/field";
import { Textarea } from "@acko/textarea";
import { InputGroup } from "@acko/input-group";
import { ScrollArea } from "@acko/scroll-area";
import { Accordion } from "@acko/accordion";
import { Tabs } from "@acko/tabs";
import { Toggle, ToggleGroup, ToggleGroupItem } from "@acko/toggle";
import { Tooltip } from "@acko/tooltip";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@acko/table";
import { Avatar } from "@acko/avatar";
import { Skeleton } from "@acko/skeleton";
import { NavigationWizard } from "@acko/navigation-wizard";
import { Pagination } from "@acko/pagination";

type Theme = "light" | "dark";

const COMPONENT_LIST = [
  "Button",
  "Badge",
  "Alert",
  "Card",
  "Typography",
  "TextInput",
  "Textarea",
  "Dropdown",
  "Checkbox",
  "Radio",
  "Switch",
  "Toggle",
  "Tabs",
  "Tooltip",
  "Progress",
  "Separator",
  "Label & Field",
  "InputGroup",
  "Breadcrumb",
  "Accordion",
  "Calendar",
  "Table",
  "Avatar",
  "Skeleton",
  "NavigationWizard",
  "Pagination",
  "ScrollArea",
  "Dialog",
  "Drawer",
  "Toast",
  "Slider",
  "OtpInput",
  "Form",
] as const;

type ComponentName = (typeof COMPONENT_LIST)[number];

/* ═══════════════════════════════════════════════════════════════
   Mini icons
   ═══════════════════════════════════════════════════════════════ */

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const AlignLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" />
  </svg>
);
const AlignCenterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="10" x2="6" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="18" y1="18" x2="6" y2="18" />
  </svg>
);
const AlignRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" y1="10" x2="7" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="21" y1="18" x2="7" y2="18" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   Component Previews — isolated component showcase
   ═══════════════════════════════════════════════════════════════ */

function ButtonPreview() {
  const [loadingVariant, setLoadingVariant] = useState<string | null>(null);
  const simulateLoading = (variant: string) => {
    setLoadingVariant(variant);
    setTimeout(() => setLoadingVariant(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Variants */}
      <div>
        <Typography variant="label-sm" color="secondary">Variants</Typography>
        <div className="flex flex-wrap gap-3 mt-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="inverted">Inverted</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <Typography variant="label-sm" color="secondary">Sizes</Typography>
        <div className="flex flex-wrap gap-3 items-end mt-2">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Button key={s} variant="primary" size={s}>
              {s.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* With icons */}
      <div>
        <Typography variant="label-sm" color="secondary">With icons</Typography>
        <div className="flex flex-wrap gap-3 mt-2">
          <Button variant="primary" iconRight={<ArrowRight />}>Continue</Button>
          <Button variant="secondary" iconRight={<ArrowRight />}>Next step</Button>
          <Button variant="primary" iconLeft={<Send />}>Send</Button>
          <Button variant="ghost" iconLeft={<Download />}>Download</Button>
          <Button variant="danger" iconLeft={<Trash2 />}>Delete</Button>
          <Button variant="link" iconRight={<ArrowRight />}>Learn more</Button>
        </div>
      </div>

      {/* Icon-only */}
      <div>
        <Typography variant="label-sm" color="secondary">Icon-only</Typography>
        <div className="flex flex-wrap gap-3 items-end mt-2">
          <Button variant="primary" iconOnly size="xs" iconLeft={<Plus />}>+</Button>
          <Button variant="primary" iconOnly size="sm" iconLeft={<Heart />}>Like</Button>
          <Button variant="primary" iconOnly size="md" iconLeft={<Search />}>Search</Button>
          <Button variant="secondary" iconOnly size="md" iconLeft={<Settings />}>Settings</Button>
          <Button variant="ghost" iconOnly size="md" iconLeft={<Share2 />}>Share</Button>
          <Button variant="danger" iconOnly size="md" iconLeft={<Trash2 />}>Delete</Button>
          <Button variant="primary" iconOnly size="lg" iconLeft={<Plus />}>Add</Button>
          <Button variant="primary" iconOnly size="xl" iconLeft={<Plus />}>Add</Button>
        </div>
      </div>

      {/* Full width */}
      <div>
        <Typography variant="label-sm" color="secondary">Full width</Typography>
        <div className="flex flex-col gap-3 mt-2">
          <Button variant="primary" fullWidth iconRight={<ArrowRight />}>Get a quote</Button>
          <Button variant="secondary" fullWidth>Cancel</Button>
          <Button variant="ghost" fullWidth iconLeft={<Download />}>Download report</Button>
        </div>
      </div>

      {/* Loading states */}
      <div>
        <Typography variant="label-sm" color="secondary">Loading — click to test</Typography>
        <div className="flex flex-wrap gap-3 mt-2">
          {(["primary", "secondary", "inverted", "ghost", "danger"] as const).map((v) => (
            <Button
              key={v}
              variant={v}
              loading={loadingVariant === v}
              onClick={() => simulateLoading(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Disabled states */}
      <div>
        <Typography variant="label-sm" color="secondary">Disabled</Typography>
        <div className="flex flex-wrap gap-3 mt-2">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="link" disabled>Link</Button>
          <Button variant="danger" disabled>Danger</Button>
          <Button variant="primary" disabled iconOnly iconLeft={<Plus />}>Add</Button>
        </div>
      </div>
    </div>
  );
}

function ButtonUsage() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-4">
          <Typography variant="heading-md" color="primary">
            Confirm your policy
          </Typography>
          <Typography variant="body-sm" color="secondary">
            Review the details and proceed to payment.
          </Typography>
          <Button variant="primary" fullWidth iconRight={<ArrowRight />} loading={loading} onClick={handleClick}>
            {loading ? "Processing..." : "Proceed to pay"}
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth>
              Edit details
            </Button>
            <Button variant="ghost" fullWidth iconLeft={<Download />}>
              Download PDF
            </Button>
          </div>
          <div className="flex justify-between items-center pt-2">
            <Button variant="link" iconRight={<ArrowRight />}>
              Terms & conditions
            </Button>
            <Button variant="danger" size="sm" iconLeft={<Trash2 />}>
              Cancel policy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BadgePreview() {
  const solidLabels: Record<string, string> = {
    purple: "New", green: "Active", blue: "Info", orange: "Pending", pink: "Beta", gray: "Draft",
  };
  return (
    <div className="space-y-4">
      <Typography variant="label-sm" color="secondary">Solid — ALL CAPS (default)</Typography>
      <div className="flex flex-wrap gap-2">
        {(["purple", "green", "blue", "orange", "pink", "gray"] as const).map(
          (c) => (
            <Badge key={c} color={c} textCase="uppercase">
              {solidLabels[c]}
            </Badge>
          )
        )}
      </div>
      <Typography variant="label-sm" color="secondary">Outline — Title Case</Typography>
      <div className="flex flex-wrap gap-2">
        {(["purple", "green", "blue", "orange", "pink", "gray"] as const).map(
          (c) => (
            <Badge key={c} variant="outline" color={c} textCase="title">
              {solidLabels[c]}
            </Badge>
          )
        )}
      </div>
      <Typography variant="label-sm" color="secondary">Text case variants</Typography>
      <div className="flex flex-wrap gap-2 items-center">
        <Badge color="purple" textCase="uppercase">All Caps</Badge>
        <Badge color="blue" textCase="title">Title Case</Badge>
        <Badge color="green" textCase="sentence">Sentence case</Badge>
      </div>
      <Typography variant="label-sm" color="secondary">Dot & Removable — Title Case</Typography>
      <div className="flex flex-wrap gap-2 items-center">
        {(["purple", "green", "blue", "orange", "pink", "gray"] as const).map(
          (c) => (
            <Badge key={c} variant="dot" color={c} textCase="title">
              {solidLabels[c]}
            </Badge>
          )
        )}
        <Badge removable onRemove={() => {}} textCase="title">
          Removable
        </Badge>
      </div>
      <Typography variant="label-sm" color="secondary">Counter Badges</Typography>
      <div className="flex flex-wrap gap-2 items-center">
        <CounterBadge count={3} color="purple" />
        <CounterBadge count={42} color="pink" />
        <CounterBadge count={150} max={99} color="blue" />
      </div>
    </div>
  );
}

function BadgeUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Typography variant="heading-md" color="primary">
              Notifications
            </Typography>
            <CounterBadge count={3} color="purple" />
          </div>
          {[
            { label: "New Policy Issued", color: "green" as const, time: "2m ago" },
            { label: "Payment Pending", color: "orange" as const, time: "1h ago" },
            { label: "Claim Approved", color: "blue" as const, time: "3h ago" },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Badge variant="dot" color={n.color} textCase="title">
                  {n.label}
                </Badge>
              </div>
              <Typography variant="caption" color="secondary">
                {n.time}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AlertPreview() {
  return (
    <div className="space-y-3">
      <Alert variant="info" title="Policy updated">
        Your health insurance policy has been renewed.
      </Alert>
      <Alert variant="success" title="Payment received">
        ₹12,499 debited from your account.
      </Alert>
      <Alert variant="warning" title="Document pending">
        Upload your ID proof to complete verification.
      </Alert>
      <Alert variant="error" title="Claim rejected">
        Your claim #4821 was not approved.
      </Alert>
    </div>
  );
}

function AlertUsage() {
  const [visible, setVisible] = useState(true);
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Form Submission
          </Typography>
          {visible ? (
            <Alert
              variant="success"
              title="Saved!"
              dismissible
              onDismiss={() => setVisible(false)}
            >
              Your profile has been updated successfully.
            </Alert>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setVisible(true)}
            >
              Show Alert
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CardPreview() {
  return (
    <div className="space-y-4">
      {(["default", "elevated", "outline", "demoted"] as const).map((v) => (
        <Card key={v} variant={v} padding="sm">
          <CardContent>
            <Typography variant="label-md" color="primary">
              {v} card
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CardUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Typography variant="heading-md" color="primary">
            Premium Plan
          </Typography>
          <Badge color="orange" variant="solid" textCase="uppercase">
            Popular
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Typography variant="body-sm" color="secondary">
          Get comprehensive coverage with cashless claims at 8,400+ garages.
        </Typography>
        <div className="pt-3">
          <span className="text-2xl font-bold">₹4,835</span>
          <span className="text-sm text-text-muted">/year</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="primary" fullWidth>
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}

function TypographyPreview() {
  const specs = [
    { variant: "display-lg" as const, label: "Display LG", use: "Hero banners, landing page headlines" },
    { variant: "display-md" as const, label: "Display MD", use: "Feature section headers" },
    { variant: "heading-xl" as const, label: "Heading XL", use: "Page titles, major section headers" },
    { variant: "heading-lg" as const, label: "Heading LG", use: "Card headers, dialog titles" },
    { variant: "heading-md" as const, label: "Heading MD", use: "Sub-section titles, sidebar headers" },
    { variant: "heading-sm" as const, label: "Heading SM", use: "Widget titles, compact headers" },
    { variant: "body-lg" as const, label: "Body LG", use: "Lead paragraphs, featured descriptions" },
    { variant: "body-md" as const, label: "Body MD", use: "Default paragraph text, descriptions" },
    { variant: "body-sm" as const, label: "Body SM", use: "Secondary text, helper descriptions" },
    { variant: "label-lg" as const, label: "Label LG", use: "Form labels, prominent interactive text" },
    { variant: "label-md" as const, label: "Label MD", use: "Button labels, tab labels, navigation" },
    { variant: "label-sm" as const, label: "Label SM", use: "Small buttons, compact labels" },
    { variant: "caption" as const, label: "Caption", use: "Timestamps, footnotes, auxiliary info" },
    { variant: "overline" as const, label: "Overline", use: "Category tags, section dividers" },
  ];

  return (
    <div className="space-y-6">
      {/* Live examples */}
      <div className="space-y-4">
        <Typography variant="overline" color="secondary">LIVE EXAMPLES</Typography>
        <div className="space-y-1">
          <Typography variant="display-lg" color="primary">Insurance made simple</Typography>
          <Typography variant="body-lg" color="secondary">Protect what matters most with coverage that fits your life.</Typography>
        </div>
        <Separator />
        <div className="space-y-1">
          <Typography variant="heading-xl" color="primary">Your Dashboard</Typography>
          <Typography variant="body-md" color="primary">Welcome back, Priya. Here's your policy overview.</Typography>
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          <Typography variant="label-lg" color="primary">Status:</Typography>
          <Badge color="green" variant="solid" textCase="uppercase">Active</Badge>
          <Typography variant="caption" color="secondary">Updated 2 hours ago</Typography>
        </div>
      </div>

      {/* Spec reference */}
      <div>
        <Typography variant="overline" color="secondary">SPEC REFERENCE</Typography>
        <div className="mt-3 space-y-3">
          {specs.map((s) => (
            <div key={s.variant} className="flex items-baseline gap-4">
              <div className="w-40 shrink-0">
                <Typography variant={s.variant} color="primary">
                  Ag
                </Typography>
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="label-sm" color="primary">{s.label}</Typography>
                <Typography variant="caption" color="secondary">{s.use}</Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypographyUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <Typography variant="overline" color="secondary">
          INSURANCE
        </Typography>
        <Typography variant="heading-xl" color="primary">
          Protect What Matters
        </Typography>
        <Typography variant="body-md" color="secondary">
          Simple, affordable insurance for everyone. No paperwork, no hassle.
        </Typography>
        <div className="pt-2">
          <Button variant="primary">
            Get Started
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TextInputPreview() {
  const [v, setV] = useState("");
  return (
    <div className="space-y-3">
      <TextInput label="Default" placeholder="Type here..." value={v} onChange={setV} />
      <TextInput label="Error" value="bad@" onChange={() => {}} state="error" errorText="Invalid email" />
      <TextInput label="Success" value="user@acko.com" onChange={() => {}} state="success" />
      <TextInput label="Disabled" value="Locked" onChange={() => {}} disabled />
    </div>
  );
}

function TextInputUsage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Login
          </Typography>
          <TextInput label="Email" placeholder="you@example.com" value={email} onChange={setEmail} />
          <TextInput label="Password" type="password" placeholder="••••••••" value={pass} onChange={setPass} />
          <Button variant="primary" fullWidth>
            Sign In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TextareaPreview() {
  const [v, setV] = useState("");
  return (
    <div className="space-y-3">
      <Textarea label="Message" placeholder="Write here..." value={v} onChange={setV} maxLength={200} showCount />
      <Textarea label="Error" value="" onChange={() => {}} state="error" errorText="Required" />
      <Textarea label="Disabled" value="Read only" onChange={() => {}} disabled />
    </div>
  );
}

function TextareaUsage() {
  const [msg, setMsg] = useState("");
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Leave Feedback
          </Typography>
          <Textarea label="Your feedback" placeholder="Tell us how we can improve..." value={msg} onChange={setMsg} maxLength={500} showCount helperText="We read every message" />
          <Button variant="primary">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DropdownPreview() {
  const [v, setV] = useState("");
  const [multi, setMulti] = useState<string[]>([]);
  return (
    <div className="space-y-3">
      <Dropdown label="City" placeholder="Select..." options={[{ value: "mum", label: "Mumbai" }, { value: "del", label: "Delhi" }, { value: "blr", label: "Bangalore" }]} value={v} onChange={(val: string | string[]) => setV(val as string)} />
      <Dropdown label="Languages" variant="multi" placeholder="Select..." options={[{ value: "en", label: "English" }, { value: "hi", label: "Hindi" }, { value: "mr", label: "Marathi" }]} value={multi} onChange={(val: string | string[]) => setMulti(val as string[])} />
      <Dropdown label="Disabled" disabled options={[{ value: "a", label: "Option" }]} value="" onChange={() => {}} />
    </div>
  );
}

function DropdownUsage() {
  const [city, setCity] = useState("");
  const [make, setMake] = useState("");
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Vehicle Info
          </Typography>
          <Dropdown label="Car Make" placeholder="Select make" options={[{ value: "maruti", label: "Maruti Suzuki" }, { value: "hyundai", label: "Hyundai" }, { value: "tata", label: "Tata Motors" }]} value={make} onChange={(v: string | string[]) => setMake(v as string)} />
          <Dropdown label="City" placeholder="Select city" variant="searchable" options={[{ value: "mum", label: "Mumbai" }, { value: "del", label: "Delhi" }, { value: "blr", label: "Bangalore" }, { value: "pun", label: "Pune" }]} value={city} onChange={(v: string | string[]) => setCity(v as string)} />
        </div>
      </CardContent>
    </Card>
  );
}

function CheckboxPreview() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  return (
    <div className="flex flex-col gap-5">
      <div className="pb-4 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-3)" }}>Interactive states</Typography>
        <div className="flex flex-col gap-4">
          <Checkbox label="Unchecked" checked={a} onChange={setA} />
          <Checkbox label="Checked" checked={b} onChange={setB} />
          <Checkbox label="Indeterminate" checked={false} indeterminate onChange={() => {}} />
        </div>
      </div>
      <div>
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-3)" }}>Disabled & Error</Typography>
        <div className="flex flex-col gap-4">
          <Checkbox label="Disabled" checked={false} onChange={() => {}} disabled />
          <Checkbox label="Error state" checked={false} onChange={() => {}} error />
        </div>
      </div>
    </div>
  );
}

function CheckboxUsage() {
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(true);
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Preferences
          </Typography>
          <Checkbox label="I agree to terms and conditions" description="Required to continue" checked={terms} onChange={setTerms} />
          <Checkbox label="Send me promotional emails" checked={marketing} onChange={setMarketing} />
          <Button variant="primary" disabled={!terms}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function RadioPreview() {
  const [v, setV] = useState("a");
  return (
    <div className="space-y-4">
      <RadioGroup label="Default" options={[{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }, { value: "c", label: "Option C", disabled: true }]} value={v} onChange={setV} />
      <RadioGroup label="Card variant" variant="card" options={[{ value: "a", label: "Basic", description: "Free" }, { value: "b", label: "Pro", description: "$9/mo" }]} value={v} onChange={setV} />
    </div>
  );
}

function RadioUsage() {
  const [plan, setPlan] = useState("comp");
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Choose Plan
          </Typography>
          <RadioGroup label="Insurance Type" options={[{ value: "tp", label: "Third Party", description: "₹2,094/yr" }, { value: "comp", label: "Comprehensive", description: "₹4,835/yr" }, { value: "od", label: "Own Damage", description: "₹3,200/yr" }]} value={plan} onChange={setPlan} variant="card" />
        </div>
      </CardContent>
    </Card>
  );
}

function SwitchPreview() {
  const [on, setOn] = useState(false);
  const [sm, setSm] = useState(true);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between py-2 border-b border-border-subtle">
        <div>
          <Typography variant="label-md" color="primary">Default</Typography>
          <Typography variant="caption" color="secondary">Medium size, click to toggle</Typography>
        </div>
        <Switch label="Default" checked={on} onChange={setOn} />
      </div>
      <div className="flex items-center justify-between py-2 border-b border-border-subtle">
        <div>
          <Typography variant="label-md" color="primary">Small</Typography>
          <Typography variant="caption" color="secondary">Compact variant</Typography>
        </div>
        <Switch label="Small" size="sm" checked={sm} onChange={setSm} />
      </div>
      <div className="flex items-center justify-between py-2">
        <div>
          <Typography variant="label-md" color="primary">Disabled</Typography>
          <Typography variant="caption" color="secondary">Non-interactive state</Typography>
        </div>
        <Switch label="Disabled" disabled />
      </div>
    </div>
  );
}

function SwitchUsage() {
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Settings
          </Typography>
          <div className="flex items-center justify-between">
            <Typography variant="body-sm" color="primary">
              Push notifications
            </Typography>
            <Switch checked={notif} onChange={setNotif} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Typography variant="body-sm" color="primary">
              Dark mode
            </Typography>
            <Switch checked={dark} onChange={setDark} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TogglePreview() {
  const [v, setV] = useState("center");
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Toggle pressed={false} onPressedChange={() => {}}>
          Default
        </Toggle>
        <Toggle pressed onPressedChange={() => {}}>
          Pressed
        </Toggle>
        <Toggle variant="outline" pressed={false} onPressedChange={() => {}}>
          Outline
        </Toggle>
        <Toggle variant="outline" pressed onPressedChange={() => {}}>
          Outline Pressed
        </Toggle>
        <Toggle disabled>Disabled</Toggle>
      </div>
      <ToggleGroup type="single" value={v} onValueChange={(val: string | string[]) => setV(val as string)} variant="outline">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

function ToggleUsage() {
  const [align, setAlign] = useState("left");
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Text Alignment
          </Typography>
          <ToggleGroup type="single" value={align} onValueChange={(val: string | string[]) => setAlign(val as string)} variant="outline">
            <ToggleGroupItem value="left">
              <AlignLeftIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
              <AlignCenterIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
              <AlignRightIcon />
            </ToggleGroupItem>
          </ToggleGroup>
          <Typography
            variant="body-sm"
            color="secondary"
            align={align as "left" | "center" | "right"}
          >
            This text follows the selected alignment. Try clicking the buttons
            above to see it change.
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

function TabsPreview() {
  const [v, setV] = useState("tab1");
  return (
    <div className="space-y-6">
      {/* Underline - bottom indicator */}
      <div>
        <Typography variant="label-sm" color="secondary">Underline (bottom)</Typography>
        <Tabs
          items={[
            { value: "tab1", label: "Overview", icon: <HomeIcon /> },
            { value: "tab2", label: "Features", icon: <StarIcon /> },
            { value: "tab3", label: "Pricing" },
            { value: "tab4", label: "Disabled", disabled: true },
          ]}
          value={v}
          onChange={setV}
          variant="underline"
        />
      </div>

      {/* Underline - top indicator */}
      <div>
        <Typography variant="label-sm" color="secondary">Underline (top)</Typography>
        <Tabs
          items={[
            { value: "tab1", label: "Overview" },
            { value: "tab2", label: "Features" },
            { value: "tab3", label: "Pricing" },
          ]}
          value={v}
          onChange={setV}
          variant="underline"
          indicatorPosition="top"
        />
      </div>

      {/* Pill - hugging */}
      <div>
        <Typography variant="label-sm" color="secondary">Pill (fit-content)</Typography>
        <Tabs
          items={[
            { value: "tab1", label: "Monthly", icon: <StarIcon /> },
            { value: "tab2", label: "Yearly" },
          ]}
          value={v}
          onChange={setV}
          variant="pill"
        />
      </div>

      {/* Navigation */}
      <div>
        <Typography variant="label-sm" color="secondary">Navigation (bottom tabs)</Typography>
        <Tabs
          items={[
            { value: "tab1", label: "Home", icon: <HomeIcon /> },
            { value: "tab2", label: "Search", icon: <SearchIcon /> },
            { value: "tab3", label: "Profile", icon: <UserIcon /> },
            { value: "tab4", label: "Settings", icon: <SettingsIcon /> },
          ]}
          value={v}
          onChange={setV}
          variant="navigation"
        />
      </div>
    </div>
  );
}

function TabsUsage() {
  const [tab, setTab] = useState("details");
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Tabs items={[{ value: "details", label: "Details" }, { value: "claims", label: "Claims" }, { value: "docs", label: "Documents" }]} value={tab} onChange={setTab} variant="underline" />
          <div className="pt-2">
            {tab === "details" && (
              <Typography variant="body-sm" color="secondary">
                Policy #POL-2024-001 — Comprehensive car insurance.
              </Typography>
            )}
            {tab === "claims" && (
              <Typography variant="body-sm" color="secondary">
                No claims filed yet.
              </Typography>
            )}
            {tab === "docs" && (
              <Typography variant="body-sm" color="secondary">
                Policy document, ID proof uploaded.
              </Typography>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TooltipPreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="secondary">
          Top
        </Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="secondary">
          Bottom
        </Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button variant="secondary">
          Left
        </Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="secondary">
          Right
        </Button>
      </Tooltip>
    </div>
  );
}

function TooltipUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Action Toolbar
          </Typography>
          <div className="flex gap-2">
            <Tooltip content="Edit profile">
              <Button variant="secondary">
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Download report">
              <Button variant="secondary">
                <DownloadIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Delete item">
              <Button variant="danger">
                <TrashIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressPreview() {
  return (
    <div className="space-y-6">
      {/* Bar variants */}
      <div className="space-y-4">
        <Typography variant="label-sm" color="secondary">Bar</Typography>
        <Progress value={30} color="primary" size="sm" label="Small" showLabel />
        <Progress value={65} color="primary" size="md" label="Medium" showLabel animated />
        <Progress value={100} color="success" size="lg" label="Complete" showLabel />
        <Progress value={40} color="error" size="md" showLabel />
      </div>

      {/* Circular variants */}
      <div>
        <Typography variant="label-sm" color="secondary">Circular</Typography>
        <div className="flex items-end gap-6 mt-2">
          <Progress variant="circular" value={75} size="sm" showLabel />
          <Progress variant="circular" value={60} size="md" color="success" showLabel />
          <Progress variant="circular" value={85} size="lg" color="primary">
            <Avatar initials="PS" size="lg" shape="circle" />
          </Progress>
        </div>
      </div>

      {/* Segmented */}
      <div>
        <Typography variant="label-sm" color="secondary">Segmented</Typography>
        <div className="mt-2 space-y-3">
          <Progress variant="segmented" value={40} segments={5} size="md" label="Step 2 of 5" showLabel />
          <Progress variant="segmented" value={75} segments={4} size="lg" color="success" />
        </div>
      </div>
    </div>
  );
}

function ProgressUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Profile Completion
          </Typography>
          <div className="flex items-center gap-4">
            <Progress variant="circular" value={72} size="lg" color="primary">
              <Avatar initials="PS" size="md" shape="circle" />
            </Progress>
            <div>
              <Typography variant="label-md" color="primary">Priya Sharma</Typography>
              <Typography variant="caption" color="secondary">72% complete — add a photo to finish</Typography>
            </div>
          </div>
          <Separator />
          <Typography variant="label-sm" color="secondary">Onboarding Progress</Typography>
          <Progress variant="segmented" value={60} segments={5} size="md" label="Step 3 of 5" showLabel />
        </div>
      </CardContent>
    </Card>
  );
}

function SeparatorPreview() {
  return (
    <div className="space-y-4">
      <Separator />
      <Separator label="OR" />
      <div className="flex items-center gap-4 h-8">
        <span className="text-sm text-text-muted">Left</span>
        <Separator orientation="vertical" />
        <span className="text-sm text-text-muted">Right</span>
      </div>
    </div>
  );
}

function SeparatorUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Button variant="primary" fullWidth>
            Sign in with Google
          </Button>
          <Separator label="OR" />
          <Button variant="secondary" fullWidth>
            Sign in with Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function LabelFieldPreview() {
  const [username, setUsername] = useState("johndoe");
  const [password, setPassword] = useState("short");
  return (
    <div className="space-y-4">
      <Typography variant="label-md" color="secondary">Default with helper text</Typography>
      <TextInput
        label="Username"
        required
        placeholder="johndoe"
        value={username}
        onChange={setUsername}
        helperText="Choose a unique username"
      />
      <Typography variant="label-md" color="secondary">Error state</Typography>
      <TextInput
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        state="error"
        errorText="Must be 8+ characters"
      />
      <Typography variant="label-md" color="secondary">Disabled state</Typography>
      <TextInput
        label="Disabled field"
        value="Cannot edit"
        onChange={() => {}}
        disabled
      />
    </div>
  );
}

function LabelFieldUsage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Registration
          </Typography>
          <TextInput
            label="Full Name"
            required
            placeholder="John Doe"
            value={name}
            onChange={setName}
          />
          <TextInput
            label="Email"
            required
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
            helperText="We'll never share it"
          />
          <Button variant="primary" fullWidth>Register</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function InputGroupPreview() {
  return (
    <div className="space-y-3">
      <InputGroup prefix="https://" suffix=".com" size="md">
        <input className="acko-input-group-input" placeholder="yoursite" />
      </InputGroup>
      <InputGroup prefix="$" size="lg">
        <input className="acko-input-group-input" placeholder="0.00" type="number" />
      </InputGroup>
      <InputGroup prefix="@" size="sm" error>
        <input className="acko-input-group-input" placeholder="username" />
      </InputGroup>
    </div>
  );
}

function InputGroupUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Payment
          </Typography>
          <Field label="Amount">
            <InputGroup prefix="₹">
              <input
                className="acko-input-group-input"
                placeholder="4,835"
                type="number"
              />
            </InputGroup>
          </Field>
          <Button variant="primary">
            Pay Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BreadcrumbPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="pb-5 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-3)" }}>Default</Typography>
        <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Insurance", href: "#" }, { label: "Car Insurance" }]} />
      </div>

      <div className="pb-5 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-3)" }}>With icon</Typography>
        <Breadcrumb items={[{ label: "Home", href: "#", icon: <HomeIcon /> }, { label: "Products", href: "#" }, { label: "Health Insurance" }]} />
      </div>

      <div className="pb-5 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-3)" }}>Custom separator (/)</Typography>
        <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Policies", href: "#" }, { label: "POL-2024-001" }]} separator="/" />
      </div>

      <div className="pb-5 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-3)" }}>Collapsed (6 items → 3)</Typography>
        <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Products", href: "#" }, { label: "Health", href: "#" }, { label: "Plans", href: "#" }, { label: "Premium", href: "#" }, { label: "Checkout" }]} maxItems={3} />
      </div>

      <div>
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-3)" }}>Contained</Typography>
        <div style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-xl)", padding: "var(--space-3) var(--space-4)", display: "inline-block" }}>
          <Breadcrumb items={[{ label: "Dashboard", href: "#", icon: <HomeIcon /> }, { label: "Settings", href: "#" }, { label: "Account" }]} />
        </div>
      </div>
    </div>
  );
}

function BreadcrumbUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Breadcrumb items={[{ label: "Dashboard", href: "#" }, { label: "Policies", href: "#" }, { label: "POL-2024-001" }]} />
          <Typography variant="heading-md" color="primary">
            Policy Details
          </Typography>
          <Typography variant="body-sm" color="secondary">
            Comprehensive Car Insurance — Active
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

function AccordionPreview() {
  return (
    <Accordion
      type="single"
      collapsible
      items={[
        { value: "q1", trigger: "What is car insurance?", content: "Car insurance protects you from financial loss due to accidents, theft, or damage." },
        { value: "q2", trigger: "How to file a claim?", content: "Upload photos from the app and our team will guide you." },
        { value: "q3", trigger: "Disabled item", content: "N/A", disabled: true },
      ]}
    />
  );
}

function AccordionUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            FAQ
          </Typography>
          <Accordion
            type="single"
            collapsible
            items={[
              { value: "1", trigger: "Is there a waiting period?", content: "No. Your policy is active immediately." },
              { value: "2", trigger: "Can I cancel anytime?", content: "Yes, you can cancel with a pro-rata refund." },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function CalendarPreview() {
  const [d, setD] = useState<Date>(new Date());
  return (
    <div className="space-y-4">
      <div>
        <Typography variant="label-sm" color="secondary">
          Dropdown
        </Typography>
        <Calendar variant="single" display="dropdown" value={d} onChange={(v: Date | DateRange | Date[]) => setD(v as Date)} />
      </div>
      <div>
        <Typography variant="label-sm" color="secondary">
          Inline
        </Typography>
        <Calendar variant="single" display="inline" value={d} onChange={(v: Date | DateRange | Date[]) => setD(v as Date)} />
      </div>
    </div>
  );
}

function CalendarUsage() {
  const [d, setD] = useState<Date>(new Date(Date.now() + 86400000));
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Policy Start Date
          </Typography>
          <Calendar variant="single" display="dropdown" value={d} onChange={(v: Date | DateRange | Date[]) => setD(v as Date)} minDate={new Date()} />
          <Button variant="primary">
            Confirm Date
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TablePreview() {
  return (
    <Table striped hoverable>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { id: "POL-001", name: "Priya", status: "Active" },
          { id: "POL-002", name: "Rahul", status: "Pending" },
          { id: "POL-003", name: "Anita", status: "Expired" },
        ].map((r) => (
          <TableRow key={r.id}>
            <TableCell>{r.id}</TableCell>
            <TableCell>{r.name}</TableCell>
            <TableCell>
              <Badge color={r.status === "Active" ? "green" : r.status === "Pending" ? "orange" : "gray"} variant="solid" textCase="uppercase">
                {r.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TableUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Typography variant="heading-md" color="primary">
              Recent Policies
            </Typography>
            <Button variant="secondary">
              Export
            </Button>
          </div>
          <Table striped hoverable>
            <TableHeader>
              <TableRow>
                <TableHead>Policy</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Comprehensive</TableCell>
                <TableCell>₹4,835</TableCell>
                <TableCell>
                  <Badge color="green" variant="solid" textCase="uppercase">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Third Party</TableCell>
                <TableCell>₹2,094</TableCell>
                <TableCell>
                  <Badge color="orange" variant="solid" textCase="uppercase">Pending</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function AvatarPreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
          <Avatar key={s} initials="AF" size={s} />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Avatar initials="AB" size="lg" shape="circle" />
        <Avatar initials="CD" size="lg" shape="square" />
        <Avatar size="lg" />
      </div>
    </div>
  );
}

function AvatarUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Team Members
          </Typography>
          {[
            { name: "Priya Sharma", role: "Product Lead" },
            { name: "Rahul Menon", role: "Engineer" },
            { name: "Anita Desai", role: "Designer" },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <Avatar initials={m.name.split(" ").map((w) => w[0]).join("")} size="md" />
              <div>
                <Typography variant="label-md" color="primary">{m.name}</Typography>
                <Typography variant="caption" color="secondary">{m.role}</Typography>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonPreview() {
  return (
    <div className="space-y-4">
      <Skeleton variant="text" lines={3} />
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" />
        <div className="flex-1">
          <Skeleton variant="text" />
          <div className="mt-2">
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      </div>
      <Skeleton variant="rounded" width="100%" height={80} animation="wave" />
    </div>
  );
}

function SkeletonUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Loading State
          </Typography>
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="30%" />
            </div>
          </div>
          <Skeleton variant="rounded" width="100%" height={120} animation="wave" />
          <div className="flex gap-3">
            <Skeleton variant="rounded" width={80} height={36} />
            <Skeleton variant="rounded" width={80} height={36} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NavigationWizardPreview() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex flex-col gap-8">
      {/* Horizontal */}
      <div className="pb-6 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-4)" }}>Horizontal</Typography>
        <NavigationWizard
          steps={[
            { label: "Details", description: "Your info" },
            { label: "Review", description: "Check details" },
            { label: "Payment", description: "Pay now" },
            { label: "Done" },
          ]}
          currentStep={step}
          onStepClick={setStep}
        />
        <div className="flex gap-3 mt-4">
          <Button variant="secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Back
          </Button>
          <Button variant="primary" onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3}>
            Next
          </Button>
        </div>
      </div>

      {/* Vertical */}
      <div className="pb-6 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-4)" }}>Vertical</Typography>
        <NavigationWizard
          steps={[
            { label: "Personal Info", description: "Name, email, phone" },
            { label: "Vehicle Details", description: "Make, model, year" },
            { label: "Choose Plan" },
            { label: "Payment" },
          ]}
          currentStep={2}
          variant="vertical"
        />
      </div>

      {/* Compact */}
      <div>
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-4)" }}>Compact</Typography>
        <NavigationWizard
          steps={[{ label: "Details" }, { label: "Review" }, { label: "Payment" }, { label: "Done" }]}
          currentStep={step}
          variant="compact"
        />
      </div>
    </div>
  );
}

function NavigationWizardUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <NavigationWizard
            steps={[{ label: "Vehicle" }, { label: "Owner" }, { label: "Plan" }, { label: "Pay" }]}
            currentStep={2}
          />
          <Typography variant="body-sm" color="secondary">
            Step 3 of 4 — Choose your insurance plan
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

function PaginationPreview() {
  const [p, setP] = useState(3);
  return (
    <div className="space-y-4">
      <div>
        <Typography variant="label-sm" color="secondary">
          Numbered
        </Typography>
        <Pagination totalPages={20} currentPage={p} onPageChange={setP} showInfo />
      </div>
      <div>
        <Typography variant="label-sm" color="secondary">
          Simple
        </Typography>
        <Pagination totalPages={20} currentPage={p} onPageChange={setP} variant="simple" />
      </div>
    </div>
  );
}

function PaginationUsage() {
  const [p, setP] = useState(1);
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Search Results
          </Typography>
          <Typography variant="body-sm" color="secondary">
            Showing 1-10 of 200 policies
          </Typography>
          <Pagination totalPages={20} currentPage={p} onPageChange={setP} showInfo />
        </div>
      </CardContent>
    </Card>
  );
}

function ScrollAreaPreview() {
  return (
    <ScrollArea maxHeight={120} className="border border-border-subtle rounded-2xl p-3">
      {Array.from({ length: 15 }, (_, i) => (
        <p key={i} className="text-sm text-text-muted py-0.5">
          Scrollable item {i + 1}
        </p>
      ))}
    </ScrollArea>
  );
}

function ScrollAreaUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">
            Activity Log
          </Typography>
          <ScrollArea maxHeight={140} className="border border-border-subtle rounded-xl p-3">
            {[
              "Policy renewed — 2 min ago",
              "Payment received — 1 hr ago",
              "Claim submitted — 3 hrs ago",
              "Document uploaded — 5 hrs ago",
              "Profile updated — 1 day ago",
              "Password changed — 2 days ago",
              "New login — 3 days ago",
              "Policy created — 1 week ago",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 text-sm text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Phase 1 — Dialog
   ═══════════════════════════════════════════════════════════════ */
function DialogPreview() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary" onClick={() => setOpen(true)}>
              Open Dialog
            </Button>
            <Button variant="secondary" onClick={() => setConfirmOpen(true)}>
              Confirm Dialog
            </Button>
          </div>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            title="Dialog title"
            description="This is a supporting description for the dialog."
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
              </>
            }
          >
            <p className="text-sm text-text-muted">
              This is the dialog body content. You can place any content here — forms, text, lists, or media.
            </p>
          </Dialog>
          <Dialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Delete policy?"
            size="sm"
            footer={
              <>
                <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => setConfirmOpen(false)}>Delete</Button>
              </>
            }
          >
            <p className="text-sm text-text-muted">
              This action cannot be undone. Are you sure you want to delete this policy?
            </p>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

function DialogUsage() {
  const [open, setOpen] = useState(false);
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">Policy update</Typography>
          <Typography variant="body-sm" color="secondary">
            Review your auto insurance renewal before it expires.
          </Typography>
          <Button variant="primary" onClick={() => setOpen(true)}>
            View renewal details
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            title="Policy renewal"
            description="Your policy expires on 15 April 2026."
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>Remind later</Button>
                <Button variant="primary" onClick={() => setOpen(false)}>Renew now</Button>
              </>
            }
          >
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border-subtle">
                <span className="text-text-muted">Policy number</span>
                <span className="font-medium text-text-strong">ACKO-2024-AUTO-88742</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border-subtle">
                <span className="text-text-muted">Vehicle</span>
                <span className="font-medium text-text-strong">Honda City — MH 02 AB 1234</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-text-muted">Premium</span>
                <span className="font-medium text-text-strong">₹ 8,420 / year</span>
              </div>
            </div>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Phase 1 — Drawer
   ═══════════════════════════════════════════════════════════════ */
function DrawerPreview() {
  const [side, setSide] = useState<"right" | "bottom" | "left">("right");
  const [open, setOpen] = useState(false);
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Button
              fullWidth
              variant={side === "right" ? "primary" : "secondary"}
              onClick={() => { setSide("right"); setOpen(true); }}
            >
              Open Right
            </Button>
            <Button
              fullWidth
              variant={side === "left" ? "primary" : "secondary"}
              onClick={() => { setSide("left"); setOpen(true); }}
            >
              Open Left
            </Button>
            <Button
              variant={side === "bottom" ? "primary" : "secondary"}
              onClick={() => { setSide("bottom"); setOpen(true); }}
            >
              Open Bottom
            </Button>
          </div>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            side={side}
            title="Drawer panel"
            description="Supporting description text."
            footer={
              <Button variant="primary" onClick={() => setOpen(false)}>
                Done
              </Button>
            }
          >
            <p className="text-sm text-text-muted">
              Drawer content area. Useful for side panels, filters, detail views.
            </p>
          </Drawer>
        </div>
      </CardContent>
    </Card>
  );
}

function DrawerUsage() {
  const [open, setOpen] = useState(false);
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">Claims history</Typography>
          <Typography variant="body-sm" color="secondary">
            View your full claim details in a side panel.
          </Typography>
          <Button variant="secondary" onClick={() => setOpen(true)}>
            View claim #4821
          </Button>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            side="right"
            title="Claim #4821"
            description="Filed on 10 Jan 2026"
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>
                <Button variant="primary">Track status</Button>
              </>
            }
          >
            <div className="space-y-3 text-sm">
              {[
                ["Type", "Cashless hospitalisation"],
                ["Hospital", "Apollo Hospitals, Mumbai"],
                ["Amount", "₹ 42,000"],
                ["Status", "Under review"],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border-subtle last:border-0">
                  <span className="text-text-muted">{label}</span>
                  <span className="font-medium text-text-strong">{val}</span>
                </div>
              ))}
            </div>
          </Drawer>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Phase 1 — Toast (wrapped with provider in App)
   ═══════════════════════════════════════════════════════════════ */
function ToastTriggers() {
  const { toast } = useToast();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        {(["success", "error", "warning", "info"] as const).map((v) => (
          <Button
            key={v}
            variant="secondary"
            onClick={() =>
              toast({
                variant: v,
                title: v.charAt(0).toUpperCase() + v.slice(1),
                description: `This is a ${v} notification message.`,
                dismissible: true,
              })
            }
          >
            {v}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        onClick={() =>
          toast({
            variant: "success",
            title: "Payment successful",
            description: "₹ 8,420 paid for policy renewal.",
            action: { label: "View receipt", onClick: () => {} },
          })
        }
      >
        Toast with action
      </Button>
    </div>
  );
}

function ToastPreview() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <ToastTriggers />
      </CardContent>
    </Card>
  );
}

function ToastUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="primary">Notifications</Typography>
          <Typography variant="body-sm" color="secondary">
            Toasts appear at the top-right and auto-dismiss after 4 seconds.
          </Typography>
          <ToastTriggers />
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Phase 1 — Slider
   ═══════════════════════════════════════════════════════════════ */
function SliderPreview() {
  const [val, setVal] = useState(40);
  const [range, setRange] = useState(25);
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3 pb-6 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary">Default — value: {val}</Typography>
        <Slider value={val} onChange={setVal} showValue />
      </div>
      <div className="space-y-3 pb-6 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary">With ticks — step 10</Typography>
        <Slider value={range} onChange={setRange} step={10} showTicks showValue />
      </div>
      <div className="space-y-3 pb-6 border-b border-border-subtle">
        <Typography variant="label-sm" color="secondary">Disabled</Typography>
        <Slider value={65} onChange={() => {}} disabled />
      </div>
      <div>
        <Typography variant="label-sm" color="secondary" style={{ marginBottom: "var(--space-4)" }}>Size variants</Typography>
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <Typography variant="caption" color="secondary">Small</Typography>
            <Slider value={50} onChange={() => {}} size="sm" />
          </div>
          <div className="space-y-1">
            <Typography variant="caption" color="secondary">Medium</Typography>
            <Slider value={50} onChange={() => {}} size="md" />
          </div>
          <div className="space-y-1">
            <Typography variant="caption" color="secondary">Large</Typography>
            <Slider value={50} onChange={() => {}} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderUsage() {
  const [cover, setCover] = useState(5);
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-4">
          <Typography variant="heading-md" color="primary">Health coverage</Typography>
          <Typography variant="body-sm" color="secondary">
            Select your sum insured amount.
          </Typography>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Coverage amount</span>
              <span className="font-semibold text-primary">₹ {cover} Lakh</span>
            </div>
            <Slider value={cover} onChange={setCover} min={1} max={100} step={1} size="md" aria-label="Coverage amount in lakhs" />
            <div className="flex justify-between text-xs text-text-muted">
              <span>₹ 1L</span>
              <span>₹ 100L</span>
            </div>
          </div>
          <Button variant="primary" fullWidth>
            Get quote for ₹ {cover}L cover
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Phase 1 — OTP Input
   ═══════════════════════════════════════════════════════════════ */
function OtpInputPreview() {
  const [otp, setOtp] = useState("");
  const [errorOtp, setErrorOtp] = useState("");
  const [showError, setShowError] = useState(false);
  const [maskedOtp, setMaskedOtp] = useState("");
  const [smOtp, setSmOtp] = useState("");
  const [mdOtp, setMdOtp] = useState("");
  const [lgOtp, setLgOtp] = useState("");

  const handleErrorTest = (val: string) => {
    setErrorOtp(val);
    if (val.length === 4) {
      if (val !== "1234") {
        setShowError(true);
      } else {
        setShowError(false);
      }
    } else {
      setShowError(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Typography variant="label-sm" color="secondary">Default (6 digits) — type to test</Typography>
        <OtpInput value={otp} onChange={setOtp} length={6} />
      </div>
      <div className="space-y-2">
        <Typography variant="label-sm" color="secondary">Error test — enter any 4 digits (type "1234" to clear error)</Typography>
        <OtpInput value={errorOtp} onChange={handleErrorTest} length={4} error={showError} />
        {showError && (
          <Typography variant="body-sm" color="error">Invalid code — try "1234"</Typography>
        )}
      </div>
      <div className="space-y-2">
        <Typography variant="label-sm" color="secondary">4-digit masked</Typography>
        <OtpInput value={maskedOtp} onChange={setMaskedOtp} length={4} masked />
      </div>
      <div className="space-y-3">
        <Typography variant="label-sm" color="secondary">Sizes — sm (12px radius) / md (16px radius) / lg (20px radius)</Typography>
        <OtpInput value={smOtp} onChange={setSmOtp} length={4} size="sm" />
        <OtpInput value={mdOtp} onChange={setMdOtp} length={4} size="md" />
        <OtpInput value={lgOtp} onChange={setLgOtp} length={4} size="lg" />
      </div>
    </div>
  );
}

function OtpInputUsage() {
  const [otp, setOtp] = useState("");
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-4">
          <Typography variant="heading-md" color="primary">Verify your mobile</Typography>
          <Typography variant="body-sm" color="secondary">
            Enter the 4-digit OTP sent to +91 98765 43210
          </Typography>
          <OtpInput value={otp} onChange={setOtp} length={4} aria-label="Mobile verification OTP" />
          {otp.length === 4 && (
            <Button variant="primary" fullWidth>
              Verify OTP
            </Button>
          )}
          {otp.length < 4 && (
            <Button variant="ghost" fullWidth disabled>
              Verify OTP
            </Button>
          )}
          <Typography variant="caption" color="secondary" style={{ textAlign: "center" }}>
            Didn&apos;t receive? <span style={{ color: "var(--color-primary)", cursor: "pointer" }}>Resend in 28s</span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Phase 1 — Form
   ═══════════════════════════════════════════════════════════════ */
function FormPreview() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col gap-4">
      <Form onSubmit={() => new Promise((r) => setTimeout(() => { setSubmitted(true); r(undefined); }, 800))}>
        <FormItem name="name">
          <TextInput label="Full name" value={name} onChange={setName} id="demo-name" placeholder="Enter your full name" required />
        </FormItem>
        <FormItem name="email">
          <TextInput label="Email address" value={email} onChange={setEmail} id="demo-email" type="email" placeholder="you@example.com" required />
          <FormMessage>We will never share your email.</FormMessage>
        </FormItem>
        <Button variant="primary" type="submit">
          {submitted ? "Submitted!" : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

function FormUsage() {
  const [vehicle, setVehicle] = useState("");
  const [pincode, setPincode] = useState("");
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-4">
          <Typography variant="heading-md" color="primary">Get a quote</Typography>
          <Form onSubmit={() => Promise.resolve()}>
            <FormItem name="vehicle">
              <TextInput label="Vehicle number" value={vehicle} onChange={setVehicle} id="vehicle" placeholder="MH 02 AB 1234" required />
            </FormItem>
            <FormItem name="pincode">
              <TextInput label="Pincode" value={pincode} onChange={setPincode} id="pincode" placeholder="400001" />
              <FormMessage>Enter pincode for location-based pricing.</FormMessage>
            </FormItem>
            <Button variant="primary" type="submit" fullWidth>
              Get my quote
            </Button>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Component registry — maps names to preview + usage
   ═══════════════════════════════════════════════════════════════ */
const COMPONENT_REGISTRY: Record<
  ComponentName,
  { preview: () => ReactNode; usage: () => ReactNode }
> = {
  Button: { preview: ButtonPreview, usage: ButtonUsage },
  Badge: { preview: BadgePreview, usage: BadgeUsage },
  Alert: { preview: AlertPreview, usage: AlertUsage },
  Card: { preview: CardPreview, usage: CardUsage },
  Typography: { preview: TypographyPreview, usage: TypographyUsage },
  TextInput: { preview: TextInputPreview, usage: TextInputUsage },
  Textarea: { preview: TextareaPreview, usage: TextareaUsage },
  Dropdown: { preview: DropdownPreview, usage: DropdownUsage },
  Checkbox: { preview: CheckboxPreview, usage: CheckboxUsage },
  Radio: { preview: RadioPreview, usage: RadioUsage },
  Switch: { preview: SwitchPreview, usage: SwitchUsage },
  Toggle: { preview: TogglePreview, usage: ToggleUsage },
  Tabs: { preview: TabsPreview, usage: TabsUsage },
  Tooltip: { preview: TooltipPreview, usage: TooltipUsage },
  Progress: { preview: ProgressPreview, usage: ProgressUsage },
  Separator: { preview: SeparatorPreview, usage: SeparatorUsage },
  "Label & Field": { preview: LabelFieldPreview, usage: LabelFieldUsage },
  InputGroup: { preview: InputGroupPreview, usage: InputGroupUsage },
  Breadcrumb: { preview: BreadcrumbPreview, usage: BreadcrumbUsage },
  Accordion: { preview: AccordionPreview, usage: AccordionUsage },
  Calendar: { preview: CalendarPreview, usage: CalendarUsage },
  Table: { preview: TablePreview, usage: TableUsage },
  Avatar: { preview: AvatarPreview, usage: AvatarUsage },
  Skeleton: { preview: SkeletonPreview, usage: SkeletonUsage },
  NavigationWizard: {
    preview: NavigationWizardPreview,
    usage: NavigationWizardUsage,
  },
  Pagination: { preview: PaginationPreview, usage: PaginationUsage },
  ScrollArea: { preview: ScrollAreaPreview, usage: ScrollAreaUsage },
  Dialog: { preview: DialogPreview, usage: DialogUsage },
  Drawer: { preview: DrawerPreview, usage: DrawerUsage },
  Toast: { preview: ToastPreview, usage: ToastUsage },
  Slider: { preview: SliderPreview, usage: SliderUsage },
  OtpInput: { preview: OtpInputPreview, usage: OtpInputUsage },
  Form: { preview: FormPreview, usage: FormUsage },
};

/* ═══════════════════════════════════════════════════════════════
   Sidebar categories — Atoms / Molecules / Overlays / Navigation
   ═══════════════════════════════════════════════════════════════ */
const CATEGORIES: { label: string; tag: string; items: ComponentName[] }[] = [
  {
    label: "Atoms",
    tag: "atom",
    items: [
      "Button", "Badge", "Typography", "Avatar", "Separator",
      "Skeleton", "Label & Field", "Progress", "Slider",
    ],
  },
  {
    label: "Inputs",
    tag: "input",
    items: [
      "TextInput", "Textarea", "Checkbox", "Radio", "Switch",
      "Toggle", "Dropdown", "InputGroup", "OtpInput",
    ],
  },
  {
    label: "Molecules",
    tag: "molecule",
    items: [
      "Alert", "Card", "Accordion", "Tabs", "Tooltip",
      "Breadcrumb", "Calendar", "Table", "ScrollArea",
      "NavigationWizard", "Pagination", "Form",
    ],
  },
  {
    label: "Overlays",
    tag: "overlay",
    items: ["Dialog", "Drawer", "Toast"],
  },
];

/* ═══════════════════════════════════════════════════════════════
   App — 3-column layout
   ═══════════════════════════════════════════════════════════════ */
function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [selected, setSelected] = useState<ComponentName>("Button");
  const [search, setSearch] = useState("");

  const cycleTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const entry = COMPONENT_REGISTRY[selected];
  const Preview = entry.preview;
  const Usage = entry.usage;

  const isCardComponent = selected === "Card";

  const lc = search.toLowerCase();
  const isSearching = lc.length > 0;

  const COMPONENT_META: Record<ComponentName, { label: string; tag: string }> = {} as Record<ComponentName, { label: string; tag: string }>;
  CATEGORIES.forEach(({ tag, items }) =>
    items.forEach((item) => { COMPONENT_META[item] = { label: item, tag }; })
  );

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    items: isSearching
      ? cat.items.filter((n) => n.toLowerCase().includes(lc))
      : cat.items,
  })).filter((cat) => cat.items.length > 0);

  const TAG_COLORS: Record<string, string> = {
    atom: "bg-purple-subtle text-primary",
    input: "bg-success-subtle text-success-text",
    molecule: "bg-info-subtle text-info-text",
    overlay: "bg-warning-subtle text-warning-text",
  };

  return (
    <div className="h-screen flex flex-col bg-surface text-text-default">
      {/* ── Top bar ── */}
      <header className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-border-subtle bg-surface-raised">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <h1 className="text-sm font-semibold text-text-strong tracking-tight">
              Acko DS
            </h1>
          </div>
          <span className="text-border-strong">|</span>
          <Badge color="purple" variant="outline" textCase="uppercase">
            {COMPONENT_LIST.length} Components
          </Badge>
        </div>
        <div className="flex items-center gap-1 p-0.5 rounded-full border border-border-subtle bg-surface">
          {(["light", "dark"] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => cycleTheme(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                theme === t
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-transparent text-text-muted hover:text-text-default"
              }`}
            >
              {t === "light" ? "☀️ Light" : "🌙 Dark"}
            </button>
          ))}
        </div>
      </header>

      {/* ── 3-column body ── */}
      <div className="flex-1 flex min-h-0">

        {/* ── Left: Component list ── */}
        <aside className="w-60 shrink-0 border-r border-border-subtle bg-surface-raised flex flex-col">
          <div className="px-3 pt-4 pb-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search components…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-border-subtle bg-surface placeholder:text-text-disabled focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto px-2 pb-6 space-y-4">
            {filteredCategories.map((cat) => (
              <div key={cat.tag}>
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-text-disabled">
                  {cat.label}
                </p>
                {cat.items.map((name) => (
                  <button
                    key={name}
                    onClick={() => setSelected(name)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all mb-0.5 flex items-center justify-between group ${
                      selected === name
                        ? "bg-primary text-on-primary"
                        : "text-text-muted hover:text-text-strong hover:bg-surface"
                    }`}
                  >
                    <span>{name}</span>
                    {selected !== name && (
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${TAG_COLORS[COMPONENT_META[name]?.tag ?? "atom"]}`}>
                        {COMPONENT_META[name]?.tag}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <p className="text-xs text-text-disabled text-center py-8">
                No results for "{search}"
              </p>
            )}
          </nav>
        </aside>

        {/* ── Middle: Component preview ── */}
        <main className="flex-1 overflow-y-auto bg-surface">
          <div className="max-w-xl mx-auto px-8 py-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Typography variant="heading-xl" color="primary">
                    {selected}
                  </Typography>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[COMPONENT_META[selected]?.tag ?? "atom"]}`}>
                    {COMPONENT_META[selected]?.tag ?? "atom"}
                  </span>
                </div>
                <Typography variant="body-sm" color="secondary">
                  Variants, sizes, and states
                </Typography>
              </div>
            </div>

            {/* Preview area */}
            {isCardComponent ? (
              <div className="space-y-3">
                <Preview />
              </div>
            ) : (
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "var(--radius-2xl)",
                  background: "var(--color-card-bg)",
                  border: "1px solid var(--color-card-border)",
                }}
              >
                <div className="p-6">
                  <Preview />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* ── Right: Component in use ── */}
        <aside className="w-[340px] shrink-0 border-l border-border-subtle overflow-y-auto bg-surface-raised">
          <div className="px-5 pt-6 pb-3 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-primary" />
              <Typography variant="label-md" color="primary">
                In Context
              </Typography>
            </div>
            <Typography variant="caption" color="secondary">
              Real-world usage example
            </Typography>
          </div>
          <div className="p-5">
            <Usage />
          </div>
        </aside>

      </div>
    </div>
  );
}

export default function Root() {
  return (
    <ToastProvider position="top-right">
      <App />
    </ToastProvider>
  );
}
