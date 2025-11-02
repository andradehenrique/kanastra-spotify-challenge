import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { favoriteSongSchema, type FavoriteSongFormData } from '@/schemas';
import { useTranslation } from '@/hooks';
import { Button } from '@/components/ui/button';

/**
 * Exemplo de formulário usando React Hook Form + Zod
 */
export function FavoriteFormExample() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FavoriteSongFormData>({
    resolver: zodResolver(favoriteSongSchema),
    defaultValues: {
      songName: '',
      artistName: '',
      albumName: '',
      notes: '',
    },
  });

  const onSubmit = async (data: FavoriteSongFormData) => {
    console.log('Form submitted:', data);
    // Aqui será implementado o Context API para salvar no Local Storage
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula async
    alert(t('favorites.form.success'));
    reset();
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-bold">{t('favorites.form.songName')}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Song Name */}
        <div>
          <label htmlFor="songName" className="mb-1 block text-sm font-medium">
            {t('favorites.form.songName')} *
          </label>
          <input
            id="songName"
            type="text"
            {...register('songName')}
            placeholder={t('favorites.form.songNamePlaceholder')}
            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
          />
          {errors.songName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.songName.message || t('favorites.validation.songNameRequired')}
            </p>
          )}
        </div>

        {/* Artist Name */}
        <div>
          <label htmlFor="artistName" className="mb-1 block text-sm font-medium">
            {t('favorites.form.artistName')} *
          </label>
          <input
            id="artistName"
            type="text"
            {...register('artistName')}
            placeholder={t('favorites.form.artistNamePlaceholder')}
            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
          />
          {errors.artistName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.artistName.message || t('favorites.validation.artistNameRequired')}
            </p>
          )}
        </div>

        {/* Album Name (Optional) */}
        <div>
          <label htmlFor="albumName" className="mb-1 block text-sm font-medium">
            {t('favorites.form.albumName')}
          </label>
          <input
            id="albumName"
            type="text"
            {...register('albumName')}
            placeholder={t('favorites.form.albumNamePlaceholder')}
            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
          />
          {errors.albumName && (
            <p className="mt-1 text-sm text-red-600">{errors.albumName.message}</p>
          )}
        </div>

        {/* Notes (Optional) */}
        <div>
          <label htmlFor="notes" className="mb-1 block text-sm font-medium">
            {t('favorites.form.notes')}
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            placeholder={t('favorites.form.notesPlaceholder')}
            rows={3}
            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
          />
          {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? t('common.loading') : t('favorites.form.submit')}
        </Button>
      </form>
    </div>
  );
}
