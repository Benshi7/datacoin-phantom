interface AuthErrorProps {
  title?: string
  message: string
}

export function AuthError({ title = "Authentication Error", message }: AuthErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">{title}</h1>
        <p className="mt-2 text-gray-600">{message}</p>
        <p className="mt-4 text-sm text-muted-foreground">If this error persists, please contact support.</p>
      </div>
    </div>
  )
}

