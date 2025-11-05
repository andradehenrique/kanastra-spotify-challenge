import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArtistHeader } from './ArtistHeader';
import type { SpotifyArtist } from '@/@types/spotify';

vi.mock('@/hooks', () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));

vi.mock('@/components/ui/icons', () => ({
  User: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="user-icon" {...props} />,
  Users: () => <svg />,
  TrendingUp: () => <svg />,
  Album: () => <svg />,
}));

const mockArtist: SpotifyArtist = {
  external_urls: { spotify: 'https://open.spotify.com/artist/123' },
  href: '',
  id: '123',
  name: 'Mock Artist',
  type: 'artist',
  uri: '',
  followers: { href: null, total: 123456 },
  genres: ['rock', 'pop'],
  images: [{ url: 'https://mock.com/image.jpg', height: 300, width: 300 }],
  popularity: 77,
};

describe('ArtistHeader', () => {
  it('renderiza nome, seguidores, popularidade e gêneros', () => {
    render(<ArtistHeader artist={mockArtist} />);
    expect(screen.getByText('Mock Artist')).toBeInTheDocument();
    expect(
      screen.getByText((content) => typeof content === 'string' && content.includes('123.5'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) => typeof content === 'string' && content.replace(/\s/g, '') === '77/100'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('rock')).toBeInTheDocument();
    expect(screen.getByText('pop')).toBeInTheDocument();
  });

  it('renderiza imagem do artista', () => {
    render(<ArtistHeader artist={mockArtist} />);
    const img = screen.getByAltText('Mock Artist') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('https://mock.com/image.jpg');
  });

  it('renderiza link do Spotify', () => {
    render(<ArtistHeader artist={mockArtist} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://open.spotify.com/artist/123');
  });

  it('renderiza placeholder se não houver imagem', () => {
    const artistNoImg = { ...mockArtist, images: [] };
    render(<ArtistHeader artist={artistNoImg} />);
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });
});
