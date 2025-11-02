import { Skeleton } from '@/components/ui';

export function LoadingState() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Imagem */}
        <Skeleton className="aspect-square w-full md:w-64 md:shrink-0" />

        {/* Informações */}
        <div className="flex flex-1 flex-col justify-center gap-4">
          <Skeleton className="h-12 w-3/4" />
          <div className="flex gap-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* Tabela Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="bg-card space-y-2 rounded-lg border p-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}
