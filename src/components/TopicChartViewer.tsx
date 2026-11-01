import React, { useState } from 'react';
import { TopicChart, MisleadingExample } from '../types/stats';
import { Table, Eye, EyeOff, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';

interface TopicChartViewerProps {
  chart?: TopicChart;
  misleadingDemo?: MisleadingExample;
}

export const TopicChartViewer: React.FC<TopicChartViewerProps> = ({
  chart,
  misleadingDemo,
}) => {
  const [showDataTable, setShowDataTable] = useState(false);
  const [misleadingMode, setMisleadingMode] = useState<'honest' | 'truncated'>('truncated');

  if (!chart && !misleadingDemo) return null;

  return (
    <div className="space-y-6">
      {/* Standard Chart Section */}
      {chart && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Interactive Visualisation
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                {chart.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowDataTable(!showDataTable)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
              aria-label={showDataTable ? 'Hide data table' : 'Show accessible data table'}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{showDataTable ? 'Show Visual Chart' : 'Show Data Table (Accessible)'}</span>
            </button>
          </div>

          {/* Checklist Reminder Callout */}
          <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
              Chart Reading Checklist:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div>1. <strong>Title:</strong> {chart.title}</div>
              <div>2. <strong>X-Axis:</strong> {chart.xAxisLabel}</div>
              <div>3. <strong>Y-Axis:</strong> {chart.yAxisLabel}</div>
              <div>4. <strong>Units:</strong> {chart.units}</div>
            </div>
          </div>

          {/* Accessible Screen Reader Summary */}
          <p className="sr-only">{chart.accessibleSummary}</p>

          {/* Visual Display or Accessible Data Table */}
          {showDataTable ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80">
                    <th scope="col" className="p-2.5 font-bold text-stone-800 dark:text-stone-200">
                      {chart.xAxisLabel}
                    </th>
                    <th scope="col" className="p-2.5 font-bold text-stone-800 dark:text-stone-200">
                      {chart.yAxisLabel} ({chart.units})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chart.items.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50/50 dark:hover:bg-stone-800/40"
                    >
                      <td className="p-2.5 font-medium text-stone-700 dark:text-stone-300">
                        {item.label}
                      </td>
                      <td className="p-2.5 font-bold text-amber-700 dark:text-amber-400">
                        {item.value} {chart.units}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 pt-2 italic">
                Summary: {chart.accessibleSummary}
              </p>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              {/* Responsive SVG Bar Chart */}
              <div className="w-full h-56 flex items-end justify-between gap-3 sm:gap-6 px-2 sm:px-6 pt-6 pb-2 border-b-2 border-l-2 border-stone-400 dark:border-stone-600 bg-stone-50/50 dark:bg-stone-800/30 rounded-br-lg relative">
                {/* Horizontal grid lines */}
                <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-stone-200 dark:border-stone-700/60 pointer-events-none" />
                <div className="absolute inset-x-0 top-2/4 border-b border-dashed border-stone-200 dark:border-stone-700/60 pointer-events-none" />
                <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-stone-200 dark:border-stone-700/60 pointer-events-none" />

                {/* Bars */}
                {(() => {
                  const maxValue = Math.max(...chart.items.map((i) => i.value), 1);
                  return chart.items.map((item, idx) => {
                    const heightPercent = Math.round((item.value / maxValue) * 85);
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative"
                      >
                        {/* Tooltip on hover/focus */}
                        <div className="opacity-90 group-hover:opacity-100 text-[11px] font-bold text-stone-800 dark:text-stone-200">
                          {item.value} {chart.units === 'hours' ? 'h' : chart.units}
                        </div>

                        {/* Bar pillar */}
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full max-w-[48px] rounded-t-md transition-all duration-300 relative shadow-sm"
                        >
                          <div
                            style={{ backgroundColor: item.color || '#d97706' }}
                            className="w-full h-full rounded-t-md opacity-90 group-hover:opacity-100"
                          />
                        </div>

                        {/* X-axis Label */}
                        <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 truncate max-w-full">
                          {item.label}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Axis labels caption */}
              <div className="flex justify-between text-[11px] text-stone-500 dark:text-stone-400">
                <span>← {chart.xAxisLabel}</span>
                <span>{chart.yAxisLabel} ({chart.units}) ↑</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Misleading Comparison Demo for Topic 7 */}
      {misleadingDemo && (
        <div className="bg-white dark:bg-stone-900 border-2 border-rose-300 dark:border-rose-900/60 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                Misleading Chart Investigator
              </span>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                {misleadingDemo.title}
              </h3>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMisleadingMode('truncated')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  misleadingMode === 'truncated'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Misleading (Axis at 98)
              </button>
              <button
                type="button"
                onClick={() => setMisleadingMode('honest')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  misleadingMode === 'honest'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Honest (Axis at 0)
              </button>
            </div>
          </div>

          {/* Explanation Box */}
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
            misleadingMode === 'truncated'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
          }`}>
            {misleadingMode === 'truncated' ? (
              <p>
                <strong>The Illusion:</strong> Notice how the 2024 bar appears <strong>almost 3 times taller</strong> than 2023! That’s because the vertical axis starts at 98 instead of 0. This tricks the viewer’s eye into believing crime tripled.
              </p>
            ) : (
              <p>
                <strong>The Reality:</strong> With the axis honestly starting at 0, you can see that 100 vs 103 burglaries is an almost flat line — just a <strong>3% rise</strong>. Both bars are virtually identical in height.
              </p>
            )}
          </div>

          {/* Visual Bars Comparison */}
          <div className="w-full h-56 flex items-end justify-around px-8 pt-6 pb-2 border-b-2 border-l-2 border-stone-400 dark:border-stone-600 bg-stone-50/50 dark:bg-stone-800/30 rounded-br-lg relative">
            {/* Axis indicator */}
            <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-stone-500">
              Y-Axis Base: {misleadingMode === 'truncated' ? '98' : '0'}
            </div>

            {misleadingDemo.data.map((item, idx) => {
              const base = misleadingMode === 'truncated' ? 98 : 0;
              const range = misleadingMode === 'truncated' ? (104 - 98) : 110;
              const heightPercent = Math.max(10, Math.round(((item.value - base) / range) * 85));

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end w-28">
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    {item.value} burglaries
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-16 rounded-t-lg transition-all duration-500 shadow-md ${
                      misleadingMode === 'truncated' ? 'bg-rose-500' : 'bg-emerald-600'
                    }`}
                  />
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">
            Golden rule: Always check whether the vertical axis starts at zero before trusting any chart comparison!
          </p>
        </div>
      )}
    </div>
  );
};
