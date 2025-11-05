import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card } from '@/components/ui';
import { useTranslation } from '@/hooks';
import { truncateText, getPopularityColor, getPopularityLabel } from '@/lib/utils';
import type { SpotifyTrack } from '@/@types/spotify';

interface TopTracksPopularityChartProps {
  tracks: SpotifyTrack[];
}

interface ChartDataItem {
  name: string;
  popularity: number;
  fullName: string;
}

export function TopTracksPopularityChart({ tracks }: TopTracksPopularityChartProps) {
  const { t } = useTranslation();

  const chartData: ChartDataItem[] = tracks.map((track) => ({
    name: truncateText(track.name, 25),
    fullName: track.name,
    popularity: track.popularity,
  }));

  // Tooltip customizado
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: ChartDataItem; value: number }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border-border rounded-lg border p-3 shadow-lg">
          <p className="text-popover-foreground mb-1 font-semibold">
            {payload[0].payload.fullName}
          </p>
          <p className="text-muted-foreground text-sm">
            {t('charts.popularity')}: <span className="font-bold">{payload[0].value}</span>/100
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{t('charts.popularityTitle')}</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {t('artist.popularity')} das {tracks.length} músicas mais populares
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
          <Bar dataKey="popularity" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getPopularityColor(entry.popularity)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
        {[80, 60, 40, 20, 0].map((threshold) => (
          <div key={threshold} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded"
              style={{ backgroundColor: getPopularityColor(threshold) }}
            />
            <span className="text-muted-foreground">{getPopularityLabel(threshold)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
