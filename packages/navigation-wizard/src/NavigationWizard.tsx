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
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M13 4L6 11L3 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M8 5V8M8 11H8.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function getStepStatus(
  step: WizardStep,
  index: number,
  currentStep: number
): WizardStep["status"] {
  if (step.status !== undefined) return step.status;
  if (index < currentStep) return "completed";
  if (index === currentStep) return "current";
  return "upcoming";
}

export const NavigationWizard = forwardRef<
  HTMLOListElement,
  NavigationWizardProps
>(
  (
    {
      steps,
      currentStep,
      variant = "horizontal",
      onStepClick,
      className,
    },
    ref
  ) => {
    return (
      <ol
        ref={ref}
        role="list"
        className={clsx(
          "acko-wizard",
          variant === "vertical" && "acko-wizard-vertical",
          variant === "compact" && "acko-wizard-compact",
          className
        )}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(step, index, currentStep);
          const isClickable =
            onStepClick && (status === "completed" || status === "current");
          const isCompleted = status === "completed";
          const hasConnector = index < steps.length - 1;

          return (
            <li key={index} className="acko-wizard-step">
              <button
                type="button"
                className={clsx(
                  "acko-wizard-circle",
                  `acko-wizard-circle-${status}`
                )}
                onClick={
                  isClickable ? () => onStepClick(index) : undefined
                }
                disabled={!isClickable}
                aria-current={status === "current" ? "step" : undefined}
                aria-label={`Step ${index + 1}: ${step.label}`}
              >
                {status === "completed" && <CheckIcon />}
                {status === "error" && <ErrorIcon />}
                {(status === "upcoming" || status === "current") && (index + 1)}
              </button>
              <div className="acko-wizard-step-info">
                <span
                  className={clsx(
                    "acko-wizard-label",
                    `acko-wizard-label-${status}`
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="acko-wizard-description">
                    {step.description}
                  </span>
                )}
              </div>
              {hasConnector && (
                <div
                  className={clsx(
                    "acko-wizard-connector",
                    isCompleted && "acko-wizard-connector-completed"
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    );
  }
);

NavigationWizard.displayName = "NavigationWizard";
