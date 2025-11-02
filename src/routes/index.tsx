import { createFileRoute } from '@tanstack/react-router';
import { PageWrapper } from '@/components/layout';
import { ArtistSearchContainer } from '@/features/artist-search';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <PageWrapper>
      <ArtistSearchContainer />
    </PageWrapper>
  );
}
