import { useState } from "react";
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
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@acko/table";
import { Avatar } from "@acko/avatar";
import { Skeleton } from "@acko/skeleton";
import { NavigationWizard } from "@acko/navigation-wizard";
import { Pagination } from "@acko/pagination";

type Theme = "light" | "dark" | "elevated";
type View = "components" | "car-insurance";
const themes: Theme[] = ["light", "dark", "elevated"];

const ChevronRight = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4l4 4-4 4" />
  </svg>
);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6 text-text-strong">{title}</h2>
      {children}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Car Insurance Landing Page
   ═══════════════════════════════════════════════════════════════ */

const CAR_MAKES = [
  { value: "maruti", label: "Maruti Suzuki" },
  { value: "hyundai", label: "Hyundai" },
  { value: "tata", label: "Tata Motors" },
  { value: "mahindra", label: "Mahindra" },
  { value: "honda", label: "Honda" },
  { value: "toyota", label: "Toyota" },
  { value: "kia", label: "Kia" },
];

const CITIES = [
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi NCR" },
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "chennai", label: "Chennai" },
  { value: "pune", label: "Pune" },
  { value: "kolkata", label: "Kolkata" },
  { value: "ahmedabad", label: "Ahmedabad" },
];

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const WrenchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <path d="M1 10h22" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

