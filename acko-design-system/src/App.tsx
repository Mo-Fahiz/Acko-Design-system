import { useEffect, useState } from 'react';
import { Button } from './components/Button';
import { TextInput } from './components/TextInput';
import { Dropdown } from './components/Dropdown';
import { Checkbox } from './components/Checkbox';
import { RadioGroup } from './components/Radio';
import { Calendar } from './components/Calendar';
import { Badge, CounterBadge } from './components/Badge';
import { NavigationWizard } from './components/NavigationWizard';
import { Pagination } from './components/Pagination';
import { Card, CardHeader, CardContent, CardFooter, CardInset } from './components/Card';
import { Avatar } from './components/Avatar';
import { Separator } from './components/Separator';
import { Label } from './components/Label';
import { Skeleton } from './components/Skeleton';
import { Switch } from './components/Switch';
import { Textarea } from './components/Textarea';
import { Typography } from './components/Typography';
import { Progress } from './components/Progress';
import { Tooltip } from './components/Tooltip';
import { Alert } from './components/Alert';
import { Tabs } from './components/Tabs';
import { Field } from './components/Field';
import { Toggle, ToggleGroup, ToggleGroupItem } from './components/Toggle';
import { Accordion } from './components/Accordion';
import { Breadcrumb } from './components/Breadcrumb';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from './components/Table';
import { ScrollArea } from './components/ScrollArea';
import { InputGroup } from './components/InputGroup';
import { Search, Mail, Eye, Shield, ChevronRight, Plus, Trash2, Heart, Bell, Car, Plane, HeartPulse, Bike, Umbrella, Gift, Sun, Moon, Settings, Home, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link, Hash, DollarSign, Folder, FileText, Code } from 'lucide-react';
import { generatePalette, applyPaletteToRoot } from './utils/generatePalette';

const ACKO_DEFAULT_HEX = '#582FD2';

const blockStyle: React.CSSProperties = {
  background: 'var(--color-card-bg)',
  border: '1px solid var(--color-card-border)',
  borderRadius: 'var(--radius-3xl)',
  padding: 'var(--space-5) var(--space-6)',
};

const blockLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
  marginBottom: 12,
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  alignItems: 'center',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 20,
};

const sectionGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  maxWidth: 640,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
};

const COMPONENTS = [
  'Button', 'TextInput', 'Textarea', 'Dropdown', 'Checkbox', 'Radio',
  'Switch', 'Calendar', 'Badge', 'Card', 'Avatar', 'Alert', 'Tabs',
  'Typography', 'Label', 'Field', 'Separator', 'Skeleton', 'Progress',
  'Tooltip', 'NavigationWizard', 'Pagination',
  'Toggle', 'Accordion', 'Breadcrumb', 'Table', 'ScrollArea', 'InputGroup',
] as const;

type ComponentName = (typeof COMPONENTS)[number];

