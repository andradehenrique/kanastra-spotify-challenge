import { createFileRoute } from '@tanstack/react-router';
import { ArtistDetailsContainer } from '@/features/artist-details';
import { PageWrapper } from '@/components/layout';

export const Route = createFileRoute('/artist/$artistId')({
  component: ArtistDetailsPage,
});

function ArtistDetailsPage() {
  const { artistId } = Route.useParams();

  return (
    <PageWrapper>
      <ArtistDetailsContainer artistId={artistId} />
    </PageWrapper>
  );
}
