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
import { Search, Mail, Eye, Shield, ChevronRight, Plus, Trash2, Heart, Bell, Car, Plane, HeartPulse, Bike, Umbrella, Gift, Sun, Moon } from 'lucide-react';
import { generatePalette, applyPaletteToRoot } from './utils/generatePalette';

/* ============================================================
   Showcase — Single page, grouped by type/size
   ============================================================ */

const ACKO_DEFAULT_HEX = '#582FD2';

const sectionStyle: React.CSSProperties = {
  marginBottom: 48,
};

const headingStyle: React.CSSProperties = {
  fontSize: 22,
  lineHeight: '28px',
  letterSpacing: '-0.3px',
  fontWeight: 600,
  color: 'var(--color-text-strong)',
  marginBottom: 20,
};

/** 2-column grid for blocks inside a section */
const sectionGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 16,
};

/** Card-style container for each group (Variants, Sizes, States, etc.) */
const blockStyle: React.CSSProperties = {
  background: 'var(--color-card-bg)',
  border: '1px solid var(--color-card-border)',
  borderRadius: 16,
  padding: 'var(--space-5) var(--space-6)',
};

/** Small overline label inside a block (e.g. "Variants", "Sizes") */
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


function App() {
  // --- State for interactive demos ---
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

  // Indian vehicle registration number validation
  // Format: AA 00 AA 0000 or AA00AA0000 (with/without spaces)
  const validateVehicleNumber = (value: string): boolean => {
    const cleaned = value.replace(/\s/g, '').toUpperCase();
    // Pattern: 2 letters + 2 digits + 1-2 letters + 4 digits
    const pattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
    return pattern.test(cleaned);
  };

  const handleVehicleNumberChange = (value: string) => {
    setVehicleNumber(value);
    const cleaned = value.replace(/\s/g, '');
    
    if (cleaned.length === 0) {
      setVehicleNumberState('default');
    } else if (cleaned.length >= 9) {
      // Only validate when user has typed enough characters
      setVehicleNumberState(validateVehicleNumber(value) ? 'success' : 'error');
    } else {
      setVehicleNumberState('default');
    }
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

  // --- Theme state (light/dark) ---
  const [isDark, setIsDark] = useState(false);

  // --- Apply theme ---
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Apply brand palette on mount
  useEffect(() => {
    const brandPalette = generatePalette(ACKO_DEFAULT_HEX);
    applyPaletteToRoot(brandPalette);
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

  return (
    <div
      style={{
        display: 'flex',
        gap: 40,
        maxWidth: 1520,
        margin: '0 auto',
        padding: '32px 32px 32px 32px',
      }}
    >
    {/* === LEFT: Component showcase === */}
    <div style={{ flex: '1 1 0%', minWidth: 0, maxWidth: 1100 }}>
      <header style={{ marginBottom: 48 }}>
        {/* --- Title row --- */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <h1
              style={{
                fontSize: 40,
                lineHeight: '48px',
                fontWeight: 600,
                letterSpacing: '-0.5px',
                color: 'var(--color-text-strong)',
              }}
            >
              ACKO Design System
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 18, marginTop: 8 }}>
              Component library with dynamic color palettes
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                padding: 0,
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-card-bg)',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

          </div>
        </div>

      </header>

      {/* ============================================================
         BUTTON
         ============================================================ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Button</h2>

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
            <div style={blockLabelStyle}>With icons</div>
            <div style={rowStyle}>
              <Button variant="primary" iconLeft={<Plus />}>Add item</Button>
              <Button variant="outline" iconRight={<ChevronRight />}>Continue</Button>
              <Button variant="danger" iconLeft={<Trash2 />}>Delete</Button>
              <Button variant="ghost" iconLeft={<Heart />}>Favourite</Button>
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

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Full width</div>
            <Button variant="primary" fullWidth>Full width primary</Button>
          </div>
        </div>
      </section>

      {/* ============================================================
         TEXT INPUT
         ============================================================ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>TextInput</h2>

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
              <TextInput
                label="Default"
                placeholder="Type something..."
                value={inputVal}
                onChange={setInputVal}
                helperText="This is helper text"
              />
              <TextInput
                label="Error state"
                value={inputErr}
                onChange={setInputErr}
                state="error"
                errorText="Please enter a valid email address"
                type="email"
              />
              <TextInput
                label="Success state"
                value={inputSuccess}
                onChange={setInputSuccess}
                state="success"
                helperText="Email is valid"
              />
              <TextInput
                label="Disabled"
                value=""
                onChange={() => {}}
                disabled
                placeholder="Disabled input"
              />
              <TextInput
                label="Read only"
                value={inputDisabled}
                onChange={() => {}}
                readOnly
              />
              <TextInput
                label="Required field"
                placeholder="Required"
                value={inputRequired}
                onChange={setInputRequired}
                required
              />
            </div>
          </div>

          <div style={{ ...blockStyle, gridColumn: 'span 2' }}>
            <div style={blockLabelStyle}>With icons, prefix, suffix</div>
            <div style={gridStyle}>
              <TextInput
                label="Search"
                placeholder="Search policies..."
                value={inputSearch}
                onChange={setInputSearch}
                iconLeft={<Search size={18} />}
              />
              <TextInput
                label="Email"
                placeholder="you@example.com"
                value={inputEmail}
                onChange={setInputEmail}
                iconLeft={<Mail size={18} />}
                type="email"
                autoComplete="email"
              />
              <TextInput
                label="Password"
                placeholder="Enter password"
                value={inputPassword}
                onChange={setInputPassword}
                type="password"
                iconRight={<Eye size={18} />}
              />
              <TextInput
                label="Amount"
                placeholder="0.00"
                value={inputAmount}
                onChange={setInputAmount}
                prefix="₹"
                type="number"
              />
              <TextInput
                label="Domain"
                placeholder="yoursite"
                value={inputDomain}
                onChange={setInputDomain}
                suffix=".com"
              />
              <TextInput
                label="Bio"
                placeholder="Write about yourself"
                value={inputBio}
                onChange={setInputBio}
                maxLength={100}
              />
            </div>
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Form example</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextInput
                label="Vehicle number"
                placeholder="KA 01 AB 1234"
                value={vehicleNumber}
                onChange={handleVehicleNumberChange}
                size="md"
                state={vehicleNumberState}
                errorText="Please enter a valid vehicle number"
                helperText={vehicleNumberState === 'success' ? 'Valid vehicle number' : 'Format: KA 01 AB 1234'}
              />
              <TextInput
                label="Make and model"
                placeholder="e.g. Maruti Swift VXI"
                value={makeModel}
                onChange={setMakeModel}
                size="md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         DROPDOWN
         ============================================================ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Dropdown</h2>

        <div style={sectionGridStyle}>
          <div style={blockStyle}>
            <div style={blockLabelStyle}>Single select</div>
            <Dropdown
              label="Insurance type"
              placeholder="Choose insurance type"
              options={dropdownOptions}
              value={dropdownVal}
              onChange={(v) => setDropdownVal(v as string)}
              helperText="Pick one option"
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Multi select</div>
            <Dropdown
              label="Select multiple"
              placeholder="Select multiple"
              options={dropdownOptions}
              value={dropdownMulti}
              onChange={(v) => setDropdownMulti(v as string[])}
              variant="multi"
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Searchable</div>
            <Dropdown
              label="Search and select"
              placeholder="Search and select..."
              options={dropdownOptions}
              value={dropdownSearch}
              onChange={(v) => setDropdownSearch(v as string)}
              variant="searchable"
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Grouped</div>
            <Dropdown
              label="Vehicle type"
              placeholder="Select vehicle type"
              options={groupedOptions}
              value=""
              onChange={() => {}}
              variant="grouped"
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Error state</div>
            <Dropdown
              label="Required field"
              placeholder="Required field"
              options={dropdownOptions}
              value=""
              onChange={() => {}}
              state="error"
              errorText="Please select an option"
              required
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Disabled</div>
            <Dropdown
              label="Cannot select"
              placeholder="Cannot select"
              options={dropdownOptions}
              value=""
              onChange={() => {}}
              disabled
            />
          </div>
        </div>
      </section>

      {/* ============================================================
         CHECKBOX
         ============================================================ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Checkbox</h2>

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
              <Checkbox
                label="With description"
                description="Receive email notifications about policy updates"
                checked={check2}
                onChange={setCheck2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         RADIO
         ============================================================ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Radio</h2>

        <div style={sectionGridStyle}>
          <div style={blockStyle}>
            <div style={blockLabelStyle}>Default (vertical)</div>
            <RadioGroup
              label="Select your plan"
              options={radioOptions}
              value={radio1}
              onChange={setRadio1}
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Horizontal</div>
            <RadioGroup
              label="Fuel type"
              options={[
                { value: 'petrol', label: 'Petrol' },
                { value: 'diesel', label: 'Diesel' },
                { value: 'electric', label: 'Electric' },
                { value: 'cng', label: 'CNG' },
              ]}
              value="petrol"
              onChange={() => {}}
              orientation="horizontal"
            />
          </div>

          <div style={{ ...blockStyle, gridColumn: 'span 2' }}>
            <div style={blockLabelStyle}>Card variant</div>
            <RadioGroup
              label="Choose coverage"
              options={radioOptions}
              value={radio2}
              onChange={setRadio2}
              variant="card"
            />
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
      </section>

      {/* ============================================================
         CALENDAR
         ============================================================ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Calendar</h2>

        <div style={blockStyle}>
          <div style={blockLabelStyle}>Single date (dropdown)</div>
          <div style={{ maxWidth: 320 }}>
            <Calendar
              variant="single"
              display="dropdown"
              value={calendarDate}
              onChange={(d) => setCalendarDate(d as Date)}
            />
          </div>
        </div>

        <div style={blockStyle}>
          <div style={blockLabelStyle}>Range selection (inline)</div>
          <Calendar
            variant="range"
            display="inline"
            value={calendarRange}
            onChange={(v) => setCalendarRange(v as { start: Date; end: Date })}
          />
        </div>

        <div style={blockStyle}>
          <div style={blockLabelStyle}>With min/max dates</div>
          <div style={{ maxWidth: 320 }}>
            <Calendar
              variant="single"
              display="inline"
              value={new Date()}
              onChange={() => {}}
              minDate={new Date(Date.now() - 7 * 86400000)}
              maxDate={new Date(Date.now() + 30 * 86400000)}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
         BADGE
         ============================================================ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Badge</h2>

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
      </section>

      {/* ============================================================
         NAVIGATION WIZARD
         ============================================================ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>NavigationWizard</h2>

        <div style={sectionGridStyle}>
          <div style={{ ...blockStyle, gridColumn: 'span 2' }}>
            <div style={blockLabelStyle}>Horizontal</div>
            <NavigationWizard
              steps={wizardSteps}
              currentStep={wizardStep}
              onStepClick={setWizardStep}
            />
            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
              <Button variant="outline" size="sm" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))}>Previous</Button>
              <Button variant="primary" size="sm" onClick={() => setWizardStep(Math.min(3, wizardStep + 1))}>Next</Button>
            </div>
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Vertical</div>
            <NavigationWizard
              steps={wizardSteps}
              currentStep={2}
              variant="vertical"
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Compact</div>
            <NavigationWizard
              steps={wizardSteps}
              currentStep={1}
              variant="compact"
            />
          </div>

          <div style={{ ...blockStyle, gridColumn: 'span 2' }}>
            <div style={blockLabelStyle}>With error step</div>
            <NavigationWizard
              steps={[
                { label: 'Vehicle', status: 'completed' },
                { label: 'Personal', status: 'completed' },
                { label: 'Coverage', status: 'error' },
                { label: 'Payment', status: 'upcoming' },
              ]}
              currentStep={2}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
         PAGINATION
         ============================================================ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Pagination</h2>

        <div style={sectionGridStyle}>
          <div style={blockStyle}>
            <div style={blockLabelStyle}>Numbered (with info)</div>
            <Pagination
              totalPages={20}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              showInfo
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Numbered (no info)</div>
            <Pagination
              totalPages={10}
              currentPage={3}
              onPageChange={() => {}}
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Simple</div>
            <Pagination
              totalPages={20}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              variant="simple"
            />
          </div>

          <div style={blockStyle}>
            <div style={blockLabelStyle}>Compact</div>
            <Pagination
              totalPages={20}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              variant="compact"
            />
          </div>

          <div style={{ ...blockStyle, gridColumn: 'span 2' }}>
            <div style={blockLabelStyle}>Load more</div>
            <Pagination
              totalPages={20}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              variant="load-more"
              showInfo
            />
          </div>
        </div>
      </section>

      <footer style={{ padding: '32px 0', borderTop: '1px solid var(--color-card-border)', color: 'var(--color-text-muted)', fontSize: 12 }}>
        ACKO Design System v3.0.0
      </footer>
    </div>
    {/* === END LEFT column === */}

    {/* === RIGHT: App Preview Panel === */}
    <div
      style={{
        flexShrink: 0,
        width: 375,
        position: 'sticky',
        top: 32,
        alignSelf: 'flex-start',
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
          Live preview
        </span>
      </div>

      {/* Phone frame */}
      <div
        style={{
          width: 375,
          height: 780,
          borderRadius: 32,
          border: '1px solid var(--color-card-border)',
          background: 'var(--color-surface)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ---- Status bar ---- */}
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

        {/* ---- Scrollable app content ---- */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

          {/* --- Dark header / hero --- */}
          <div
            style={{
              background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
              padding: '16px 20px 28px',
              color: 'var(--color-on-primary)',
            }}
          >
            {/* Greeting row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  S
                </div>
                <span style={{ fontSize: 15, fontWeight: 500 }}>Hey Supratik</span>
              </div>
              <div style={{ position: 'relative' }}>
                <Bell size={20} />
                <CounterBadge count={9} color="pink" />
              </div>
            </div>

            {/* Hero card */}
            <div
              style={{
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 16,
                padding: '20px 16px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 17, fontWeight: 600, lineHeight: '24px', marginBottom: 4 }}>
                Does your health policy<br />have coverage gaps?
              </p>
              <p style={{ fontSize: 12, opacity: 0.8, marginBottom: 16 }}>
                Try our <strong>FREE</strong> policy analyser to find out!
              </p>
              <Button variant="secondary" size="sm" iconRight={<ChevronRight size={16} />}>
                Analyse your policy
              </Button>
            </div>
          </div>

          {/* --- Quick actions --- */}
          <div style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-card-border)',
                  background: 'var(--color-card-bg)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--color-text-strong)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={16} color="var(--color-primary)" />
                  Your policies
                </span>
                <ChevronRight size={14} color="var(--color-text-muted)" />
              </button>

              <button
                type="button"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-card-border)',
                  background: 'var(--color-card-bg)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--color-text-strong)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Gift size={16} color="var(--color-primary)" />
                  Rewards
                </span>
                <ChevronRight size={14} color="var(--color-text-muted)" />
              </button>
            </div>
          </div>

          {/* --- Buy insurance bento grid --- */}
          <div style={{ padding: '0 20px 24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-strong)', marginBottom: 14 }}>
              Buy insurance
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {/* Car */}
              <div
                style={{
                  gridRow: 'span 1',
                  borderRadius: 16,
                  border: '1px solid var(--color-card-border)',
                  background: 'var(--color-card-bg)',
                  padding: '16px 14px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <Car size={18} color="var(--color-primary)" />
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-strong)' }}>Car</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Get your policy instantly</span>
                <Badge color="green" size="sm">Zero commission</Badge>
              </div>

              {/* Bike */}
              <div
                style={{
                  borderRadius: 16,
                  border: '1px solid var(--color-card-border)',
                  background: 'var(--color-card-bg)',
                  padding: '16px 14px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <Bike size={18} color="var(--color-primary)" />
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-strong)' }}>Bike</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Insure in 1 min</span>
              </div>

              {/* Health */}
              <div
                style={{
                  borderRadius: 16,
                  border: '1px solid var(--color-card-border)',
                  background: 'var(--color-card-bg)',
                  padding: '16px 14px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <HeartPulse size={18} color="var(--color-primary)" />
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-strong)' }}>Health</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>100% bill payment</span>
                <Badge color="orange" size="sm">Avail 0% GST</Badge>
              </div>

              {/* Travel */}
              <div
                style={{
                  borderRadius: 16,
                  border: '1px solid var(--color-card-border)',
                  background: 'var(--color-card-bg)',
                  padding: '16px 14px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <Plane size={18} color="var(--color-primary)" />
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-strong)' }}>Travel</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>International cover</span>
                <Badge color="blue" size="sm">Get AirPass</Badge>
              </div>

              {/* Life */}
              <div
                style={{
                  gridColumn: 'span 2',
                  borderRadius: 16,
                  border: '1px solid var(--color-card-border)',
                  background: 'var(--color-card-bg)',
                  padding: '16px 14px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Umbrella size={18} color="var(--color-primary)" />
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-strong)' }}>Life</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Flexible coverage</span>
                </div>
                <Button variant="primary" size="xs" iconRight={<ChevronRight size={14} />}>Explore</Button>
              </div>
            </div>
          </div>

          {/* --- Mini form section --- */}
          <div
            style={{
              padding: '20px 20px 32px',
              borderTop: '1px solid var(--color-card-border)',
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-strong)', marginBottom: 14 }}>
              Quick quote
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <TextInput
                label="Vehicle number"
                placeholder="KA 01 AB 1234"
                value=""
                onChange={() => {}}
                size="sm"
              />
              <Button variant="primary" fullWidth iconRight={<ChevronRight size={16} />}>
                Get quote
              </Button>
            </div>
          </div>

        </div>
        {/* ---- End scrollable content ---- */}
      </div>
      {/* End phone frame */}
    </div>
    {/* === END RIGHT preview panel === */}

    </div>
  );
}

export default App;
