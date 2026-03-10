"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

export interface WizardStep {
  label: string;
  description?: string;
  status?: "upcoming" | "current" | "completed" | "error";
}

export interface NavigationWizardProps {
  steps: WizardStep[];
  currentStep: number;
  variant?: "horizontal" | "vertical" | "compact";
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function resolveStatus(step: WizardStep, index: number, currentStep: number): NonNullable<WizardStep["status"]> {
  if (step.status) return step.status;
  if (index < currentStep) return "completed";
  if (index === currentStep) return "current";
  return "upcoming";
}

export const NavigationWizard = forwardRef<HTMLOListElement, NavigationWizardProps>(
  ({ steps, currentStep, variant = "horizontal", onStepClick, className }, ref) => {
    const resolved = steps.map((s, i) => ({ ...s, status: resolveStatus(s, i, currentStep) }));
    const currentLabel = resolved[currentStep]?.label ?? "";

    if (variant === "compact") {
      return (
        <nav aria-label="Progress">
          <ol
            ref={ref}
            className={clsx("acko-wizard acko-wizard-compact", className)}
          >
            {resolved.map((step, i) => (
              <li key={i} className="acko-wizard-step">
                <span className={clsx("acko-wizard-compact-dot", `acko-wizard-compact-dot-${step.status}`)} />
              </li>
            ))}
            <span className="acko-wizard-compact-label">{currentLabel}</span>
            <span className="acko-wizard-compact-count">
              {currentStep + 1} of {steps.length}
            </span>
          </ol>
        </nav>
      );
    }

    if (variant === "vertical") {
      return (
        <nav aria-label="Progress">
          <ol ref={ref} className={clsx("acko-wizard acko-wizard-vertical", className)}>
            {resolved.map((step, i) => (
              <li key={i} className="acko-wizard-step" aria-current={step.status === "current" ? "step" : undefined}>
                <div className="acko-wizard-step-left">
                  <button
                    type="button"
                    className={clsx("acko-wizard-circle", `acko-wizard-circle-${step.status}`)}
                    onClick={onStepClick ? () => onStepClick(i) : undefined}
                    disabled={!onStepClick || (step.status !== "completed" && step.status !== "current")}
                    aria-label={`Step ${i + 1}: ${step.label}`}
                  >
                    {step.status === "completed" && <CheckIcon />}
                    {step.status === "error" && <ErrorIcon />}
                    {(step.status === "upcoming" || step.status === "current") && (i + 1)}
                  </button>
                  {i < resolved.length - 1 && (
                    <div
                      className={clsx(
                        "acko-wizard-vertical-connector",
                        step.status === "completed" ? "acko-wizard-connector-completed" : "acko-wizard-connector-default"
                      )}
                      aria-hidden
                    />
                  )}
                </div>
                <div className="acko-wizard-step-content">
                  <div
                    className={clsx("acko-wizard-vertical-label", `acko-wizard-vertical-label-${step.status}`)}
                    onClick={onStepClick ? () => onStepClick(i) : undefined}
                    style={onStepClick ? { cursor: "pointer" } : undefined}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="acko-wizard-vertical-description">{step.description}</div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      );
    }

    return (
      <nav aria-label="Progress">
        <ol ref={ref} className={clsx("acko-wizard", className)}>
          {resolved.map((step, i) => (
            <li key={i} className="acko-wizard-step">
              <div
                className={clsx(
                  "acko-wizard-step-body",
                  onStepClick && "acko-wizard-step-body-clickable"
                )}
                onClick={onStepClick ? () => onStepClick(i) : undefined}
                aria-current={step.status === "current" ? "step" : undefined}
              >
                <button
                  type="button"
                  className={clsx("acko-wizard-circle", `acko-wizard-circle-${step.status}`)}
                  disabled={!onStepClick || (step.status !== "completed" && step.status !== "current")}
                  aria-label={`Step ${i + 1}: ${step.label}`}
                  tabIndex={-1}
                >
                  {step.status === "completed" && <CheckIcon />}
                  {step.status === "error" && <ErrorIcon />}
                  {(step.status === "upcoming" || step.status === "current") && (i + 1)}
                </button>
                <div className="acko-wizard-label-block">
                  <span className={clsx("acko-wizard-label", `acko-wizard-label-${step.status}`)}>
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="acko-wizard-description">{step.description}</span>
                  )}
                </div>
              </div>
              {i < resolved.length - 1 && (
                <div
                  className={clsx(
                    "acko-wizard-connector",
                    step.status === "completed" ? "acko-wizard-connector-completed" : "acko-wizard-connector-default"
                  )}
                  aria-hidden
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

NavigationWizard.displayName = "NavigationWizard";
