'use client'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface FileUploadProps {
  category: 'health' | 'geo' | 'finance' | 'social' | 'internet'
  onUploadComplete?: (fileUrl: string) => void
  className?: string
}

interface UploadedFile {
  name: string
  size: number
  progress: number
  status: 'uploading' | 'completed' | 'error'
  url?: string
}

export function FileUpload ({
  category,
  onUploadComplete,
  className
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const supabase = createClientComponentClient()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(file => ({
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading' as const
      }))

      setFiles(prev => [...prev, ...newFiles])

      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i]
        const path = `${category}/${crypto.randomUUID()}-${file.name}`

        try {
          const { data, error } = await supabase.storage
            .from('user-data')
            .upload(path, file, {
              onUploadProgress: progress => {
                const progressPercent = (progress.loaded / progress.total) * 100
                setFiles(prev =>
                  prev.map((f, index) =>
                    f.name === file.name
                      ? { ...f, progress: progressPercent }
                      : f
                  )
                )
              }
            })

          if (error) throw error

          const {
            data: { publicUrl }
          } = supabase.storage.from('user-data').getPublicUrl(path)

          setFiles(prev =>
            prev.map(f =>
              f.name === file.name
                ? { ...f, status: 'completed', url: publicUrl }
                : f
            )
          )

          if (onUploadComplete) {
            onUploadComplete(publicUrl)
          }
        } catch (error) {
          setFiles(prev =>
            prev.map(f =>
              f.name === file.name ? { ...f, status: 'error' } : f
            )
          )
          console.error('Error uploading file:', error)
        }
      }
    },
    [category, onUploadComplete, supabase.storage]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.txt']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  })

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName))
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>Upload Data</CardTitle>
        <CardDescription>
          Drag and drop your CSV or TXT files here, or click to select files.
          Maximum file size is 5MB.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary'
          )}
        >
          <input {...getInputProps()} />
          <Upload className='mx-auto h-8 w-8 mb-4 text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>
            {isDragActive
              ? 'Drop the files here...'
              : "Drag 'n' drop files here, or click to select files"}
          </p>
        </div>

        {files.length > 0 && (
          <div className='space-y-2'>
            {files.map(file => (
              <div
                key={file.name}
                className='flex items-center gap-2 p-2 rounded-lg border bg-card text-card-foreground'
              >
                <File className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>{file.name}</p>
                  {file.status === 'uploading' && (
                    <Progress value={file.progress} className='h-1 mt-1' />
                  )}
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 flex-shrink-0'
                  onClick={() => removeFile(file.name)}
                >
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className='text-xs text-muted-foreground'>
        Supported file types: CSV, TXT
      </CardFooter>
    </Card>
  )
}
