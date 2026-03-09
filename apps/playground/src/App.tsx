import { useState, type ReactNode } from "react";
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
import { Label } from "@acko/label";
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
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="inverted">Inverted</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex flex-wrap gap-3 items-end">
        {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
          <Button key={s} variant="primary" size={s}>
            {s.toUpperCase()}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" loading>
          Loading
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
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
        <div className="space-y-3">
          <Typography variant="heading-md" color="strong">
            Delete Account
          </Typography>
          <Typography variant="body-sm" color="muted">
            This action is permanent and cannot be undone.
          </Typography>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              loading={loading}
              onClick={handleClick}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BadgePreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["purple", "green", "blue", "orange", "pink", "gray"] as const).map(
          (c) => (
            <Badge key={c} color={c}>
              {c}
            </Badge>
          )
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {(["purple", "green", "blue", "orange", "pink", "gray"] as const).map(
          (c) => (
            <Badge key={c} variant="outline" color={c}>
              outline
            </Badge>
          )
        )}
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant="dot" color="purple">
          Dot
        </Badge>
        <Badge removable onRemove={() => {}}>
          Removable
        </Badge>
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
            <Typography variant="heading-md" color="strong">
              Notifications
            </Typography>
            <CounterBadge count={3} color="purple" />
          </div>
          {[
            { label: "New policy issued", color: "green" as const, time: "2m ago" },
            { label: "Payment pending", color: "orange" as const, time: "1h ago" },
            { label: "Claim approved", color: "blue" as const, time: "3h ago" },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Badge variant="dot" color={n.color}>
                  {n.label}
                </Badge>
              </div>
              <Typography variant="caption" color="muted">
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
      <Alert variant="info" title="Info">
        Informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review before proceeding.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong.
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
          <Typography variant="heading-md" color="strong">
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
              size="sm"
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
            <Typography variant="label-md" color="strong">
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
          <Typography variant="heading-md" color="strong">
            Premium Plan
          </Typography>
          <Badge color="orange" variant="solid">
            Popular
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Typography variant="body-sm" color="muted">
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
        <Typography variant="overline" color="muted">LIVE EXAMPLES</Typography>
        <div className="space-y-1">
          <Typography variant="display-lg" color="strong">Insurance made simple</Typography>
          <Typography variant="body-lg" color="muted">Protect what matters most with coverage that fits your life.</Typography>
        </div>
        <Separator />
        <div className="space-y-1">
          <Typography variant="heading-xl" color="strong">Your Dashboard</Typography>
          <Typography variant="body-md" color="default">Welcome back, Priya. Here's your policy overview.</Typography>
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          <Typography variant="label-lg" color="strong">Status:</Typography>
          <Badge color="green" variant="solid">Active</Badge>
          <Typography variant="caption" color="muted">Updated 2 hours ago</Typography>
        </div>
      </div>

      {/* Spec reference */}
      <div>
        <Typography variant="overline" color="muted">SPEC REFERENCE</Typography>
        <div className="mt-3 space-y-3">
          {specs.map((s) => (
            <div key={s.variant} className="flex items-baseline gap-4">
              <div className="w-40 shrink-0">
                <Typography variant={s.variant} color="strong">
                  Ag
                </Typography>
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="label-sm" color="default">{s.label}</Typography>
                <Typography variant="caption" color="muted">{s.use}</Typography>
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
        <Typography variant="overline" color="muted">
          INSURANCE
        </Typography>
        <Typography variant="heading-xl" color="strong">
          Protect What Matters
        </Typography>
        <Typography variant="body-md" color="muted">
          Simple, affordable insurance for everyone. No paperwork, no hassle.
        </Typography>
        <div className="pt-2">
          <Button variant="primary" size="sm">
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
          <Typography variant="heading-md" color="strong">
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
          <Typography variant="heading-md" color="strong">
            Leave Feedback
          </Typography>
          <Textarea label="Your feedback" placeholder="Tell us how we can improve..." value={msg} onChange={setMsg} maxLength={500} showCount helperText="We read every message" />
          <Button variant="primary" size="sm">
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
          <Typography variant="heading-md" color="strong">
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
    <div className="space-y-3">
      <Checkbox label="Unchecked" checked={a} onChange={setA} />
      <Checkbox label="Checked" checked={b} onChange={setB} />
      <Checkbox label="Indeterminate" checked={false} indeterminate onChange={() => {}} />
      <Checkbox label="Disabled" checked={false} onChange={() => {}} disabled />
      <Checkbox label="Error state" checked={false} onChange={() => {}} error />
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
          <Typography variant="heading-md" color="strong">
            Preferences
          </Typography>
          <Checkbox label="I agree to terms and conditions" description="Required to continue" checked={terms} onChange={setTerms} />
          <Checkbox label="Send me promotional emails" checked={marketing} onChange={setMarketing} />
          <Button variant="primary" size="sm" disabled={!terms}>
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
          <Typography variant="heading-md" color="strong">
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
  return (
    <div className="space-y-3">
      <Switch label="Default" checked={on} onChange={setOn} />
      <Switch label="Small" size="sm" checked={on} onChange={setOn} />
      <Switch label="Disabled" disabled />
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
          <Typography variant="heading-md" color="strong">
            Settings
          </Typography>
          <div className="flex items-center justify-between">
            <Typography variant="body-sm" color="default">
              Push notifications
            </Typography>
            <Switch checked={notif} onChange={setNotif} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Typography variant="body-sm" color="default">
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
          <Typography variant="heading-md" color="strong">
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
            color="muted"
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
        <Typography variant="label-sm" color="muted">Underline (bottom)</Typography>
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
        <Typography variant="label-sm" color="muted">Underline (top)</Typography>
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
        <Typography variant="label-sm" color="muted">Pill (fit-content)</Typography>
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
        <Typography variant="label-sm" color="muted">Navigation (bottom tabs)</Typography>
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
              <Typography variant="body-sm" color="muted">
                Policy #POL-2024-001 — Comprehensive car insurance.
              </Typography>
            )}
            {tab === "claims" && (
              <Typography variant="body-sm" color="muted">
                No claims filed yet.
              </Typography>
            )}
            {tab === "docs" && (
              <Typography variant="body-sm" color="muted">
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
        <Button variant="secondary" size="sm">
          Top
        </Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="secondary" size="sm">
          Bottom
        </Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button variant="secondary" size="sm">
          Left
        </Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="secondary" size="sm">
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
          <Typography variant="heading-md" color="strong">
            Action Toolbar
          </Typography>
          <div className="flex gap-2">
            <Tooltip content="Edit profile">
              <Button variant="secondary" size="sm">
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Download report">
              <Button variant="secondary" size="sm">
                <DownloadIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Delete item">
              <Button variant="danger" size="sm">
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
        <Typography variant="label-sm" color="muted">Bar</Typography>
        <Progress value={30} color="primary" size="sm" label="Small" showLabel />
        <Progress value={65} color="primary" size="md" label="Medium" showLabel animated />
        <Progress value={100} color="success" size="lg" label="Complete" showLabel />
        <Progress value={40} color="error" size="md" showLabel />
      </div>

      {/* Circular variants */}
      <div>
        <Typography variant="label-sm" color="muted">Circular</Typography>
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
        <Typography variant="label-sm" color="muted">Segmented</Typography>
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
          <Typography variant="heading-md" color="strong">
            Profile Completion
          </Typography>
          <div className="flex items-center gap-4">
            <Progress variant="circular" value={72} size="lg" color="primary">
              <Avatar initials="PS" size="md" shape="circle" />
            </Progress>
            <div>
              <Typography variant="label-md" color="strong">Priya Sharma</Typography>
              <Typography variant="caption" color="muted">72% complete — add a photo to finish</Typography>
            </div>
          </div>
          <Separator />
          <Typography variant="label-sm" color="muted">Onboarding Progress</Typography>
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
  return (
    <div className="space-y-4">
      <Label required>Required Label</Label>
      <Label size="sm" disabled>
        Disabled Label
      </Label>
      <Field label="Username" required helperText="Choose a unique username">
        <input
          type="text"
          className="acko-text-input-el acko-text-input-el-sm w-full"
          style={{ border: '1px solid var(--color-input-border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', background: 'transparent' }}
          placeholder="johndoe"
        />
      </Field>
      <Field label="Password" errorText="Must be 8+ characters">
        <input
          type="password"
          className="acko-text-input-el acko-text-input-el-sm w-full"
          style={{ border: '1px solid var(--color-error)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', background: 'transparent' }}
          placeholder="••••••••"
        />
      </Field>
    </div>
  );
}

function LabelFieldUsage() {
  return (
    <Card variant="elevated" padding="md">
      <CardContent>
        <div className="space-y-3">
          <Typography variant="heading-md" color="strong">
            Registration
          </Typography>
          <Field label="Full Name" required>
            <input
              className="acko-text-input-el acko-text-input-el-sm w-full"
              style={{ border: '1px solid var(--color-input-border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', background: 'transparent' }}
              placeholder="John Doe"
            />
          </Field>
          <Field label="Email" required helperText="We'll never share it">
            <input
              className="acko-text-input-el acko-text-input-el-sm w-full"
              style={{ border: '1px solid var(--color-input-border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)', background: 'transparent' }}
              placeholder="john@example.com"
            />
          </Field>
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
          <Typography variant="heading-md" color="strong">
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
          <Button variant="primary" size="sm">
            Pay Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BreadcrumbPreview() {
  return (
    <div className="space-y-4">
      {/* Default */}
      <div>
        <Typography variant="label-sm" color="muted">Default</Typography>
        <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Insurance", href: "#" }, { label: "Car Insurance" }]} />
      </div>

      {/* With icon on first item */}
      <div>
        <Typography variant="label-sm" color="muted">With Icon</Typography>
        <Breadcrumb items={[{ label: "Home", href: "#", icon: <HomeIcon /> }, { label: "Products", href: "#" }, { label: "Health Insurance" }]} />
      </div>

      {/* Custom separator */}
      <div>
        <Typography variant="label-sm" color="muted">Custom Separator (/)</Typography>
        <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Policies", href: "#" }, { label: "POL-2024-001" }]} separator="/" />
      </div>

      {/* Collapsed */}
      <div>
        <Typography variant="label-sm" color="muted">Collapsed</Typography>
        <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Products", href: "#" }, { label: "Health", href: "#" }, { label: "Plans", href: "#" }, { label: "Premium", href: "#" }, { label: "Checkout" }]} maxItems={3} />
      </div>

      {/* Contained in a subtle card */}
      <div>
        <Typography variant="label-sm" color="muted">Contained</Typography>
        <div className="bg-surface-raised border border-border-subtle rounded-xl px-4 py-2 inline-block">
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
          <Typography variant="heading-md" color="strong">
            Policy Details
          </Typography>
          <Typography variant="body-sm" color="muted">
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
          <Typography variant="heading-md" color="strong">
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
        <Typography variant="label-sm" color="muted">
          Dropdown
        </Typography>
        <Calendar variant="single" display="dropdown" value={d} onChange={(v: Date | DateRange | Date[]) => setD(v as Date)} />
      </div>
      <div>
        <Typography variant="label-sm" color="muted">
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
          <Typography variant="heading-md" color="strong">
            Policy Start Date
          </Typography>
          <Calendar variant="single" display="dropdown" value={d} onChange={(v: Date | DateRange | Date[]) => setD(v as Date)} minDate={new Date()} />
          <Button variant="primary" size="sm">
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
              <Badge color={r.status === "Active" ? "green" : r.status === "Pending" ? "orange" : "gray"} variant="solid">
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
            <Typography variant="heading-md" color="strong">
              Recent Policies
            </Typography>
            <Button variant="secondary" size="sm">
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
                  <Badge color="green" variant="solid">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Third Party</TableCell>
                <TableCell>₹2,094</TableCell>
                <TableCell>
                  <Badge color="orange" variant="solid">Pending</Badge>
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
          <Typography variant="heading-md" color="strong">
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
                <Typography variant="label-md" color="strong">{m.name}</Typography>
                <Typography variant="caption" color="muted">{m.role}</Typography>
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
          <Typography variant="heading-md" color="strong">
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
    <div className="space-y-6">
      {/* Horizontal */}
      <div>
        <Typography variant="label-sm" color="muted">Horizontal</Typography>
        <NavigationWizard
          steps={[{ label: "Details" }, { label: "Review" }, { label: "Payment" }, { label: "Done" }]}
          currentStep={step}
          onStepClick={setStep}
        />
        <div className="flex gap-2 mt-3">
          <Button variant="secondary" size="sm" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Back
          </Button>
          <Button variant="primary" size="sm" onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3}>
            Next
          </Button>
        </div>
      </div>

      {/* Vertical */}
      <div>
        <Typography variant="label-sm" color="muted">Vertical</Typography>
        <NavigationWizard
          steps={[{ label: "Personal Info" }, { label: "Vehicle Details" }, { label: "Choose Plan" }, { label: "Payment" }]}
          currentStep={2}
          variant="vertical"
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
          <Typography variant="body-sm" color="muted">
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
        <Typography variant="label-sm" color="muted">
          Numbered
        </Typography>
        <Pagination totalPages={20} currentPage={p} onPageChange={setP} showInfo />
      </div>
      <div>
        <Typography variant="label-sm" color="muted">
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
          <Typography variant="heading-md" color="strong">
            Search Results
          </Typography>
          <Typography variant="body-sm" color="muted">
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
          <Typography variant="heading-md" color="strong">
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
};

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

  const filtered = COMPONENT_LIST.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const entry = COMPONENT_REGISTRY[selected];
  const Preview = entry.preview;
  const Usage = entry.usage;

  const isCardComponent = selected === "Card";

  return (
    <div className="h-screen flex flex-col bg-surface text-text-default">
      {/* ── Top bar ── */}
      <header className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-border-subtle bg-surface-raised">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-text-strong tracking-tight">
            Acko Design System
          </h1>
          <Badge color="purple" variant="outline">
            {COMPONENT_LIST.length} Components
          </Badge>
        </div>
        <div className="flex gap-2">
          {(["light", "dark"] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => cycleTheme(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                theme === t
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-transparent text-text-muted hover:text-text-strong hover:bg-surface"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* ── 3-column body ── */}
      <div className="flex-1 flex min-h-0">
        {/* ── Left: Component list ── */}
        <aside className="w-56 shrink-0 border-r border-border-subtle bg-surface-raised flex flex-col">
          <div className="p-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border-subtle bg-surface placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <nav className="flex-1 overflow-y-auto px-2 pb-4">
            {filtered.map((name) => (
              <button
                key={name}
                onClick={() => setSelected(name)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                  selected === name
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-text-muted hover:text-text-strong hover:bg-surface"
                }`}
              >
                {name}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-text-disabled text-center py-6">
                No components found
              </p>
            )}
          </nav>
        </aside>

        {/* ── Middle: Component preview ── */}
        <main className="flex-1 overflow-y-auto p-8 bg-surface">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Typography variant="heading-xl" color="strong">
                {selected}
              </Typography>
              <Typography variant="body-sm" color="muted">
                Component variants, sizes, and states
              </Typography>
            </div>
            {isCardComponent ? (
              <div className="p-6">
                <Preview />
              </div>
            ) : (
              <div className="rounded-2xl border border-border-subtle bg-card-bg p-6" style={{ borderRadius: 'var(--radius-3xl)' }}>
                <Preview />
              </div>
            )}
          </div>
        </main>

        {/* ── Right: Component in use ── */}
        <aside className="w-[360px] shrink-0 border-l border-border-subtle overflow-y-auto p-6 bg-surface">
          <div className="mb-4">
            <Typography variant="label-lg" color="strong">
              In Context
            </Typography>
            <Typography variant="caption" color="muted">
              How the component looks in a real UI
            </Typography>
          </div>
          <Usage />
        </aside>
      </div>
    </div>
  );
}

export default App;
