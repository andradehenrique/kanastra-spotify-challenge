import { useTranslation } from '@/hooks';
import { SiGithub } from '@icons-pack/react-simple-icons';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background mt-auto w-full border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8">
        <div className="text-muted-foreground flex flex-col items-center gap-2 text-center text-sm md:flex-row md:text-left">
          <span>
            {t('footer.developerBy')}{' '}
            <a
              href="https://github.com/andradehenrique"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary font-medium underline underline-offset-4"
            >
              Henrique Andrade
            </a>
          </span>
          <span className="hidden md:inline">•</span>
          <span>© {currentYear}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/andradehenrique/kanastra-spotify-challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
          >
            <SiGithub className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
