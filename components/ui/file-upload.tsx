'use client'
import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, Trash2, ExternalLink } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { format } from 'date-fns'

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface FileUploadProps {
  category: 'health' | 'geo' | 'finance' | 'social' | 'internet'
  onUploadComplete?: (fileUrl: string) => void
  className?: string
}

interface UploadingFile {
  name: string
  size: number
  progress: number
  status: 'uploading' | 'completed' | 'error'
  url?: string
}

interface StoredFile {
  id: string
  file_name: string
  file_url: string
  created_at: string
}

export function FileUpload ({
  category,
  onUploadComplete,
  className
}: FileUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([])
  const supabase = createClientComponentClient()

  // Fetch existing files on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('user_files')
        .select('*')
        .eq('user_id', user.id)
        .eq('category', category)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching files:', error)
        return
      }

      setStoredFiles(data)
    }

    fetchFiles()
  }, [category, supabase])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(file => ({
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading' as const
      }))

      setUploadingFiles(prev => [...prev, ...newFiles])

      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i]
        const path = `${category}/${crypto.randomUUID()}-${file.name}`

        try {
          const {
            data: { user }
          } = await supabase.auth.getUser()
          if (!user) throw new Error('No user found')

          const { data, error } = await supabase.storage
            .from('user-data')
            .upload(path, file, {
              onUploadProgress: progress => {
                const progressPercent = (progress.loaded / progress.total) * 100
                setUploadingFiles(prev =>
                  prev.map(f =>
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

          // Save file reference in the database
          const { data: fileData, error: dbError } = await supabase
            .from('user_files')
            .insert({
              user_id: user.id,
              category,
              file_name: file.name,
              file_url: publicUrl
            })
            .select()
            .single()

          if (dbError) throw dbError

          setUploadingFiles(prev => prev.filter(f => f.name !== file.name))

          setStoredFiles(prev => [fileData, ...prev])

          if (onUploadComplete) {
            onUploadComplete(publicUrl)
          }
        } catch (error) {
          console.error('Error uploading file:', error)
          setUploadingFiles(prev =>
            prev.map(f =>
              f.name === file.name ? { ...f, status: 'error' } : f
            )
          )
        }
      }
    },
    [category, onUploadComplete, supabase]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.txt']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  })

  const handleDelete = async (fileId: string, fileUrl: string) => {
    try {
      // Extract the path from the URL
      const path = fileUrl.split('/').pop()
      if (!path) throw new Error('Invalid file path')

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('user-data')
        .remove([`${category}/${path}`])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('user_files')
        .delete()
        .eq('id', fileId)

      if (dbError) throw dbError

      // Update UI
      setStoredFiles(prev => prev.filter(file => file.id !== fileId))
    } catch (error) {
      console.error('Error deleting file:', error)
    }
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

        {/* Uploading Files */}
        {uploadingFiles.length > 0 && (
          <div className='space-y-2'>
            {uploadingFiles.map(file => (
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
                {file.status === 'error' && (
                  <Alert variant='destructive'>
                    <AlertTitle>Upload failed</AlertTitle>
                    <AlertDescription>
                      There was an error uploading your file.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stored Files */}
        {storedFiles.length > 0 && (
          <div className='space-y-2'>
            <h3 className='text-sm font-medium'>Uploaded Files</h3>
            {storedFiles.map(file => (
              <div
                key={file.id}
                className='flex items-center gap-2 p-2 rounded-lg border bg-card text-card-foreground'
              >
                <File className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>
                    {file.file_name}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {format(new Date(file.created_at), 'PPp')}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    asChild
                    className='h-8 w-8'
                  >
                    <a
                      href={file.file_url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <ExternalLink className='h-4 w-4' />
                      <span className='sr-only'>View file</span>
                    </a>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 hover:text-destructive'
                      >
                        <Trash2 className='h-4 w-4' />
                        <span className='sr-only'>Delete file</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete File</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this file? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(file.id, file.file_url)}
                          className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
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
