'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const forumPostSchema = z.object({
  caption: z.string().trim().min(10, 'Title must be at least 10 characters').max(200),
  content: z.string().trim().min(10, 'Message must be at least 10 characters'),
  categoryId: z.string().min(1, 'Choose a category'),
});

type CategoryOption = { id: string; name: string };

export function SubmitForum({ categories }: { categories: CategoryOption[] }) {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, watch } =
    useForm<z.infer<typeof forumPostSchema>>({
      resolver: zodResolver(forumPostSchema),
      defaultValues: { caption: '', content: '', categoryId: '' },
    });

  const captionCount = watch('caption')?.length ?? 0;

  async function onSubmit(values: z.infer<typeof forumPostSchema>) {
    setServerError('');
    try {
      const response = await fetch('/api/create-forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setServerError(payload?.error ?? 'Could not create post. Please try again.');
        return;
      }
      reset();
      router.refresh();
    } catch {
      setServerError('Network error. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-sky-950">Start a Discussion</h2>
        <span className="text-xs text-slate-500">Share with other divers</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="forum-caption" className="mb-1.5 block text-sm font-semibold text-slate-700">Thread title</label>
          <Input id="forum-caption" {...register('caption')} placeholder="What would you like to discuss?" maxLength={200} />
          <p className="mt-1 text-right text-xs text-slate-500">{captionCount}/200</p>
          {errors.caption && <p className="text-sm text-red-600">{errors.caption.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="forum-category" className="mb-1.5 block text-sm font-semibold text-slate-700">Category</label>
          <select id="forum-category" {...register('categoryId')} className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-cyan-600">
            <option value="">Choose a category</option>
            {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
          </select>
          {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="forum-content" className="mb-1.5 block text-sm font-semibold text-slate-700">Message</label>
        <Textarea id="forum-content" {...register('content')} placeholder="Tell the community more..." className="min-h-32 resize-y" />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
      </div>
      {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !categories.length}>
          {isSubmitting ? 'Posting...' : 'Post Discussion'}
        </Button>
      </div>
    </form>
  );
}
