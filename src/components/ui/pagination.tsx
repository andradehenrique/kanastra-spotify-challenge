import { Button } from './button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export interface PaginationProps {
  /**
   * Página atual (baseada em 1)
   */
  currentPage: number;
  /**
   * Total de páginas
   */
  totalPages: number;
  /**
   * Callback chamado quando a página muda
   */
  onPageChange: (page: number) => void;
  /**
   * Número total de itens (opcional, para mostrar informações)
   */
  totalItems?: number;
  /**
   * Itens por página (opcional, para mostrar informações)
   */
  itemsPerPage?: number;
  /**
   * Classe CSS adicional
   */
  className?: string;
}

/**
 * Componente de Paginação customizado
 * Exibe controles de navegação Previous/Next e informações da página atual
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className,
}: PaginationProps) {
  const { t } = useTranslation();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleGoToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Calcula informações de exibição
  const getItemsInfo = () => {
    if (!totalItems || !itemsPerPage) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return { startItem, endItem };
  };

  const itemsInfo = getItemsInfo();

  // Gera array de páginas a serem exibidas (com ellipsis)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Mostra todas as páginas se forem poucas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para ellipsis
      if (currentPage <= 3) {
        // Início
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Final
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Meio
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null; // Não exibe paginação se houver apenas 1 página
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex flex-col items-center gap-4 sm:flex-row sm:justify-between', className)}
    >
      {/* Informações de itens (opcional) */}
      {itemsInfo && (
        <div className="text-muted-foreground text-sm">
          {t('common.showing')} <span className="font-medium">{itemsInfo.startItem}</span>{' '}
          {t('common.to')} <span className="font-medium">{itemsInfo.endItem}</span> {t('common.of')}{' '}
          <span className="font-medium">{totalItems}</span> {t('common.results')}
        </div>
      )}

      {/* Controles de navegação */}
      <div className="flex items-center gap-2">
        {/* Botão Previous */}
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={isFirstPage}
          aria-label={t('common.previous')}
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="ml-1">{t('common.previous')}</span>
        </Button>

        {/* Números das páginas */}
        <div className="hidden items-center gap-1 sm:flex">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="text-muted-foreground px-2">
                  ...
                </span>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <Button
                key={pageNumber}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleGoToPage(pageNumber)}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isActive ? 'page' : undefined}
                className="min-w-9"
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        {/* Indicador de página atual (mobile) */}
        <div className="text-muted-foreground flex items-center gap-2 text-sm sm:hidden">
          <span>
            {t('common.page')} {currentPage} {t('common.of')} {totalPages}
          </span>
        </div>

        {/* Botão Next */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={isLastPage}
          aria-label={t('common.next')}
        >
          <span className="mr-1">{t('common.next')}</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </nav>
  );
}

/**
 * Componente mais simples de paginação (apenas Previous/Next)
 */
export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: Pick<PaginationProps, 'currentPage' | 'totalPages' | 'onPageChange' | 'className'>) {
  const { t } = useTranslation();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Simple pagination"
      className={cn('flex items-center justify-center gap-4', className)}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={isFirstPage}
        aria-label={t('common.previous')}
      >
        {t('common.previous')}
      </Button>

      <span className="text-muted-foreground text-sm">
        {t('common.page')} <span className="font-medium">{currentPage}</span> {t('common.of')}{' '}
        <span className="font-medium">{totalPages}</span>
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={isLastPage}
        aria-label={t('common.next')}
      >
        {t('common.next')}
      </Button>
    </nav>
  );
}
