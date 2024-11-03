import { ChangeEvent } from 'react';

interface IntervalSettingsProps {
  interval: number;
  onIntervalChange: (interval: number) => void;
}

export function IntervalSettings({ interval, onIntervalChange }: IntervalSettingsProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onIntervalChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="interval" className="font-medium">
        Posting Interval:
      </label>
      <select
        id="interval"
        value={interval}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value={1}>1 hour</option>
        <option value={3}>3 hours</option>
        <option value={6}>6 hours</option>
        <option value={12}>12 hours</option>
        <option value={24}>24 hours</option>
      </select>
    </div>
  );
}