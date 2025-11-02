import { createFileRoute } from '@tanstack/react-router';
import { SearchContainer } from '@/features/search';
import { PageWrapper } from '@/components/layout';

type SearchParams = {
  q?: string;
  page?: number;
  type?: 'artist' | 'album';
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
      <SearchContainer />
    </PageWrapper>
  );
}
