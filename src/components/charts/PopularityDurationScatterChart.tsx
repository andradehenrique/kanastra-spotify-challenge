import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
} from 'recharts';
import { Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui';
import { useTranslation } from '@/hooks';
import type { SpotifyTrack } from '@/@types/spotify';

interface PopularityDurationScatterChartProps {
  tracks: SpotifyTrack[];
}

interface ChartDataItem {
  name: string;
  duration: number; // em minutos
  popularity: number;
  durationMs: number; // original em ms
  durationFormatted: string; // formato mm:ss
}

export function PopularityDurationScatterChart({ tracks }: PopularityDurationScatterChartProps) {
  const { t } = useTranslation();

  const msToMinutes = (ms: number): number => {
    return Number((ms / 60000).toFixed(2));
  };

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const chartData: ChartDataItem[] = tracks.map((track) => ({
    name: track.name,
    duration: msToMinutes(track.duration_ms),
    popularity: track.popularity,
    durationMs: track.duration_ms,
    durationFormatted: formatDuration(track.duration_ms),
  }));

  const avgDuration = chartData.reduce((sum, item) => sum + item.duration, 0) / chartData.length;
  const avgPopularity =
    chartData.reduce((sum, item) => sum + item.popularity, 0) / chartData.length;

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: ChartDataItem }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border-border rounded-lg border p-3 shadow-lg">
          <p className="text-popover-foreground mb-2 font-semibold">{data.name}</p>
          <div className="text-muted-foreground space-y-1 text-sm">
            <p className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {t('tracks.duration')}: <span className="font-bold">{data.durationFormatted}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              {t('charts.popularity')}: <span className="font-bold">{data.popularity}/100</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: { cx?: number; cy?: number; payload?: ChartDataItem }) => {
    const { cx, cy, payload } = props;
    let fill = 'hsl(0, 84%, 60%)'; // Vermelho (baixa)

    if (payload && payload.popularity >= 80) {
      fill = 'hsl(142, 76%, 36%)'; // Verde
    } else if (payload && payload.popularity >= 60) {
      fill = 'hsl(221, 83%, 53%)'; // Azul
    } else if (payload && payload.popularity >= 40) {
      fill = 'hsl(262, 83%, 58%)'; // Roxo
    } else if (payload && payload.popularity >= 20) {
      fill = 'hsl(25, 95%, 53%)'; // Laranja
    }

    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={fill}
        stroke="hsl(var(--background))"
        strokeWidth={2}
        className="hover:r-8 transition-all"
      />
    );
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{t('charts.popularityVsDuration')}</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {t('charts.popularityVsDurationDescription')}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            type="number"
            dataKey="duration"
            name={t('tracks.duration')}
            unit=" min"
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            label={{
              value: `${t('tracks.duration')} (minutos)`,
              position: 'insideBottom',
              offset: -10,
              style: { fill: 'hsl(var(--muted-foreground))' },
            }}
          />
          <YAxis
            type="number"
            dataKey="popularity"
            name={t('charts.popularity')}
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            label={{
              value: t('charts.popularity'),
              angle: -90,
              position: 'insideLeft',
              style: { fill: 'hsl(var(--muted-foreground))' },
            }}
          />
          <ZAxis range={[60, 60]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            content={() => (
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: 'hsl(142, 76%, 36%)' }}
                  />
                  <span className="text-muted-foreground">80-100</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: 'hsl(221, 83%, 53%)' }}
                  />
                  <span className="text-muted-foreground">60-79</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: 'hsl(262, 83%, 58%)' }}
                  />
                  <span className="text-muted-foreground">40-59</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: 'hsl(25, 95%, 53%)' }}
                  />
                  <span className="text-muted-foreground">20-39</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: 'hsl(0, 84%, 60%)' }}
                  />
                  <span className="text-muted-foreground">0-19</span>
                </div>
              </div>
            )}
          />
          <Scatter name="Tracks" data={chartData} fill="hsl(221, 83%, 53%)" shape={<CustomDot />} />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="border-border mt-6 grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
            {t('charts.avgDuration')}
          </p>
          <p className="text-foreground text-2xl font-bold">
            {avgDuration.toFixed(1)} <span className="text-lg font-normal">min</span>
          </p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
            {t('charts.avgPopularity')}
          </p>
          <p className="text-foreground text-2xl font-bold">
            {avgPopularity.toFixed(0)} <span className="text-lg font-normal">/100</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
