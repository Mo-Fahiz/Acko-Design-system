import { Check, AlertTriangle } from 'lucide-react';
import styles from './NavigationWizard.module.css';

export interface WizardStep {
  label: string;
  description?: string;
  status?: 'upcoming' | 'current' | 'completed' | 'error';
}

export interface WizardProps {
  steps: WizardStep[];
  currentStep: number;
  variant?: 'horizontal' | 'vertical' | 'compact';
  onStepClick?: (stepIndex: number) => void;
}

export const NavigationWizard: React.FC<WizardProps> = ({
  steps,
  currentStep,
  variant = 'horizontal',
  onStepClick,
}) => {
  const resolvedSteps = steps.map((step, i) => ({
    ...step,
    status: step.status || (i < currentStep ? 'completed' : i === currentStep ? 'current' : 'upcoming') as WizardStep['status'],
  }));

  const currentLabel = resolvedSteps[currentStep]?.label || '';

  if (variant === 'compact') {
    return (
      <nav aria-label="Progress" className={styles.compact}>
        {resolvedSteps.map((step, i) => (
          <span
            key={i}
            className={styles[step.status!]}
          >
            <span className={styles.compactDot} />
          </span>
        ))}
        <span className={styles.compactLabel}>{currentLabel}</span>
        <span className={styles.compactCount}>
          {currentStep + 1} of {steps.length}
        </span>
      </nav>
    );
  }

  if (variant === 'vertical') {
    return (
      <nav aria-label="Progress">
        <ol className={styles.vertical} style={{ listStyle: 'none', padding: 0 }}>
          {resolvedSteps.map((step, i) => (
            <li
              key={i}
              className={[styles.verticalStep, styles[step.status!]].join(' ')}
              aria-current={step.status === 'current' ? 'step' : undefined}
            >
              <div className={styles.verticalLeft}>
                <span
                  className={styles.circle}
                  onClick={onStepClick ? () => onStepClick(i) : undefined}
                  style={onStepClick ? { cursor: 'pointer' } : undefined}
                  aria-hidden="true"
                >
                  {step.status === 'completed' ? <Check size={16} /> : step.status === 'error' ? <AlertTriangle size={14} /> : i + 1}
                </span>
                {i < resolvedSteps.length - 1 && (
                  <div
                    className={[
                      styles.verticalConnector,
                      step.status === 'completed' ? styles.connectorCompleted : styles.connectorDefault,
                    ].join(' ')}
                  />
                )}
              </div>
              <div className={styles.verticalContent}>
                <div
                  className={styles.verticalLabel}
                  onClick={onStepClick ? () => onStepClick(i) : undefined}
                  style={onStepClick ? { cursor: 'pointer' } : undefined}
                >
                  {step.label}
                </div>
                {step.description && <div className={styles.verticalDescription}>{step.description}</div>}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // Default: horizontal
  return (
    <nav aria-label="Progress">
      <ol className={styles.horizontal} style={{ listStyle: 'none', padding: 0 }}>
        {resolvedSteps.map((step, i) => (
          <li key={i} style={{ display: 'contents' }}>
            <div
              className={[styles.step, styles[step.status!], onStepClick && styles.stepClickable].filter(Boolean).join(' ')}
              onClick={onStepClick ? () => onStepClick(i) : undefined}
              aria-current={step.status === 'current' ? 'step' : undefined}
            >
              <div className={styles.stepRow}>
                <span className={styles.circle} aria-hidden="true">
                  {step.status === 'completed' ? <Check size={16} /> : step.status === 'error' ? <AlertTriangle size={14} /> : i + 1}
                </span>
              </div>
              <div className={styles.labelBlock}>
                <span className={styles.stepLabel}>{step.label}</span>
                {step.description && <span className={styles.stepDescription}>{step.description}</span>}
              </div>
            </div>
            {i < resolvedSteps.length - 1 && (
              <div
                className={[
                  styles.connector,
                  step.status === 'completed' ? styles.connectorCompleted : styles.connectorDefault,
                ].join(' ')}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationWizard;
