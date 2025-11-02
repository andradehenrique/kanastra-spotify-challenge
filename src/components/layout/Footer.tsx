import { useTranslation } from '@/hooks';
import { SiGithub } from '@icons-pack/react-simple-icons';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8 mx-auto">
        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <span>
            {t('footer.developerBy')}{' '}
            <a
              href="https://github.com/andradehenrique"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
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
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <SiGithub className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
