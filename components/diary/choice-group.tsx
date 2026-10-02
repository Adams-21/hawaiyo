"use client";

import { cn } from "@/lib/utils";

export interface ChoiceGroupOption<T extends string> {
  value: T;
  label: string;
  description: string;
  icon?: React.ReactNode;
}

interface ChoiceGroupProps<T extends string> {
  name: string;
  legend: string;
  value: T;
  options: ChoiceGroupOption<T>[];
  onChange: (value: T) => void;
}

export function ChoiceGroup<T extends string>({
  name,
  legend,
  value,
  options,
  onChange,
}: ChoiceGroupProps<T>) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {legend}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer gap-3 rounded-xl border p-3 transition-colors",
                selected
                  ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-800"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="mt-1 size-4 shrink-0 accent-zinc-900 dark:accent-zinc-100"
              />
              <span className="space-y-0.5">
                <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {option.icon}
                  {option.label}
                </span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                  {option.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}