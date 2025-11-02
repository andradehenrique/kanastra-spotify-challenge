import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  itemCount?: number;
}

export function LoadingState({ itemCount = 20 }: LoadingStateProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: itemCount }).map((_, index) => (
        <Card key={index} className="h-full overflow-hidden pt-0">
          {/* Skeleton da Imagem */}
          <Skeleton className="aspect-square w-full" />

          {/* Skeleton do Conteúdo */}
          <div className="space-y-3 px-4">
            {/* Nome */}
            <Skeleton className="h-6 w-3/4" />

            {/* Badges/Gêneros */}
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-14" />
            </div>

            {/* Barra de Popularidade ou Info */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Seguidores ou Tracks Info */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
