import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Play, RotateCcw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type JobStatus = 'queued' | 'running' | 'done' | 'error';

interface JobFile {
  id: string;
  file_url: string;
  thumb_url?: string;
  duration?: number;
  size?: number;
}

interface Job {
  id: string;
  dialogue_uuid: string;
  quantity: number;
  status: JobStatus;
  error?: string;
  created_at: string;
  finished_at?: string;
  files?: JobFile[];
}

interface RenderBarProps {
  jobs: Job[];
  onRefreshJob?: (jobId: string) => void;
  onDownloadFile?: (fileUrl: string, fileName: string) => void;
  onPlayFile?: (fileUrl: string) => void;
  className?: string;
}

export function RenderBar({ 
  jobs, 
  onRefreshJob, 
  onDownloadFile, 
  onPlayFile, 
  className 
}: RenderBarProps) {
  const [pollingJobs, setPollingJobs] = useState<Set<string>>(new Set());

  // Автополлинг для running/queued джобов
  useEffect(() => {
    const runningJobs = jobs.filter(job => 
      job.status === 'running' || job.status === 'queued'
    );
    
    setPollingJobs(new Set(runningJobs.map(job => job.id)));
    
    if (runningJobs.length > 0) {
      const interval = setInterval(() => {
        runningJobs.forEach(job => {
          onRefreshJob?.(job.id);
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [jobs, onRefreshJob]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} МБ`;
  };

  if (jobs.length === 0) {
    return (
      <div className={cn("w-full", className)}>
        <Card className="p-6 text-center space-y-3">
          <Clock className="w-8 h-8 mx-auto text-text-muted" />
          <div>
            <h3 className="font-semibold text-text-primary">Пока пусто</h3>
            <p className="text-sm text-text-muted">
              Ваши генерации появятся здесь
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text-primary">Render Bar</h3>
        <span className="text-sm text-text-muted">{jobs.length}</span>
      </div>
      
      <ScrollArea className="h-[calc(100vh-12rem)] custom-scrollbar">
        <div className="space-y-3 pr-2">
          {jobs.map((job) => (
            <Card key={job.id} className="p-4 space-y-3">
              {/* Заголовок джоба */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusPill status={job.status} />
                    {job.quantity > 1 && (
                      <span className="text-xs text-text-muted">
                        {job.quantity} видео
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted">
                    {formatDate(job.created_at)}
                  </p>
                </div>
                
                {(job.status === 'running' || job.status === 'queued') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRefreshJob?.(job.id)}
                    className="h-8 w-8 p-0"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Ошибка */}
              {job.status === 'error' && job.error && (
                <div className="p-2 bg-error-light rounded-lg">
                  <p className="text-xs text-error">{job.error}</p>
                </div>
              )}

              {/* Файлы результата */}
              {job.files && job.files.length > 0 && (
                <div className="space-y-2">
                  {job.files.map((file, index) => (
                    <div 
                      key={file.id} 
                      className="bg-background rounded-lg border border-border-light p-3 space-y-2"
                    >
                      {/* Превью видео */}
                      {file.thumb_url && (
                        <div className="relative aspect-video bg-border-light rounded-lg overflow-hidden">
                          <img
                            src={file.thumb_url}
                            alt={`Превью ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onPlayFile?.(file.file_url)}
                              className="text-white hover:bg-white/20"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Метаданные файла */}
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <div className="flex items-center gap-2">
                          {file.duration && (
                            <span>{formatDuration(file.duration)}</span>
                          )}
                          {file.size && (
                            <span>{formatFileSize(file.size)}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onPlayFile?.(file.file_url)}
                            className="h-7 px-2 text-xs"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Открыть
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDownloadFile?.(file.file_url, `video-${index + 1}.mp4`)}
                            className="h-7 px-2 text-xs"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