function App() {
  const [activeComponent, setActiveComponent] = useState<ComponentName>('Button');

  // Interactive state
  const [inputVal, setInputVal] = useState('');
  const [inputErr, setInputErr] = useState('john@acko');
  const [inputSuccess, setInputSuccess] = useState('john@acko.com');
  const [inputDisabled] = useState('Read only value');
  const [inputSm, setInputSm] = useState('');
  const [inputMd, setInputMd] = useState('');
  const [inputLg, setInputLg] = useState('');
  const [inputRequired, setInputRequired] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [inputDomain, setInputDomain] = useState('');
  const [inputBio, setInputBio] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleNumberState, setVehicleNumberState] = useState<'default' | 'error' | 'success'>('default');
  const [makeModel, setMakeModel] = useState('');

  const validateVehicleNumber = (value: string): boolean => {
    const cleaned = value.replace(/\s/g, '').toUpperCase();
    return /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/.test(cleaned);
  };

  const handleVehicleNumberChange = (value: string) => {
    setVehicleNumber(value);
    const cleaned = value.replace(/\s/g, '');
    if (cleaned.length === 0) setVehicleNumberState('default');
    else if (cleaned.length >= 9) setVehicleNumberState(validateVehicleNumber(value) ? 'success' : 'error');
    else setVehicleNumberState('default');
  };

  const [dropdownVal, setDropdownVal] = useState('');
  const [dropdownMulti, setDropdownMulti] = useState<string[]>([]);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(false);
  const [radio1, setRadio1] = useState('basic');
  const [radio2, setRadio2] = useState('premium');
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [calendarRange, setCalendarRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(Date.now() + 5 * 86400000),
  });
  const [currentPage, setCurrentPage] = useState(5);
  const [wizardStep, setWizardStep] = useState(1);
  const [switchOn, setSwitchOn] = useState(false);
  const [switchOn2, setSwitchOn2] = useState(true);
  const [textareaVal, setTextareaVal] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeTabPill, setActiveTabPill] = useState('all');
  const [progressVal] = useState(65);

  const [toggleBold, setToggleBold] = useState(false);
  const [toggleItalic, setToggleItalic] = useState(false);
  const [toggleUnderline, setToggleUnderline] = useState(false);
  const [toggleGroupVal, setToggleGroupVal] = useState<string | string[]>('left');
  const [toggleMultiVal, setToggleMultiVal] = useState<string | string[]>(['bold']);

  // Organism card state
  const [orgCardReg, setOrgCardReg] = useState('');
  const [orgCardRegState, setOrgCardRegState] = useState<'default' | 'error' | 'success'>('default');
  const [orgCardAlertDismissed, setOrgCardAlertDismissed] = useState(false);

  const handleOrgCardReg = (value: string) => {
    setOrgCardReg(value);
    const cleaned = value.replace(/\s/g, '');
    if (cleaned.length === 0) setOrgCardRegState('default');
    else if (cleaned.length >= 9) setOrgCardRegState(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/.test(cleaned.toUpperCase()) ? 'success' : 'error');
    else setOrgCardRegState('default');
  };

  const [previewTab, setPreviewTab] = useState<'policies' | 'claims' | 'rewards'>('policies');
  const [previewNotifications, setPreviewNotifications] = useState(true);
  const [previewMarketing, setPreviewMarketing] = useState(false);
  const [previewAccordionOpen, setPreviewAccordionOpen] = useState<string | null>('car');

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    applyPaletteToRoot(generatePalette(ACKO_DEFAULT_HEX));
  }, []);

  const dropdownOptions = [
    { value: 'car', label: 'Car insurance' },
    { value: 'bike', label: 'Bike insurance' },
    { value: 'health', label: 'Health insurance' },
    { value: 'travel', label: 'Travel insurance', disabled: true },
    { value: 'home', label: 'Home insurance' },
  ];

  const groupedOptions = [
    { value: 'sedan', label: 'Sedan', group: 'Cars' },
    { value: 'suv', label: 'SUV', group: 'Cars' },
    { value: 'hatch', label: 'Hatchback', group: 'Cars' },
    { value: 'sport', label: 'Sport bike', group: 'Bikes' },
    { value: 'cruiser', label: 'Cruiser', group: 'Bikes' },
    { value: 'scooter', label: 'Scooter', group: 'Bikes' },
  ];

  const radioOptions = [
    { value: 'basic', label: 'Basic', description: 'Third-party only' },
    { value: 'standard', label: 'Standard', description: 'Comprehensive cover' },
    { value: 'premium', label: 'Premium', description: 'Zero depreciation' },
  ];

  const wizardSteps = [
    { label: 'Vehicle', description: 'Vehicle details' },
    { label: 'Personal', description: 'Your info' },
    { label: 'Coverage', description: 'Select plan' },
    { label: 'Payment', description: 'Review & pay' },
  ];

  const renderContent = () => {
    switch (activeComponent) {
      case 'Button':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Variants</div>
              <div style={rowStyle}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With icons</div>
              <div style={rowStyle}>
                <Button variant="primary" iconLeft={<Plus />}>Add item</Button>
                <Button variant="outline" iconRight={<ChevronRight />}>Continue</Button>
                <Button variant="danger" iconLeft={<Trash2 />}>Delete</Button>
                <Button variant="ghost" iconLeft={<Heart />}>Favourite</Button>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Full width</div>
              <Button variant="primary" fullWidth>Full width primary</Button>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes</div>
              <div style={rowStyle}>
                <Button variant="primary" size="xs">Extra small</Button>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" size="xl">Extra large</Button>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Icon only</div>
              <div style={rowStyle}>
                <Button variant="primary" iconOnly size="sm"><Search /></Button>
                <Button variant="secondary" iconOnly size="md"><Shield /></Button>
                <Button variant="outline" iconOnly size="lg"><Plus /></Button>
              </div>
            </div>
          </div>
        );

      case 'TextInput':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextInput label="Small" placeholder="Enter text" value={inputSm} onChange={setInputSm} size="sm" />
                <TextInput label="Medium (default)" placeholder="Enter text" value={inputMd} onChange={setInputMd} size="md" />
                <TextInput label="Large" placeholder="Enter text" value={inputLg} onChange={setInputLg} size="lg" />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>States</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextInput label="Default" placeholder="Type something..." value={inputVal} onChange={setInputVal} helperText="This is helper text" />
                <TextInput label="Error state" value={inputErr} onChange={setInputErr} state="error" errorText="Please enter a valid email address" type="email" />
                <TextInput label="Success state" value={inputSuccess} onChange={setInputSuccess} state="success" helperText="Email is valid" />
                <TextInput label="Disabled" value="" onChange={() => {}} disabled placeholder="Disabled input" />
                <TextInput label="Read only" value={inputDisabled} onChange={() => {}} readOnly />
                <TextInput label="Required field" placeholder="Required" value={inputRequired} onChange={setInputRequired} required />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With icons, prefix, suffix</div>
              <div style={gridStyle}>
                <TextInput label="Search" placeholder="Search policies..." value={inputSearch} onChange={setInputSearch} iconLeft={<Search size={18} />} />
                <TextInput label="Email" placeholder="you@example.com" value={inputEmail} onChange={setInputEmail} iconLeft={<Mail size={18} />} type="email" autoComplete="email" />
                <TextInput label="Password" placeholder="Enter password" value={inputPassword} onChange={setInputPassword} type="password" iconRight={<Eye size={18} />} />
                <TextInput label="Amount" placeholder="0.00" value={inputAmount} onChange={setInputAmount} prefix="₹" type="number" />
                <TextInput label="Domain" placeholder="yoursite" value={inputDomain} onChange={setInputDomain} suffix=".com" />
                <TextInput label="Bio" placeholder="Write about yourself" value={inputBio} onChange={setInputBio} maxLength={100} />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Form example</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextInput label="Vehicle number" placeholder="KA 01 AB 1234" value={vehicleNumber} onChange={handleVehicleNumberChange} size="md" state={vehicleNumberState} errorText="Please enter a valid vehicle number" helperText={vehicleNumberState === 'success' ? 'Valid vehicle number' : 'Format: KA 01 AB 1234'} />
                <TextInput label="Make and model" placeholder="e.g. Maruti Swift VXI" value={makeModel} onChange={setMakeModel} size="md" />
              </div>
            </div>
          </div>
        );

      case 'Textarea':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Default</div>
              <Textarea placeholder="Describe the incident in detail..." value={textareaVal} onChange={setTextareaVal} fullWidth />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>States</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Textarea placeholder="Error state" value="Invalid description" onChange={() => {}} state="error" errorText="Description must be at least 20 characters" fullWidth />
                <Textarea placeholder="Disabled" value="" onChange={() => {}} disabled fullWidth />
              </div>
            </div>
          </div>
        );

      case 'Dropdown':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Single select</div>
              <Dropdown label="Insurance type" placeholder="Choose insurance type" options={dropdownOptions} value={dropdownVal} onChange={(v) => setDropdownVal(v as string)} helperText="Pick one option" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Multi select</div>
              <Dropdown label="Select multiple" placeholder="Select multiple" options={dropdownOptions} value={dropdownMulti} onChange={(v) => setDropdownMulti(v as string[])} variant="multi" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Searchable</div>
              <Dropdown label="Search and select" placeholder="Search and select..." options={dropdownOptions} value={dropdownSearch} onChange={(v) => setDropdownSearch(v as string)} variant="searchable" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Grouped</div>
              <Dropdown label="Vehicle type" placeholder="Select vehicle type" options={groupedOptions} value="" onChange={() => {}} variant="grouped" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Error state</div>
              <Dropdown label="Required field" placeholder="Required field" options={dropdownOptions} value="" onChange={() => {}} state="error" errorText="Please select an option" required />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Disabled</div>
              <Dropdown label="Cannot select" placeholder="Cannot select" options={dropdownOptions} value="" onChange={() => {}} disabled />
            </div>
          </div>
        );

      case 'Checkbox':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes</div>
              <div style={rowStyle}>
                <Checkbox label="Small" checked={check1} onChange={setCheck1} size="sm" />
                <Checkbox label="Medium" checked={check1} onChange={setCheck1} size="md" />
                <Checkbox label="Large" checked={check1} onChange={setCheck1} size="lg" />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>States</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Checkbox label="Unchecked" checked={check1} onChange={setCheck1} />
                <Checkbox label="Checked" checked={check2} onChange={setCheck2} />
                <Checkbox label="Indeterminate" checked={false} indeterminate onChange={setCheck3} />
                <Checkbox label="Disabled unchecked" checked={false} onChange={() => {}} disabled />
                <Checkbox label="Disabled checked" checked={true} onChange={() => {}} disabled />
                <Checkbox label="Error state" checked={check3} onChange={setCheck3} error />
                <Checkbox label="With description" description="Receive email notifications about policy updates" checked={check2} onChange={setCheck2} />
              </div>
            </div>
          </div>
        );

      case 'Radio':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Default (vertical)</div>
              <RadioGroup label="Select your plan" options={radioOptions} value={radio1} onChange={setRadio1} />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Horizontal</div>
              <RadioGroup label="Fuel type" options={[{ value: 'petrol', label: 'Petrol' }, { value: 'diesel', label: 'Diesel' }, { value: 'electric', label: 'Electric' }, { value: 'cng', label: 'CNG' }]} value="petrol" onChange={() => {}} orientation="horizontal" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Card variant</div>
              <RadioGroup label="Choose coverage" options={radioOptions} value={radio2} onChange={setRadio2} variant="card" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes</div>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <RadioGroup label="Small" options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]} value="a" onChange={() => {}} size="sm" />
                <RadioGroup label="Medium" options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]} value="a" onChange={() => {}} size="md" />
                <RadioGroup label="Large" options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]} value="a" onChange={() => {}} size="lg" />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>States</div>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <RadioGroup label="Disabled" options={radioOptions} value="basic" onChange={() => {}} disabled />
                <RadioGroup label="Error" options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]} value="" onChange={() => {}} error />
              </div>
            </div>
          </div>
        );

      case 'Switch':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes & States</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Switch size="sm" checked={switchOn} onChange={setSwitchOn} label="Small switch" />
                <Switch size="md" checked={switchOn2} onChange={setSwitchOn2} label="Medium switch (on)" />
                <Switch disabled label="Disabled" />
                <Switch disabled checked label="Disabled (on)" />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Use Case</div>
              <Card variant="outline" padding="md">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-strong)', margin: 0 }}>Email notifications</p>
                    <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: '4px 0 0' }}>Receive policy updates via email</p>
                  </div>
                  <Switch checked={switchOn} onChange={setSwitchOn} />
                </div>
              </Card>
            </div>
          </div>
        );

      case 'Calendar':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Single date (dropdown)</div>
              <div style={{ maxWidth: 320 }}>
                <Calendar variant="single" display="dropdown" value={calendarDate} onChange={(d) => setCalendarDate(d as Date)} />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With min/max dates</div>
              <div style={{ maxWidth: 320 }}>
                <Calendar variant="single" display="inline" value={new Date()} onChange={() => {}} minDate={new Date(Date.now() - 7 * 86400000)} maxDate={new Date(Date.now() + 30 * 86400000)} />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Range selection (inline)</div>
              <Calendar variant="range" display="inline" value={calendarRange} onChange={(v) => setCalendarRange(v as { start: Date; end: Date })} />
            </div>
          </div>
        );

      case 'Badge':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Solid (all colors)</div>
              <div style={rowStyle}>
                <Badge color="purple">Purple</Badge>
                <Badge color="green">Active</Badge>
                <Badge color="blue">Info</Badge>
                <Badge color="orange">Pending</Badge>
                <Badge color="pink">Expired</Badge>
                <Badge color="gray">Archived</Badge>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Outline</div>
              <div style={rowStyle}>
                <Badge variant="outline" color="purple">Purple</Badge>
                <Badge variant="outline" color="green">Active</Badge>
                <Badge variant="outline" color="blue">Info</Badge>
                <Badge variant="outline" color="orange">Pending</Badge>
                <Badge variant="outline" color="pink">Expired</Badge>
                <Badge variant="outline" color="gray">Archived</Badge>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Dot variant</div>
              <div style={rowStyle}>
                <Badge variant="dot" color="green">Connected</Badge>
                <Badge variant="dot" color="orange">Processing</Badge>
                <Badge variant="dot" color="pink">Error</Badge>
                <Badge variant="dot" color="gray">Offline</Badge>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes</div>
              <div style={rowStyle}>
                <Badge size="sm" color="purple">Small</Badge>
                <Badge size="md" color="purple">Medium</Badge>
                <Badge size="lg" color="purple">Large</Badge>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Removable</div>
              <div style={rowStyle}>
                <Badge color="purple" removable onRemove={() => {}}>Removable</Badge>
                <Badge color="blue" removable onRemove={() => {}}>Tag</Badge>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Counter badges</div>
              <div style={rowStyle}>
                <CounterBadge count={5} />
                <CounterBadge count={42} color="pink" />
                <CounterBadge count={150} max={99} color="blue" />
              </div>
            </div>
          </div>
        );

      case 'Card':
        return (
          <div style={sectionGridStyle}>

            {/* ── Organism card — nested radius demonstration ── */}
            <div style={blockLabelStyle}>Organism card · nested radius (R2 = R1 + D)</div>
            <Card padding="lg" variant="default">
              {/* Header row: icon box + title + badge */}
              <CardHeader>
                {/*
                  Nested radius math:
                  Outer card R2 = 16px (--radius-3xl)
                  Card padding D = 24px (--space-6 / padding_lg)
                  Because D > R2, inner rectangular elements use 0 → sharp corners.
                  The icon box below uses --radius-inner (4px) as a deliberate soft
                  minimum so it doesn't look harsh — a 4px is the smallest in the scale.
                */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-sm)',   /* R1 = max(R2−D, radius-sm) = 4px */
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Car size={18} color="var(--color-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-strong)' }}>Car Insurance</span>
                    <Badge color="green" size="sm" variant="solid">Active</Badge>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>Policy #MH12XY4321 · Expires Nov 2025</p>
                </div>
              </CardHeader>

              <CardContent>
                {/* CardInset — applies the nested radius rule automatically.
                    R2=16px, D=24px (padding_lg) → R1 = floor = 4px (--radius-sm) */}
                <CardInset style={{ marginBottom: 'var(--space-4)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                  {[
                    { label: 'Plan', value: 'Comprehensive' },
                    { label: 'IDV', value: '₹6,40,000' },
                    { label: 'NCB', value: '20%' },
                    { label: 'Add-ons', value: 'Zero dep' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{label}</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-strong)', margin: 0 }}>{value}</p>
                    </div>
                  ))}
                </CardInset>

                {/* Subtle description text */}
                <p style={{ fontSize: 13, color: 'var(--color-text-subtle)', lineHeight: 1.6, margin: '0 0 var(--space-4)' }}>
                  Your policy is up for renewal in <strong style={{ color: 'var(--color-text-default)' }}>12 days</strong>. Lock in your current premium to avoid the price revision effective December 1.
                </p>

                {/* Alert — inline contextual warning */}
                {!orgCardAlertDismissed && (
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <Alert
                      variant="warning"
                      title="Premium increase incoming"
                      dismissible
                      onDismiss={() => setOrgCardAlertDismissed(true)}
                    >
                      Rates go up by ~8% after Nov 30. Renew now to save ₹640.
                    </Alert>
                  </div>
                )}

                {/* Input field */}
                <TextInput
                  label="Vehicle registration number"
                  placeholder="MH 12 XY 4321"
                  value={orgCardReg}
                  onChange={handleOrgCardReg}
                  state={orgCardRegState}
                  errorText={orgCardRegState === 'error' ? 'Enter a valid registration number (e.g. KA 01 AB 1234)' : undefined}
                  helperText={orgCardRegState !== 'error' ? 'We will pre-fill your vehicle details' : undefined}
                  size="md"
                />
              </CardContent>

              <CardFooter>
                <Button variant="ghost" size="sm">View policy</Button>
                <Button variant="primary" size="sm" iconRight={<ChevronRight size={15} />}>Renew now</Button>
              </CardFooter>
            </Card>

            <Separator />

            {/* ── Variant gallery ── */}
            <div style={blockLabelStyle}>Variants</div>
            <Card variant="elevated" padding="md"><p style={{ fontSize: 14, color: 'var(--color-text-default)', margin: 0 }}>Elevated — white fill, drop shadow</p></Card>
            <Card variant="outline" padding="md"><p style={{ fontSize: 14, color: 'var(--color-text-default)', margin: 0 }}>Outline — transparent fill, border stroke</p></Card>
            <Card variant="demoted" padding="md"><p style={{ fontSize: 14, color: 'var(--color-text-default)', margin: 0 }}>Demoted — surface fill, subtle border</p></Card>
          </div>
        );

      case 'Avatar':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes</div>
              <div style={rowStyle}>
                <Avatar size="xs" initials="A" />
                <Avatar size="sm" initials="MF" />
                <Avatar size="md" initials="DS" />
                <Avatar size="lg" initials="AK" />
                <Avatar size="xl" initials="UI" />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Variants</div>
              <div style={rowStyle}>
                <Avatar size="md" src="https://i.pravatar.cc/80?img=12" alt="User" />
                <Avatar size="md" initials="JD" />
                <Avatar size="md" />
                <Avatar size="md" shape="square" initials="SQ" />
                <Avatar size="md" shape="square" />
              </div>
            </div>
          </div>
        );

      case 'Alert':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Alert variant="info" title="Policy renewal">Your car insurance expires on March 15, 2026. Renew now to avoid a lapse.</Alert>
            <Alert variant="success" title="Payment successful">Your premium of ₹4,299 has been processed successfully.</Alert>
            <Alert variant="warning" title="Document pending">Please upload your RC copy to complete the claim process.</Alert>
            <Alert variant="error" title="Claim rejected" dismissible>Your claim #CLM-2847 was rejected due to incomplete documentation.</Alert>
          </div>
        );

      case 'Tabs':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Underline</div>
              <Tabs items={[{ value: 'overview', label: 'Overview', icon: <Home size={16} /> }, { value: 'claims', label: 'Claims', icon: <Shield size={16} /> }, { value: 'settings', label: 'Settings', icon: <Settings size={16} /> }, { value: 'disabled', label: 'Archived', disabled: true }]} value={activeTab} onChange={setActiveTab} />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Pill</div>
              <Tabs items={[{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }, { value: 'expired', label: 'Expired' }]} value={activeTabPill} onChange={setActiveTabPill} variant="pill" />
              <div style={{ marginTop: 16 }}>
                <Tabs items={[{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }, { value: 'expired', label: 'Expired' }]} value={activeTabPill} onChange={setActiveTabPill} variant="pill" size="sm" fullWidth />
              </div>
            </div>
          </div>
        );

      case 'Typography': {
        const typeSpecStyle: React.CSSProperties = {
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginTop: 4,
        };
        const specTagStyle: React.CSSProperties = {
          fontSize: 11,
          fontWeight: 500,
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-surface)',
          color: 'var(--color-text-muted)',
          border: '1px solid var(--color-border-subtle)',
          whiteSpace: 'nowrap',
        };
        const typeSectionStyle: React.CSSProperties = {
          paddingBottom: 20,
          borderBottom: '1px solid var(--color-border-subtle)',
        };
        return (
          <div style={sectionGridStyle}>
            {/* Font family */}
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Font Family</div>
              <Typography variant="heading-lg">Euclid Circular B</Typography>
              <div style={{ marginTop: 8, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 300, fontSize: 16, color: 'var(--color-text-default)' }}>Light 300</span>
                <span style={{ fontWeight: 400, fontSize: 16, color: 'var(--color-text-default)' }}>Regular 400</span>
                <span style={{ fontWeight: 500, fontSize: 16, color: 'var(--color-text-default)' }}>Medium 500</span>
                <span style={{ fontWeight: 600, fontSize: 16, color: 'var(--color-text-default)' }}>Semibold 600</span>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-text-default)' }}>Bold 700</span>
              </div>
            </div>

            {/* Display */}
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Display</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={typeSectionStyle}>
                  <Typography variant="display-xl">Display XL</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>72px</span>
                    <span style={specTagStyle}>Line: 80px</span>
                    <span style={specTagStyle}>Tracking: -2px</span>
                    <span style={specTagStyle}>Bold 700</span>
                    <span style={specTagStyle}>&lt;h1&gt;</span>
                    <span style={specTagStyle}>Marketing hero headlines</span>
                  </div>
                </div>
                <div style={typeSectionStyle}>
                  <Typography variant="display-lg">Display LG</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>56px</span>
                    <span style={specTagStyle}>Line: 64px</span>
                    <span style={specTagStyle}>Tracking: -1.5px</span>
                    <span style={specTagStyle}>Bold 700</span>
                    <span style={specTagStyle}>&lt;h1&gt;</span>
                    <span style={specTagStyle}>Secondary marketing headlines</span>
                  </div>
                </div>
                <div style={typeSectionStyle}>
                  <Typography variant="display-md">Display MD</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>48px</span>
                    <span style={specTagStyle}>Line: 56px</span>
                    <span style={specTagStyle}>Tracking: -1px</span>
                    <span style={specTagStyle}>Bold 700</span>
                    <span style={specTagStyle}>&lt;h1&gt;</span>
                    <span style={specTagStyle}>Section hero text</span>
                  </div>
                </div>
                <div>
                  <Typography variant="display-sm">Display SM</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>40px</span>
                    <span style={specTagStyle}>Line: 48px</span>
                    <span style={specTagStyle}>Tracking: -0.5px</span>
                    <span style={specTagStyle}>Semibold 600</span>
                    <span style={specTagStyle}>&lt;h2&gt;</span>
                    <span style={specTagStyle}>Feature headlines</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Headings */}
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Headings</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={typeSectionStyle}>
                  <Typography variant="heading-xl">Heading XL — Page Titles</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>32px</span>
                    <span style={specTagStyle}>Line: 40px</span>
                    <span style={specTagStyle}>Tracking: -0.5px</span>
                    <span style={specTagStyle}>Semibold 600</span>
                    <span style={specTagStyle}>&lt;h1&gt;</span>
                    <span style={specTagStyle}>Page titles, dashboard headers</span>
                  </div>
                </div>
                <div style={typeSectionStyle}>
                  <Typography variant="heading-lg">Heading LG — Section Headings</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>24px</span>
                    <span style={specTagStyle}>Line: 32px</span>
                    <span style={specTagStyle}>Tracking: -0.3px</span>
                    <span style={specTagStyle}>Semibold 600</span>
                    <span style={specTagStyle}>&lt;h2&gt;</span>
                    <span style={specTagStyle}>Section headings, modal titles</span>
                  </div>
                </div>
                <div style={typeSectionStyle}>
                  <Typography variant="heading-md">Heading MD — Card Titles</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>20px</span>
                    <span style={specTagStyle}>Line: 28px</span>
                    <span style={specTagStyle}>Tracking: -0.2px</span>
                    <span style={specTagStyle}>Semibold 600</span>
                    <span style={specTagStyle}>&lt;h3&gt;</span>
                    <span style={specTagStyle}>Card titles, subsection headings</span>
                  </div>
                </div>
                <div>
                  <Typography variant="heading-sm">Heading SM — Minor Headings</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>18px</span>
                    <span style={specTagStyle}>Line: 24px</span>
                    <span style={specTagStyle}>Tracking: 0</span>
                    <span style={specTagStyle}>Semibold 600</span>
                    <span style={specTagStyle}>&lt;h4&gt;</span>
                    <span style={specTagStyle}>Sidebar sections, minor headings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Body</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={typeSectionStyle}>
                  <Typography variant="body-lg">Body Large — Insurance that's simple, affordable, and instant. Get covered in under 2 minutes.</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>18px</span>
                    <span style={specTagStyle}>Line: 28px</span>
                    <span style={specTagStyle}>Tracking: 0</span>
                    <span style={specTagStyle}>Regular 400</span>
                    <span style={specTagStyle}>&lt;p&gt;</span>
                    <span style={specTagStyle}>Lead paragraphs, prominent body text</span>
                  </div>
                </div>
                <div style={typeSectionStyle}>
                  <Typography variant="body-md">Body Medium — Comprehensive coverage for your car, bike, and health. Zero paperwork, 100% digital claims.</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>16px</span>
                    <span style={specTagStyle}>Line: 24px</span>
                    <span style={specTagStyle}>Tracking: 0</span>
                    <span style={specTagStyle}>Regular 400</span>
                    <span style={specTagStyle}>&lt;p&gt;</span>
                    <span style={specTagStyle}>Default body text, form descriptions</span>
                  </div>
                </div>
                <div>
                  <Typography variant="body-sm">Body Small — Terms and conditions apply. Please read the policy document carefully before purchasing.</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>14px</span>
                    <span style={specTagStyle}>Line: 20px</span>
                    <span style={specTagStyle}>Tracking: 0</span>
                    <span style={specTagStyle}>Regular 400</span>
                    <span style={specTagStyle}>&lt;p&gt;</span>
                    <span style={specTagStyle}>Secondary content, table cells — min body size</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Labels</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={typeSectionStyle}>
                  <Typography variant="label-lg">Label Large — Form input labels, field names</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>14px</span>
                    <span style={specTagStyle}>Line: 20px</span>
                    <span style={specTagStyle}>Tracking: 0.1px</span>
                    <span style={specTagStyle}>Medium 500</span>
                    <span style={specTagStyle}>&lt;label&gt;</span>
                    <span style={specTagStyle}>Form labels, input labels</span>
                  </div>
                </div>
                <div style={typeSectionStyle}>
                  <Typography variant="label-md">Label Medium — Compact metadata labels</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>12px</span>
                    <span style={specTagStyle}>Line: 16px</span>
                    <span style={specTagStyle}>Tracking: 0.2px</span>
                    <span style={specTagStyle}>Medium 500</span>
                    <span style={specTagStyle}>&lt;label&gt;</span>
                    <span style={specTagStyle}>Compact labels, metadata</span>
                  </div>
                </div>
                <div>
                  <Typography variant="label-sm">Label Small — Calendar weekdays, group headings</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>11px</span>
                    <span style={specTagStyle}>Line: 14px</span>
                    <span style={specTagStyle}>Tracking: 0.3px</span>
                    <span style={specTagStyle}>Medium 500</span>
                    <span style={specTagStyle}>&lt;label&gt;</span>
                    <span style={specTagStyle}>Calendar weekdays, group headings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Utility */}
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Utility</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={typeSectionStyle}>
                  <Typography variant="caption" color="muted">Caption — Last updated: Feb 2026. Helper text, timestamps, and descriptions.</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>12px</span>
                    <span style={specTagStyle}>Line: 16px</span>
                    <span style={specTagStyle}>Tracking: 0</span>
                    <span style={specTagStyle}>Regular 400</span>
                    <span style={specTagStyle}>&lt;span&gt;</span>
                    <span style={specTagStyle}>Helper text, timestamps</span>
                  </div>
                </div>
                <div>
                  <Typography variant="overline" color="muted">Overline — New Feature</Typography>
                  <div style={typeSpecStyle}>
                    <span style={specTagStyle}>11px</span>
                    <span style={specTagStyle}>Line: 16px</span>
                    <span style={specTagStyle}>Tracking: 0.5px</span>
                    <span style={specTagStyle}>Semibold 600</span>
                    <span style={specTagStyle}>&lt;span&gt;</span>
                    <span style={specTagStyle}>UPPERCASE · Category labels, section overlines</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Color variants */}
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Color Variants</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Typography variant="body-md" color="strong">Strong — Primary emphasis text</Typography>
                <Typography variant="body-md" color="default">Default — Standard body text</Typography>
                <Typography variant="body-md" color="muted">Muted — Secondary or placeholder</Typography>
                <Typography variant="body-md" color="disabled">Disabled — Inactive state</Typography>
                <Typography variant="body-md" color="primary">Primary — Brand accent / links</Typography>
                <Typography variant="body-md" color="error">Error — Validation / destructive</Typography>
                <Typography variant="body-md" color="success">Success — Confirmation / positive</Typography>
              </div>
            </div>

            {/* Design rules */}
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Design Rules</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <Typography variant="label-lg" color="strong">Minimum Sizes</Typography>
                  <Typography variant="body-sm" color="muted">Body text: never below 14px · UI labels: 11px minimum · Interactive elements: 12px minimum</Typography>
                </div>
                <div>
                  <Typography variant="label-lg" color="strong">Line-Height Ratios</Typography>
                  <Typography variant="body-sm" color="muted">Display: ~1.1x (tight for impact) · Headings: ~1.25–1.33x (balanced) · Body: ~1.43–1.56x (comfortable reading) · Labels: ~1.27–1.33x (compact)</Typography>
                </div>
                <div>
                  <Typography variant="label-lg" color="strong">Letter Spacing</Typography>
                  <Typography variant="body-sm" color="muted">Display/Headings ≥20px: negative tracking (-0.2 to -2px) · Body 14–18px: neutral (0) · Labels/Overlines ≤14px: positive tracking (+0.1 to +0.5px)</Typography>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'Label':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>States</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Label>Default label</Label>
                <Label required>Required label</Label>
                <Label disabled>Disabled label</Label>
                <Label size="sm">Small label</Label>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With Form Control</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Label htmlFor="demo-input" required>Email address</Label>
                <TextInput id="demo-input" label="" placeholder="john@acko.com" value="" onChange={() => {}} />
              </div>
            </div>
          </div>
        );

      case 'Field':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Default</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field label="Full name" required htmlFor="field-name"><TextInput id="field-name" label="" placeholder="Enter your full name" value="" onChange={() => {}} /></Field>
                <Field label="Email" htmlFor="field-email" helperText="We'll never share your email"><TextInput id="field-email" label="" placeholder="john@example.com" value="" onChange={() => {}} /></Field>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Error & Disabled</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field label="Phone number" required errorText="Please enter a valid phone number" htmlFor="field-phone"><TextInput id="field-phone" label="" placeholder="+91 98765 43210" value="12345" onChange={() => {}} state="error" /></Field>
                <Field label="Policy ID" disabled htmlFor="field-policy"><TextInput id="field-policy" label="" placeholder="Auto-generated" value="POL-2026-0042" onChange={() => {}} disabled /></Field>
              </div>
            </div>
          </div>
        );

      case 'Separator':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Horizontal</div>
              <p style={{ fontSize: 14, color: 'var(--color-text-default)', margin: '0 0 12px' }}>Content above</p>
              <Separator />
              <p style={{ fontSize: 14, color: 'var(--color-text-default)', margin: '12px 0 0' }}>Content below</p>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With Label</div>
              <Separator label="or continue with" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, height: 60 }}>
                <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Left</span>
                <Separator orientation="vertical" />
                <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Right</span>
              </div>
            </div>
          </div>
        );

      case 'Skeleton':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Variants</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
                <Skeleton variant="rounded" height={120} />
                <Skeleton variant="text" lines={3} />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Wave Animation</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Skeleton variant="circular" width={48} height={48} animation="wave" />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Skeleton variant="text" width="70%" animation="wave" />
                    <Skeleton variant="text" width="50%" animation="wave" />
                  </div>
                </div>
                <Skeleton variant="rectangular" height={100} animation="wave" />
              </div>
            </div>
          </div>
        );

      case 'Progress':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes & Colors</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Progress value={progressVal} size="sm" showLabel />
                <Progress value={80} size="md" color="success" showLabel />
                <Progress value={30} size="lg" color="error" showLabel />
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Animated</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Progress value={progressVal} size="md" animated label="Uploading documents..." />
                <Progress value={100} size="md" color="success" label="Claim approved" />
              </div>
            </div>
          </div>
        );

      case 'Tooltip':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Positions</div>
              <div style={{ ...rowStyle, gap: 24, padding: '20px 0' }}>
                <Tooltip content="Top tooltip" side="top"><Button variant="outline" size="sm">Top</Button></Tooltip>
                <Tooltip content="Bottom tooltip" side="bottom"><Button variant="outline" size="sm">Bottom</Button></Tooltip>
                <Tooltip content="Left tooltip" side="left"><Button variant="outline" size="sm">Left</Button></Tooltip>
                <Tooltip content="Right tooltip" side="right"><Button variant="outline" size="sm">Right</Button></Tooltip>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Use Case</div>
              <div style={{ ...rowStyle, gap: 16, padding: '20px 0' }}>
                <Tooltip content="View your saved policies"><Button variant="secondary" size="sm" iconLeft={<Shield size={16} />}>Policies</Button></Tooltip>
                <Tooltip content="Manage notifications" side="bottom"><Button variant="ghost" size="sm" iconOnly><Bell size={18} /></Button></Tooltip>
              </div>
            </div>
          </div>
        );

      case 'NavigationWizard':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Horizontal</div>
              <NavigationWizard steps={wizardSteps} currentStep={wizardStep} onStepClick={setWizardStep} />
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <Button variant="outline" size="sm" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))}>Previous</Button>
                <Button variant="primary" size="sm" onClick={() => setWizardStep(Math.min(3, wizardStep + 1))}>Next</Button>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Vertical</div>
              <NavigationWizard steps={wizardSteps} currentStep={2} variant="vertical" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Compact</div>
              <NavigationWizard steps={wizardSteps} currentStep={1} variant="compact" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With error step</div>
              <NavigationWizard steps={[{ label: 'Vehicle', status: 'completed' }, { label: 'Personal', status: 'completed' }, { label: 'Coverage', status: 'error' }, { label: 'Payment', status: 'upcoming' }]} currentStep={2} />
            </div>
          </div>
        );

      case 'Pagination':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Numbered (with info)</div>
              <Pagination totalPages={20} currentPage={currentPage} onPageChange={setCurrentPage} showInfo />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Simple</div>
              <Pagination totalPages={20} currentPage={currentPage} onPageChange={setCurrentPage} variant="simple" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Compact</div>
              <Pagination totalPages={20} currentPage={currentPage} onPageChange={setCurrentPage} variant="compact" />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Load more</div>
              <Pagination totalPages={20} currentPage={currentPage} onPageChange={setCurrentPage} variant="load-more" showInfo />
            </div>
          </div>
        );

      case 'Toggle':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Standalone toggle</div>
              <div style={rowStyle}>
                <Toggle pressed={toggleBold} onPressedChange={setToggleBold} size="sm"><Bold size={16} /></Toggle>
                <Toggle pressed={toggleItalic} onPressedChange={setToggleItalic} size="sm"><Italic size={16} /></Toggle>
                <Toggle pressed={toggleUnderline} onPressedChange={setToggleUnderline} size="sm" variant="outline"><Underline size={16} /></Toggle>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Toggle group — single</div>
              <ToggleGroup type="single" value={toggleGroupVal} onValueChange={setToggleGroupVal} size="sm">
                <ToggleGroupItem value="left"><AlignLeft size={16} /></ToggleGroupItem>
                <ToggleGroupItem value="center"><AlignCenter size={16} /></ToggleGroupItem>
                <ToggleGroupItem value="right"><AlignRight size={16} /></ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Toggle group — multiple</div>
              <ToggleGroup type="multiple" value={toggleMultiVal} onValueChange={setToggleMultiVal} variant="outline">
                <ToggleGroupItem value="bold"><Bold size={16} /></ToggleGroupItem>
                <ToggleGroupItem value="italic"><Italic size={16} /></ToggleGroupItem>
                <ToggleGroupItem value="underline"><Underline size={16} /></ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Toggle pressed size="sm"><Bold size={14} /></Toggle>
                <Toggle pressed size="md"><Bold size={16} /></Toggle>
                <Toggle pressed size="lg"><Bold size={18} /></Toggle>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Disabled</div>
              <div style={rowStyle}>
                <Toggle pressed disabled><Bold size={16} /></Toggle>
                <Toggle variant="outline" disabled><Italic size={16} /></Toggle>
              </div>
            </div>
          </div>
        );

      case 'Accordion':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Single — collapsible</div>
              <Accordion
                type="single"
                collapsible
                items={[
                  { value: 'q1', trigger: 'What is comprehensive cover?', content: 'Comprehensive cover protects against damages to your own vehicle as well as third-party liability. It covers theft, natural disasters, personal accident, and more.' },
                  { value: 'q2', trigger: 'How do I file a claim?', content: 'You can file a claim through the app in under 2 minutes. Go to "My Policies", select the policy, and tap "File a Claim". Our team will guide you through the process.' },
                  { value: 'q3', trigger: 'Can I transfer my NCB?', content: 'Yes, your No Claim Bonus (NCB) can be transferred when switching insurers. You will need a certificate from your previous insurer as proof.' },
                ]}
                defaultValue="q1"
              />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Multiple — all expandable</div>
              <Accordion
                type="multiple"
                items={[
                  { value: 'a', trigger: 'Vehicle details', content: 'Enter your vehicle registration number, make, model, and year of manufacture to get an accurate quote.' },
                  { value: 'b', trigger: 'Personal information', content: 'We need your name, email, phone number, and address for policy issuance and communication.' },
                  { value: 'c', trigger: 'Payment options', content: 'We accept UPI, credit/debit cards, net banking, and EMI options for premium payment.' },
                  { value: 'd', trigger: 'Disabled item', content: 'This item cannot be expanded.', disabled: true },
                ]}
                defaultValue={['a', 'b']}
              />
            </div>
          </div>
        );

      case 'Breadcrumb':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Default</div>
              <Breadcrumb items={[
                { label: 'Home', href: '#' },
                { label: 'Insurance', href: '#' },
                { label: 'Car', href: '#' },
                { label: 'Quote' },
              ]} />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With icons</div>
              <Breadcrumb items={[
                { label: 'Home', href: '#', icon: <Home size={14} /> },
                { label: 'Components', href: '#', icon: <Folder size={14} /> },
                { label: 'Breadcrumb', icon: <FileText size={14} /> },
              ]} />
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Collapsed (maxItems=3)</div>
              <Breadcrumb
                maxItems={3}
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Insurance', href: '#' },
                  { label: 'Motor', href: '#' },
                  { label: 'Car', href: '#' },
                  { label: 'Maruti Suzuki', href: '#' },
                  { label: 'Quote' },
                ]}
              />
            </div>
          </div>
        );

      case 'Table':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Striped + Hoverable</div>
              <Table striped hoverable>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>POL-001</TableCell>
                    <TableCell>Car</TableCell>
                    <TableCell>₹12,500</TableCell>
                    <TableCell><Badge color="green" size="sm">Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>POL-002</TableCell>
                    <TableCell>Health</TableCell>
                    <TableCell>₹8,200</TableCell>
                    <TableCell><Badge color="green" size="sm">Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>POL-003</TableCell>
                    <TableCell>Bike</TableCell>
                    <TableCell>₹3,100</TableCell>
                    <TableCell><Badge color="orange" size="sm">Expiring</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>POL-004</TableCell>
                    <TableCell>Travel</TableCell>
                    <TableCell>₹4,600</TableCell>
                    <TableCell><Badge color="gray" size="sm">Expired</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>POL-005</TableCell>
                    <TableCell>Life</TableCell>
                    <TableCell>₹15,000</TableCell>
                    <TableCell><Badge color="green" size="sm">Active</Badge></TableCell>
                  </TableRow>
                </TableBody>
                <TableCaption>A list of your recent policies.</TableCaption>
              </Table>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Plain table</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>Standard</TableHead>
                    <TableHead>Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Third-party cover</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Own damage</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Zero depreciation</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>✓</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 'ScrollArea':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Vertical scroll</div>
              <ScrollArea maxHeight={200} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border-subtle)', color: 'var(--color-text-default)', fontSize: 14 }}>
                    Item {i + 1} — Scrollable content row
                  </div>
                ))}
              </ScrollArea>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Horizontal scroll</div>
              <ScrollArea orientation="horizontal" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
                <div style={{ display: 'flex', gap: 12, width: 'max-content' }}>
                  {['Car', 'Bike', 'Health', 'Travel', 'Home', 'Life', 'Fire', 'Marine', 'Crop', 'Pet'].map((item) => (
                    <div key={item} style={{ padding: '12px 24px', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-default)', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {item} Insurance
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        );

      case 'InputGroup':
        return (
          <div style={sectionGridStyle}>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With prefix icon</div>
              <InputGroup prefix={<Search size={18} />}>
                <input type="text" placeholder="Search policies..." />
              </InputGroup>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With suffix icon</div>
              <InputGroup suffix={<Mail size={18} />}>
                <input type="email" placeholder="Email address" />
              </InputGroup>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With text prefix</div>
              <InputGroup prefix={<span style={{ fontSize: 14 }}>https://</span>}>
                <input type="text" placeholder="acko.com" />
              </InputGroup>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>With prefix + suffix</div>
              <InputGroup prefix={<DollarSign size={16} />} suffix={<span style={{ fontSize: 13, fontWeight: 500 }}>.00</span>}>
                <input type="number" placeholder="0" />
              </InputGroup>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Sizes</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <InputGroup prefix={<Hash size={14} />} size="sm">
                  <input type="text" placeholder="Small" />
                </InputGroup>
                <InputGroup prefix={<Hash size={16} />} size="md">
                  <input type="text" placeholder="Medium" />
                </InputGroup>
                <InputGroup prefix={<Hash size={18} />} size="lg">
                  <input type="text" placeholder="Large" />
                </InputGroup>
              </div>
            </div>
            <div style={blockStyle}>
              <div style={blockLabelStyle}>Error + Disabled</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <InputGroup prefix={<Link size={16} />} error>
                  <input type="text" placeholder="Invalid URL" />
                </InputGroup>
                <InputGroup prefix={<Code size={16} />} disabled>
                  <input type="text" placeholder="Disabled" />
                </InputGroup>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--color-surface)' }}>
      {/* ===== SIDEBAR ===== */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          borderRight: '1px solid var(--color-border-subtle)',
          background: 'var(--color-card-bg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px 8px', flexShrink: 0 }}>
          <img
            src={isDark
              ? 'https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/ACKO%20logo%20horizontal%20Dark%20bg.svg'
              : 'https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/ACKO%20logo%20horizontal%20Light%20BG.svg'
            }
            alt="ACKO"
            style={{ height: 24, display: 'block', marginBottom: 6 }}
          />
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>Umbrella design System</p>
        </div>

        <Separator />

        {/* Nav heading */}
        <div style={{ padding: '16px 20px 8px' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            Components
          </span>
        </div>

        {/* Nav list */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0 8px 20px' }}>
          {COMPONENTS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setActiveComponent(name)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                border: 'none',
                borderRadius: 8,
                background: activeComponent === name ? 'var(--color-primary-subtle)' : 'transparent',
                color: activeComponent === name ? 'var(--color-primary)' : 'var(--color-text-default)',
                fontSize: 14,
                fontWeight: activeComponent === name ? 600 : 400,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all 120ms ease',
                marginBottom: 2,
              }}
            >
              {name}
            </button>
          ))}
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header
          style={{
            flexShrink: 0,
            height: 86,
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border-subtle)',
            background: 'var(--color-card-bg)',
          }}
        >
          <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-strong)', margin: 0 }}>
            {activeComponent}
          </h1>
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              padding: 0,
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'all 120ms ease',
            }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </header>

        {/* Content area */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Component showcase */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
            {renderContent()}
          </div>

          {/* Preview panel */}
          <div
            style={{
              flexShrink: 0,
              width: 390,
              borderLeft: '1px solid var(--color-border-subtle)',
              background: 'var(--color-surface)',
              padding: '24px 20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 16, alignSelf: 'flex-start' }}>
              Preview
            </span>

            {/* Phone frame */}
            <div
              style={{
                width: 350,
                height: 700,
                borderRadius: 32,
                border: '1px solid var(--color-card-border)',
                background: 'var(--color-surface)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Status bar */}
              <div
                style={{
                  height: 44,
                  padding: '0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--color-on-primary)',
                  background: 'var(--color-primary)',
                }}
              >
                <span>9:41</span>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <span style={{ fontSize: 10 }}>5G</span>
                  <div style={{ width: 18, height: 10, borderRadius: 2, border: '1px solid currentColor', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: '1px', borderRadius: 1, background: 'currentColor', width: '75%' }} />
                  </div>
                </div>
              </div>

              {/* Scrollable app content */}
              <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

                {/* Hero gradient header */}
                <div style={{ background: 'linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)', padding: '16px 20px 24px', color: 'var(--color-on-primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name="Supratik Roy" size="sm" />
                      <div>
                        <p style={{ fontSize: 11, opacity: 0.7, margin: 0 }}>Good morning</p>
                        <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Supratik Roy</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <button type="button" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'inherit' }}>
                          <Bell size={16} />
                        </button>
                        <div style={{ position: 'absolute', top: -4, right: -4 }}><CounterBadge count={3} color="pink" /></div>
                      </div>
                      <button type="button" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'inherit' }}>
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Promo card */}
                  <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ flex: 1 }}>
                      <Badge color="orange" size="sm" variant="solid">Limited offer</Badge>
                      <p style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', margin: '6px 0 4px' }}>Save up to ₹3,000 on health renewal</p>
                      <p style={{ fontSize: 11, opacity: 0.75, margin: 0 }}>Renew before Mar 31</p>
                    </div>
                    <Button variant="secondary" size="xs" iconRight={<ChevronRight size={13} />}>Renew</Button>
                  </div>
                </div>

                {/* Pill tabs */}
                <div style={{ padding: '14px 20px 0' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {(['policies', 'claims', 'rewards'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setPreviewTab(tab)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-full)',
                          border: previewTab === tab ? 'none' : '1px solid var(--color-border-subtle)',
                          background: previewTab === tab ? 'var(--color-primary)' : 'transparent',
                          color: previewTab === tab ? 'var(--color-on-primary)' : 'var(--color-text-muted)',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          transition: 'all 150ms ease',
                          textTransform: 'capitalize',
                        }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab content: Policies */}
                {previewTab === 'policies' && (
                  <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>

                    {/* Alert */}
                    <Alert variant="warning" title="Renewal due soon">Your car policy expires in 12 days.</Alert>

                    {/* Policy cards */}
                    {[
                      { icon: <Car size={16} color="var(--color-primary)" />, name: 'Car Insurance', num: 'MH12XY4321', status: 'Active', statusColor: 'green' as const, expiry: 'Expires Nov 2025', premium: '₹8,240 / yr' },
                      { icon: <HeartPulse size={16} color="var(--color-primary)" />, name: 'Health Insurance', num: 'HI7892034', status: 'Renewal due', statusColor: 'orange' as const, expiry: 'Expires Mar 2024', premium: '₹14,560 / yr' },
                    ].map((p) => (
                      <div key={p.num} style={{ borderRadius: 16, border: '1px solid var(--color-card-border)', background: 'var(--color-card-bg)', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.icon}</div>
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-strong)', margin: 0 }}>{p.name}</p>
                              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: 0 }}>{p.num}</p>
                            </div>
                          </div>
                          <Badge color={p.statusColor} size="sm" variant="solid">{p.status}</Badge>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{p.expiry}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-strong)' }}>{p.premium}</span>
                        </div>
                        <div style={{ marginTop: 8 }}><Progress value={p.statusColor === 'green' ? 72 : 18} size="sm" /></div>
                      </div>
                    ))}

                    {/* Buy insurance section */}
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '4px 0 2px' }}>Explore products</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {[
                        { icon: <Bike size={16} color="var(--color-primary)" />, name: 'Bike', sub: 'Insure in 1 min', badge: null },
                        { icon: <Plane size={16} color="var(--color-primary)" />, name: 'Travel', sub: 'International cover', badge: <Badge color="blue" size="sm">AirPass</Badge> },
                        { icon: <Umbrella size={16} color="var(--color-primary)" />, name: 'Life', sub: 'Term from ₹499', badge: null },
                        { icon: <Home size={16} color="var(--color-primary)" />, name: 'Home', sub: 'Contents + structure', badge: <Badge color="green" size="sm">New</Badge> },
                      ].map((item) => (
                        <div key={item.name} style={{ borderRadius: 14, border: '1px solid var(--color-card-border)', background: 'var(--color-card-bg)', padding: '12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{item.icon}<span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-strong)' }}>{item.name}</span></div>
                          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{item.sub}</span>
                          {item.badge}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab content: Claims */}
                {previewTab === 'claims' && (
                  <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Alert variant="info" title="Claim #CL2024001 under review">Expected resolution by Mar 15, 2024.</Alert>
                    {[
                      { id: '#CL2024001', type: 'Car — Accident', amount: '₹48,000', status: 'Under review', color: 'blue' as const, progress: 55 },
                      { id: '#CL2023089', type: 'Health — Hospitalisation', amount: '₹1,20,000', status: 'Settled', color: 'green' as const, progress: 100 },
                      { id: '#CL2023041', type: 'Car — Theft', amount: '₹3,60,000', status: 'Rejected', color: 'pink' as const, progress: 100 },
                    ].map((c) => (
                      <div key={c.id} style={{ borderRadius: 16, border: '1px solid var(--color-card-border)', background: 'var(--color-card-bg)', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-strong)', margin: 0 }}>{c.type}</p>
                            <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: '2px 0 0' }}>{c.id}</p>
                          </div>
                          <Badge color={c.color} size="sm">{c.status}</Badge>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Claim amount</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-strong)' }}>{c.amount}</span>
                        </div>
                        <Progress value={c.progress} size="sm" color={c.color === 'green' ? 'success' : c.color === 'pink' ? 'error' : 'primary'} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab content: Rewards */}
                {previewTab === 'rewards' && (
                  <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Points card */}
                    <div style={{ borderRadius: 16, background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)', padding: '20px', color: 'var(--color-on-primary)' }}>
                      <p style={{ fontSize: 11, opacity: 0.75, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Acko Coins</p>
                      <p style={{ fontSize: 32, fontWeight: 700, margin: '0 0 4px' }}>2,480</p>
                      <p style={{ fontSize: 11, opacity: 0.7, margin: 0 }}>≈ ₹248 value · expires Dec 2024</p>
                    </div>

                    {/* Notification settings */}
                    <div style={{ borderRadius: 16, border: '1px solid var(--color-card-border)', background: 'var(--color-card-bg)', padding: '14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Preferences</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-strong)', margin: 0 }}>Renewal reminders</p>
                          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: '2px 0 0' }}>Get notified before expiry</p>
                        </div>
                        <Switch checked={previewNotifications} onCheckedChange={setPreviewNotifications} size="sm" />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-strong)', margin: 0 }}>Offers & promotions</p>
                          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: '2px 0 0' }}>Personalised deals</p>
                        </div>
                        <Switch checked={previewMarketing} onCheckedChange={setPreviewMarketing} size="sm" />
                      </div>
                    </div>

                    {/* Offers accordion-style */}
                    {[
                      { id: 'car', icon: <Car size={15} color="var(--color-primary)" />, title: '10% off on car renewal', sub: 'Use code SAVE10', badge: <Badge color="orange" size="sm">Expiring soon</Badge> },
                      { id: 'health', icon: <HeartPulse size={15} color="var(--color-primary)" />, title: 'Free OPD consultation', sub: 'With health policy', badge: <Badge color="green" size="sm">New</Badge> },
                    ].map((offer) => (
                      <button
                        key={offer.id}
                        type="button"
                        onClick={() => setPreviewAccordionOpen(previewAccordionOpen === offer.id ? null : offer.id)}
                        style={{ borderRadius: 16, border: '1px solid var(--color-card-border)', background: 'var(--color-card-bg)', padding: '14px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {offer.icon}
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-strong)' }}>{offer.title}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            {offer.badge}
                            <ChevronRight size={14} color="var(--color-text-muted)" style={{ transform: previewAccordionOpen === offer.id ? 'rotate(90deg)' : 'none', transition: 'transform 200ms ease' }} />
                          </div>
                        </div>
                        {previewAccordionOpen === offer.id && (
                          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: '10px 0 0', paddingTop: 10, borderTop: '1px solid var(--color-border-subtle)' }}>{offer.sub}</p>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Bottom CTA always visible */}
                <div style={{ padding: '16px 20px 24px', borderTop: '1px solid var(--color-border-subtle)', marginTop: 4 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <TextInput label="Vehicle number" placeholder="MH 12 AB 1234" value={vehicleNumber} onChange={handleVehicleNumberChange} state={vehicleNumberState} size="sm" />
                    <Button variant="primary" fullWidth size="sm" iconRight={<ChevronRight size={15} />}>Get instant quote</Button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