function CarInsurancePage() {
  const [regNumber, setRegNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [carMake, setCarMake] = useState("");
  const [city, setCity] = useState("");
  const [plan, setPlan] = useState("comprehensive");
  const [policyStart, setPolicyStart] = useState<Date>(new Date(Date.now() + 86400000));
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      {/* ── Breadcrumb bar ── */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "#" },
            { label: "Insurance", href: "#" },
            { label: "Car Insurance" },
          ]}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
         HERO — headline left, quote form right
         ══════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — copy */}
        <div className="space-y-6 pt-4">
          <div className="flex gap-2 flex-wrap">
            <Badge color="green" variant="solid">Save up to 85%</Badge>
            <Badge color="blue" variant="solid">Instant Policy</Badge>
            <Badge color="purple" variant="outline">IRDAI Approved</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-text-strong leading-tight">
            Car Insurance <br />
            <span className="text-primary">made simple.</span>
          </h1>
          <p className="text-lg text-text-muted max-w-md leading-relaxed">
            Get comprehensive car insurance in under 2 minutes. Zero paperwork, instant policy, and cashless claims at 8,400+ garages across India.
          </p>

          {/* Trust stats */}
          <div className="grid grid-cols-3 gap-6 pt-4">
            <div>
              <p className="text-2xl font-bold text-text-strong">5 Cr+</p>
              <p className="text-sm text-text-muted">Happy Customers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-text-strong">8,400+</p>
              <p className="text-sm text-text-muted">Cashless Garages</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-text-strong">2 min</p>
              <p className="text-sm text-text-muted">Instant Policy</p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary-subtle border-2 border-surface flex items-center justify-center text-xs font-bold text-primary">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="text-warning"><StarIcon /></span>
              ))}
              <span className="text-sm text-text-muted ml-1">4.8/5 from 2.3L reviews</span>
            </div>
          </div>
        </div>

        {/* Right — Quote form */}
        <div className="rounded-3xl border border-border-subtle bg-surface-raised p-6 sm:p-8 space-y-5 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-strong">Get Your Quote</h2>
            <Badge color="orange" variant="dot">2 min</Badge>
          </div>

          <TextInput
            label="Car Registration Number"
            placeholder="e.g. MH 01 AB 1234"
            value={regNumber}
            onChange={setRegNumber}
            helperText="Don't worry, we'll fetch your car details"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="Full Name"
              placeholder="As on RC book"
              value={ownerName}
              onChange={setOwnerName}
            />
            <TextInput
              label="Mobile Number"
              placeholder="10-digit number"
              value={phone}
              onChange={setPhone}
              prefix="+91"
              maxLength={10}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Dropdown
              label="Car Manufacturer"
              placeholder="Select make"
              options={CAR_MAKES}
              value={carMake}
              onChange={(v: string | string[]) => setCarMake(v as string)}
              size="md"
            />
            <Dropdown
              label="City"
              placeholder="Select city"
              variant="searchable"
              options={CITIES}
              value={city}
              onChange={(v: string | string[]) => setCity(v as string)}
              size="md"
            />
          </div>

          <RadioGroup
            label="Plan Type"
            orientation="horizontal"
            options={[
              { value: "thirdParty", label: "Third Party" },
              { value: "comprehensive", label: "Comprehensive" },
              { value: "ownDamage", label: "Own Damage" },
            ]}
            value={plan}
            onChange={setPlan}
          />

          <div>
            <label className="block text-sm font-medium text-text-default mb-1.5">Policy Start Date</label>
            <Calendar
              variant="single"
              display="dropdown"
              value={policyStart}
              onChange={(v: Date | DateRange | Date[]) => setPolicyStart(v as Date)}
              minDate={new Date()}
            />
          </div>

          <Checkbox
            label="I agree to the Terms & Conditions"
            checked={termsAccepted}
            onChange={setTermsAccepted}
          />

          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!termsAccepted}
            loading={submitted}
            onClick={handleSubmit}
          >
            {submitted ? "Getting your quote..." : "View Prices & Buy Instantly"}
          </Button>

          <p className="text-xs text-center text-text-muted">
            By proceeding, you agree to our Privacy Policy. No spam, ever.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         WHY ACKO — feature cards
         ══════════════════════════════════════════════════════════ */}
      <section className="bg-surface-raised py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge color="purple" variant="outline">Why Acko?</Badge>
            <h2 className="text-3xl font-bold text-text-strong mt-3">Insurance that works for you</h2>
            <p className="text-text-muted mt-2 max-w-lg mx-auto">
              No middlemen, no paperwork, no long waits. Just simple, affordable protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <WalletIcon />, title: "Save up to 85%", desc: "Direct-to-consumer pricing with no agent commissions. What you see is what you pay.", badge: "Savings" },
              { icon: <ClockIcon />, title: "2-Minute Policy", desc: "Enter your car number and get insured instantly. Your policy is emailed in seconds.", badge: "Speed" },
              { icon: <WrenchIcon />, title: "Cashless Repairs", desc: "Drive to any of our 8,400+ partner garages. We handle the payment directly.", badge: "Convenience" },
              { icon: <CheckCircleIcon />, title: "Zero Paperwork", desc: "Everything is digital — from buying to claims. No forms to fill, no documents to courier.", badge: "Digital" },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border-subtle bg-surface p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center text-primary">
                  {f.icon}
                </div>
                <Badge color="gray" variant="outline">{f.badge}</Badge>
                <h3 className="text-base font-semibold text-text-strong">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         PLANS — comparison cards
         ══════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Badge color="blue" variant="outline">Plans</Badge>
          <h2 className="text-3xl font-bold text-text-strong mt-3">Choose the right cover</h2>
          <p className="text-text-muted mt-2">All plans include 24/7 customer support and instant digital policy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Third Party",
              price: "2,094",
              desc: "Mandatory by law",
              color: "gray" as const,
              features: ["Covers damage to others", "Legal liability protection", "Personal accident cover", "Mandatory as per Motor Act"],
              missing: ["Own damage cover", "Theft & fire protection", "Natural calamity cover"],
            },
            {
              name: "Comprehensive",
              price: "4,835",
              desc: "Most popular choice",
              color: "purple" as const,
              features: ["Everything in Third Party", "Own damage cover", "Theft & fire protection", "Natural calamity cover", "Personal accident cover", "Cashless repairs at 8,400+ garages"],
              missing: [],
              recommended: true,
            },
            {
              name: "Own Damage",
              price: "3,200",
              desc: "For your car only",
              color: "blue" as const,
              features: ["Accident damage cover", "Fire & explosion", "Theft protection", "Natural calamity cover", "Personal accident cover"],
              missing: ["Third party liability"],
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl border p-6 space-y-5 relative ${
                p.recommended
                  ? "border-primary bg-primary-subtle"
                  : "border-border-subtle bg-surface-raised"
              }`}
            >
              {p.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge color="orange" variant="solid">Recommended</Badge>
                </div>
              )}
              <div className="pt-1">
                <Badge color={p.color} variant="solid">{p.name}</Badge>
              </div>
              <div>
                <span className="text-3xl font-bold text-text-strong">₹{p.price}</span>
                <span className="text-sm text-text-muted">/year</span>
                <p className="text-sm text-text-muted mt-1">{p.desc}</p>
              </div>
              <div className="space-y-2.5">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5 shrink-0"><CheckCircleIcon /></span>
                    <span className="text-text-strong">{f}</span>
                  </div>
                ))}
                {p.missing.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-text-disabled mt-0.5 shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M15 9l-6 6M9 9l6 6" />
                      </svg>
                    </span>
                    <span className="text-text-muted line-through">{f}</span>
                  </div>
                ))}
              </div>
              <Button
                variant={p.recommended ? "primary" : "outline"}
                fullWidth
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Get {p.name}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         HOW IT WORKS — 3 steps
         ══════════════════════════════════════════════════════════ */}
      <section className="bg-surface-raised py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge color="green" variant="outline">How it works</Badge>
            <h2 className="text-3xl font-bold text-text-strong mt-3">Insured in 3 simple steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter car number",
                desc: "Just type your registration number. We auto-fetch your vehicle details from the RTO database.",
              },
              {
                step: "02",
                title: "Compare & choose",
                desc: "See instant quotes across plans. Pick the coverage that suits you. Add optional add-ons.",
              },
              {
                step: "03",
                title: "Pay & get insured",
                desc: "Complete payment in one click. Your policy document lands in your inbox within seconds.",
              },
            ].map((s, i) => (
              <div key={s.step} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-on-primary text-lg font-bold">
                    {s.step}
                  </span>
                  {i < 2 && (
                    <div className="hidden md:block flex-1 h-0.5 bg-border-subtle rounded-full" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-text-strong mb-2">{s.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         TESTIMONIALS
         ══════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Badge color="pink" variant="outline">Reviews</Badge>
          <h2 className="text-3xl font-bold text-text-strong mt-3">Loved by car owners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Priya Sharma",
              city: "Mumbai",
              text: "Bought my policy in literally 90 seconds. The cashless claim at the garage was even smoother — zero follow-ups needed.",
              rating: 5,
            },
            {
              name: "Rahul Menon",
              city: "Bangalore",
              text: "Saved ₹8,200 compared to my previous insurer. The zero-dep add-on paid for itself when I had a minor fender bender.",
              rating: 5,
            },
            {
              name: "Anita Desai",
              city: "Delhi",
              text: "First time buying insurance online and it couldn't be easier. Got a call within 10 mins when I filed my claim. Impressed!",
              rating: 4,
            },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl border border-border-subtle bg-surface-raised p-6 space-y-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < t.rating ? "text-warning" : "text-text-disabled"}>
                    <StarIcon />
                  </span>
                ))}
              </div>
              <p className="text-sm text-text-default leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center text-sm font-bold text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-strong">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         BOTTOM CTA
         ══════════════════════════════════════════════════════════ */}
      <section className="bg-primary-subtle py-16">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-text-strong">Ready to protect your car?</h2>
          <p className="text-text-muted text-lg">
            Join 5 crore+ Indians who trust Acko for their insurance needs.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button variant="primary" size="xl" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Get Your Free Quote
            </Button>
            <Button variant="outline" size="xl">
              Talk to an Expert
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 pt-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5"><CheckCircleIcon /> No spam calls</span>
            <span className="flex items-center gap-1.5"><CheckCircleIcon /> Cancel anytime</span>
            <span className="flex items-center gap-1.5"><CheckCircleIcon /> IRDAI regulated</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <p>Acko General Insurance Ltd. | IRDAI Reg No. 157 | CIN: U66000MH2016PLC287385</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-text-strong transition-colors">Privacy</a>
          <a href="#" className="hover:text-text-strong transition-colors">Terms</a>
          <a href="#" className="hover:text-text-strong transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Components Demo — original showcase
   ═══════════════════════════════════════════════════════════════ */

function ComponentsDemo() {
  const [radioValue, setRadioValue] = useState("option1");
  const [cardRadioValue, setCardRadioValue] = useState("basic");
  const [checks, setChecks] = useState({ terms: false, marketing: true, analytics: false });
  const [inputValue, setInputValue] = useState("");
  const [errorInput, setErrorInput] = useState("bad@");
  const [successInput, setSuccessInput] = useState("user@acko.com");
  const [dropdownValue, setDropdownValue] = useState("");
  const [multiDropdownValue, setMultiDropdownValue] = useState<string[]>([]);
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({ start: new Date(), end: new Date(Date.now() + 7 * 86400000) });
  const [switchOn, setSwitchOn] = useState(false);
  const [textareaVal, setTextareaVal] = useState("");
  const [tabValue, setTabValue] = useState("tab1");
  const [toggleValue, setToggleValue] = useState("left");
  const [wizardStep, setWizardStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(3);
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <main className="max-w-5xl mx-auto px-8 py-12 space-y-16">
      <Section title="Button">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-end">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
              <Button key={s} variant="primary" size={s}>Size {s.toUpperCase()}</Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" iconRight={<ChevronRight />}>Continue</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" fullWidth>Full Width</Button>
          </div>
        </div>
      </Section>

      <Section title="Badge">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3 items-center">
            {(["purple", "green", "blue", "orange", "pink", "gray"] as const).map((c) => (
              <Badge key={c} color={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {(["purple", "green", "blue", "orange", "pink", "gray"] as const).map((c) => (
              <Badge key={c} variant="outline" color={c}>Outline</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {(["purple", "green", "blue"] as const).map((c) => (
              <Badge key={c} variant="dot" color={c}>With Dot</Badge>
            ))}
            <Badge variant="solid" color="purple" removable onRemove={() => {}}>Removable</Badge>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <CounterBadge count={5} color="purple" />
            <CounterBadge count={42} color="pink" />
            <CounterBadge count={150} max={99} color="blue" />
          </div>
        </div>
      </Section>

      <Section title="Radio">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RadioGroup
            label="Notification preference"
            options={[
              { value: "option1", label: "Email notifications" },
              { value: "option2", label: "SMS notifications" },
              { value: "option3", label: "Push notifications" },
              { value: "option4", label: "No notifications", disabled: true },
            ]}
            value={radioValue}
            onChange={setRadioValue}
          />
          <RadioGroup
            label="Select a plan"
            variant="card"
            options={[
              { value: "basic", label: "Basic", description: "Free forever" },
              { value: "pro", label: "Pro", description: "Starting at $9/mo" },
              { value: "enterprise", label: "Enterprise", description: "Custom pricing" },
            ]}
            value={cardRadioValue}
            onChange={setCardRadioValue}
          />
        </div>
      </Section>

      <Section title="Checkbox">
        <div className="space-y-4">
          <Checkbox label="I agree to the terms and conditions" description="You must agree before continuing" checked={checks.terms} onChange={(v) => setChecks((p) => ({ ...p, terms: v }))} />
          <Checkbox label="Send me marketing emails" checked={checks.marketing} onChange={(v) => setChecks((p) => ({ ...p, marketing: v }))} />
          <Checkbox label="Enable analytics" checked={checks.analytics} indeterminate={!checks.analytics} onChange={(v) => setChecks((p) => ({ ...p, analytics: v }))} />
          <Checkbox label="Disabled checkbox" checked={false} onChange={() => {}} disabled />
          <Checkbox label="Error state" checked={false} onChange={() => {}} error />
        </div>
      </Section>

      <Section title="TextInput">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <TextInput label="Full Name" placeholder="Enter your name" value={inputValue} onChange={setInputValue} />
          <TextInput label="Email (error)" placeholder="you@example.com" value={errorInput} onChange={setErrorInput} state="error" errorText="Please enter a valid email address" />
          <TextInput label="Email (success)" placeholder="you@example.com" value={successInput} onChange={setSuccessInput} state="success" helperText="Email verified" />
          <TextInput label="Disabled" placeholder="Cannot edit" value="Locked value" onChange={() => {}} disabled />
          <TextInput label="With prefix" placeholder="username" value="" onChange={() => {}} prefix="@" />
          <TextInput label="Bio (max length)" placeholder="Tell us about yourself" value={inputValue} onChange={setInputValue} maxLength={100} helperText="Keep it short and sweet" />
        </div>
      </Section>

      <Section title="Dropdown">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          <Dropdown label="City" placeholder="Select a city" options={[{ value: "mum", label: "Mumbai" }, { value: "del", label: "Delhi" }, { value: "blr", label: "Bangalore" }, { value: "chn", label: "Chennai" }, { value: "hyd", label: "Hyderabad" }]} value={dropdownValue} onChange={(v: string | string[]) => setDropdownValue(v as string)} />
          <Dropdown label="Languages" placeholder="Select languages" variant="multi" options={[{ value: "en", label: "English" }, { value: "hi", label: "Hindi" }, { value: "mr", label: "Marathi" }, { value: "ta", label: "Tamil" }, { value: "te", label: "Telugu" }]} value={multiDropdownValue} onChange={(v: string | string[]) => setMultiDropdownValue(v as string[])} />
          <Dropdown label="Search a city" variant="searchable" options={[{ value: "mum", label: "Mumbai" }, { value: "del", label: "Delhi" }, { value: "blr", label: "Bangalore" }, { value: "chn", label: "Chennai" }, { value: "hyd", label: "Hyderabad" }, { value: "kol", label: "Kolkata" }, { value: "pun", label: "Pune" }]} value={dropdownValue} onChange={(v: string | string[]) => setDropdownValue(v as string)} />
          <Dropdown label="Insurance Type" variant="grouped" options={[{ value: "car", label: "Car Insurance", group: "Motor" }, { value: "bike", label: "Bike Insurance", group: "Motor" }, { value: "health", label: "Health Insurance", group: "Life & Health" }, { value: "term", label: "Term Life", group: "Life & Health" }, { value: "travel", label: "Travel Insurance", group: "Other" }]} value={dropdownValue} onChange={(v: string | string[]) => setDropdownValue(v as string)} />
          <Dropdown label="Error state" state="error" errorText="This field is required" options={[{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }]} value="" onChange={() => {}} />
          <Dropdown label="Disabled" disabled options={[{ value: "a", label: "Option A" }]} value="" onChange={() => {}} />
        </div>
      </Section>

      <Section title="Calendar">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Dropdown — Single Date</h3>
            <Calendar variant="single" display="dropdown" value={singleDate} onChange={(v: Date | DateRange | Date[]) => setSingleDate(v as Date)} />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Dropdown — Date Range</h3>
            <Calendar variant="range" display="dropdown" value={dateRange} onChange={(v: Date | DateRange | Date[]) => setDateRange(v as DateRange)} />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Inline Calendar</h3>
            <Calendar variant="single" display="inline" value={singleDate} onChange={(v: Date | DateRange | Date[]) => setSingleDate(v as Date)} />
          </div>
        </div>
      </Section>

      <Section title="Breadcrumb">
        <div className="space-y-6">
          <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Insurance", href: "#" }, { label: "Car Insurance", href: "#" }, { label: "Get Quote" }]} />
          <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Products", href: "#" }, { label: "Health", href: "#" }, { label: "Plans", href: "#" }, { label: "Premium", href: "#" }, { label: "Checkout" }]} maxItems={3} />
        </div>
      </Section>

      <Section title="Card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default">
            <CardHeader><span className="font-semibold text-text-strong">Default Card</span></CardHeader>
            <CardContent><p className="text-sm text-text-muted">This is a default card with header, content, and footer.</p></CardContent>
            <CardFooter><Button variant="outline" size="sm">Cancel</Button><Button variant="primary" size="sm">Confirm</Button></CardFooter>
          </Card>
          <Card variant="elevated">
            <CardHeader><span className="font-semibold text-text-strong">Elevated Card</span></CardHeader>
            <CardContent><p className="text-sm text-text-muted">Elevated variant with a box shadow for visual hierarchy.</p></CardContent>
          </Card>
          <Card variant="outline" padding="sm">
            <CardContent><p className="text-sm text-text-muted">Outline variant with small padding.</p></CardContent>
          </Card>
          <Card variant="demoted">
            <CardContent><p className="text-sm text-text-muted">Demoted card for secondary content.</p></CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-4">
          <Typography variant="display-lg" color="strong">Display Large</Typography>
          <Typography variant="heading-xl" color="strong">Heading XL</Typography>
          <Typography variant="heading-md" color="strong">Heading Medium</Typography>
          <Typography variant="body-lg" color="default">Body large — the quick brown fox jumps over the lazy dog.</Typography>
          <Typography variant="body-md" color="muted">Body medium — muted color for secondary text content.</Typography>
          <Typography variant="body-sm" color="primary">Body small in primary color.</Typography>
          <div className="flex flex-wrap gap-4 items-center">
            <Typography variant="label-lg" color="strong">Label LG</Typography>
            <Typography variant="label-md" color="default">Label MD</Typography>
            <Typography variant="label-sm" color="muted">Label SM</Typography>
            <Typography variant="caption" color="muted">Caption</Typography>
            <Typography variant="overline" color="muted">OVERLINE</Typography>
          </div>
          <Typography variant="body-md" truncate className="max-w-xs">This is a long truncated text that should be cut off with an ellipsis after reaching the container boundary.</Typography>
        </div>
      </Section>

      <Section title="Alert">
        <div className="space-y-4">
          <Alert variant="info" title="Information">This is an informational alert with helpful context.</Alert>
          <Alert variant="success" title="Success">Your changes have been saved successfully.</Alert>
          <Alert variant="warning" title="Warning">Please review your input before proceeding.</Alert>
          {alertVisible && (
            <Alert variant="error" title="Error" dismissible onDismiss={() => setAlertVisible(false)}>
              Something went wrong. Click dismiss to close this alert.
            </Alert>
          )}
          {!alertVisible && (
            <Button variant="outline" size="sm" onClick={() => setAlertVisible(true)}>Show Error Alert</Button>
          )}
        </div>
      </Section>

      <Section title="Progress">
        <div className="space-y-6 max-w-md">
          <Progress value={30} color="primary" size="sm" label="Upload" showLabel />
          <Progress value={65} color="primary" size="md" label="Downloading" showLabel animated />
          <Progress value={100} color="success" size="lg" label="Complete" showLabel />
          <Progress value={40} color="error" size="md" showLabel />
        </div>
      </Section>

      <Section title="Switch">
        <div className="space-y-4">
          <Switch label="Enable notifications" checked={switchOn} onChange={setSwitchOn} />
          <Switch label="Small switch" size="sm" checked={switchOn} onChange={setSwitchOn} />
          <Switch label="Disabled switch" disabled checked={false} onChange={() => {}} />
        </div>
      </Section>

      <Section title="Separator">
        <div className="space-y-6">
          <Separator />
          <Separator label="OR" />
          <div className="flex items-center gap-4 h-8">
            <span className="text-sm text-text-muted">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm text-text-muted">Right</span>
          </div>
        </div>
      </Section>

      <Section title="Label & Field">
        <div className="space-y-6 max-w-sm">
          <div className="space-y-2">
            <Label required>Email Address</Label>
            <Label size="sm" disabled>Disabled Label</Label>
          </div>
          <Field label="Username" required helperText="Choose a unique username">
            <input type="text" className="w-full border border-border-subtle rounded-full px-4 py-2 text-sm bg-transparent" placeholder="johndoe" />
          </Field>
          <Field label="Password" required errorText="Password must be at least 8 characters">
            <input type="password" className="w-full border border-error rounded-full px-4 py-2 text-sm bg-transparent" placeholder="••••••••" />
          </Field>
        </div>
      </Section>

      <Section title="Textarea">
        <div className="space-y-6 max-w-md">
          <Textarea label="Message" placeholder="Write your message..." value={textareaVal} onChange={setTextareaVal} maxLength={200} showCount helperText="We'll respond within 24 hours" />
          <Textarea label="Read-only notes" value="This textarea is disabled." disabled onChange={() => {}} />
          <Textarea label="Error state" value="" onChange={() => {}} state="error" errorText="This field is required" />
        </div>
      </Section>

      <Section title="InputGroup">
        <div className="space-y-4 max-w-md">
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
      </Section>

      <Section title="ScrollArea">
        <div className="max-w-sm">
          <ScrollArea maxHeight={150} className="border border-border-subtle rounded-2xl p-4">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="text-sm text-text-muted py-1">Scrollable item {i + 1}</p>
            ))}
          </ScrollArea>
        </div>
      </Section>

      <Section title="Accordion">
        <div className="max-w-lg">
          <Accordion
            type="single"
            collapsible
            items={[
              { value: "q1", trigger: "What is Acko car insurance?", content: "Acko provides 100% online car insurance with instant policy issuance, cashless claims at 8,400+ garages, and savings up to 85%." },
              { value: "q2", trigger: "How do I file a claim?", content: "You can file a claim directly from the Acko app or website. Simply upload photos of the damage, and our team will guide you through the process." },
              { value: "q3", trigger: "Is there a waiting period?", content: "No waiting period for accident claims. Your policy is active immediately after purchase." },
              { value: "q4", trigger: "Disabled question", content: "This won't open.", disabled: true },
            ]}
          />
        </div>
      </Section>

      <Section title="Tabs">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Underline variant</h3>
            <Tabs
              items={[
                { value: "tab1", label: "Overview" },
                { value: "tab2", label: "Features" },
                { value: "tab3", label: "Pricing" },
                { value: "tab4", label: "Disabled", disabled: true },
              ]}
              value={tabValue}
              onChange={setTabValue}
              variant="underline"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Pill variant</h3>
            <Tabs
              items={[
                { value: "tab1", label: "Monthly" },
                { value: "tab2", label: "Yearly" },
              ]}
              value={tabValue}
              onChange={setTabValue}
              variant="pill"
            />
          </div>
        </div>
      </Section>

      <Section title="Toggle">
        <div className="space-y-6">
          <div className="flex gap-3 items-center">
            <Toggle pressed={false} onPressedChange={() => {}}>Default</Toggle>
            <Toggle pressed onPressedChange={() => {}}>Pressed</Toggle>
            <Toggle variant="outline" pressed={false} onPressedChange={() => {}}>Outline</Toggle>
            <Toggle disabled>Disabled</Toggle>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Toggle Group — single</h3>
            <ToggleGroup type="single" value={toggleValue} onValueChange={(v: string | string[]) => setToggleValue(v as string)} variant="outline">
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </Section>

      <Section title="Tooltip">
        <div className="flex flex-wrap gap-6 items-center">
          <Tooltip content="This is a tooltip" side="top"><Button variant="outline" size="sm">Hover me (top)</Button></Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom"><Button variant="outline" size="sm">Bottom</Button></Tooltip>
          <Tooltip content="Left tooltip" side="left"><Button variant="outline" size="sm">Left</Button></Tooltip>
          <Tooltip content="Right tooltip" side="right"><Button variant="outline" size="sm">Right</Button></Tooltip>
        </div>
      </Section>

      <Section title="Table">
        <Table striped hoverable>
          <TableHeader>
            <TableRow>
              <TableHead>Policy ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Premium</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: "POL-001", name: "Priya Sharma", type: "Comprehensive", status: "Active", premium: "₹4,835" },
              { id: "POL-002", name: "Rahul Menon", type: "Third Party", status: "Active", premium: "₹2,094" },
              { id: "POL-003", name: "Anita Desai", type: "Own Damage", status: "Pending", premium: "₹3,200" },
              { id: "POL-004", name: "Vikram Singh", type: "Comprehensive", status: "Expired", premium: "₹5,120" },
            ].map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <Badge color={row.status === "Active" ? "green" : row.status === "Pending" ? "orange" : "gray"} variant="solid">
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>{row.premium}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <Section title="Avatar">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
              <Avatar key={s} initials="SP" size={s} />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Avatar initials="AB" size="lg" shape="circle" />
            <Avatar initials="CD" size="lg" shape="square" />
            <Avatar size="lg" />
          </div>
        </div>
      </Section>

      <Section title="Skeleton">
        <div className="space-y-6 max-w-sm">
          <Skeleton variant="text" lines={3} />
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" />
            <div className="flex-1">
              <Skeleton variant="text" />
              <div className="mt-2"><Skeleton variant="text" width="60%" /></div>
            </div>
          </div>
          <Skeleton variant="rounded" width="100%" height={120} animation="wave" />
          <Skeleton variant="rectangular" width="100%" height={80} animation="none" />
        </div>
      </Section>

      <Section title="Navigation Wizard">
        <div className="space-y-8">
          <NavigationWizard
            steps={[
              { label: "Vehicle Details" },
              { label: "Owner Info" },
              { label: "Choose Plan" },
              { label: "Payment" },
            ]}
            currentStep={wizardStep}
            onStepClick={setWizardStep}
          />
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))} disabled={wizardStep === 0}>Back</Button>
            <Button variant="primary" size="sm" onClick={() => setWizardStep(Math.min(3, wizardStep + 1))} disabled={wizardStep === 3}>Next</Button>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Vertical variant</h3>
            <NavigationWizard
              variant="vertical"
              steps={[
                { label: "Step 1", description: "Enter your details" },
                { label: "Step 2", description: "Verify information" },
                { label: "Step 3", description: "Confirmation", status: "error" },
              ]}
              currentStep={1}
            />
          </div>
        </div>
      </Section>

      <Section title="Pagination">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Numbered</h3>
            <Pagination totalPages={20} currentPage={currentPage} onPageChange={setCurrentPage} showInfo />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Simple</h3>
            <Pagination totalPages={20} currentPage={currentPage} onPageChange={setCurrentPage} variant="simple" />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 text-text-muted">Load More</h3>
            <Pagination totalPages={10} currentPage={currentPage} onPageChange={setCurrentPage} variant="load-more" showInfo />
          </div>
        </div>
      </Section>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   App Shell — view toggle + theme switcher
   ═══════════════════════════════════════════════════════════════ */

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [view, setView] = useState<View>("car-insurance");

  const cycleTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <div className="min-h-screen bg-surface text-text-default transition-colors duration-200">
      <header className="flex items-center justify-between px-8 py-5 border-b border-border-subtle">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold text-text-strong">Acko Design System</h1>
          <nav className="flex rounded-full bg-surface-raised p-1 gap-1">
            <button
              onClick={() => setView("components")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                view === "components"
                  ? "bg-primary text-on-primary"
                  : "text-text-muted hover:text-text-strong"
              }`}
            >
              Components
            </button>
            <button
              onClick={() => setView("car-insurance")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                view === "car-insurance"
                  ? "bg-primary text-on-primary"
                  : "text-text-muted hover:text-text-strong"
              }`}
            >
              Car Insurance
            </button>
          </nav>
        </div>
        <div className="flex gap-2">
          {themes.map((t) => (
            <Button key={t} variant={theme === t ? "primary" : "outline"} size="sm" onClick={() => cycleTheme(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>
      </header>

      {view === "components" ? <ComponentsDemo /> : <CarInsurancePage />}
    </div>
  );
}

export default App;
