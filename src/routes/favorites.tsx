import { createFileRoute } from '@tanstack/react-router';
import { FavoritesContainer } from '@/features/favorites';
import { PageWrapper } from '@/components/layout/PageWrapper';

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
});

function FavoritesPage() {
  return (
    <PageWrapper>
      <FavoritesContainer />
    </PageWrapper>
  );
}
