import { createFileRoute } from '@tanstack/react-router';
import { PageWrapper } from '@/components/layout';
import { ArtistSearchContainer } from '@/features/artist-search';

type SearchParams = {
  q?: string;
  type?: 'artist' | 'album';
  page?: number;
};

export const Route = createFileRoute('/')({
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      q: search.q ? (search.q as string) : undefined,
      type: search.type === 'artist' || search.type === 'album' ? search.type : undefined,
      page: search.page ? Number(search.page) : undefined,
    };
  },
});

function HomePage() {
  return (
    <PageWrapper>
      <ArtistSearchContainer />
    </PageWrapper>
  );
}
