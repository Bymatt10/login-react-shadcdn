import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { LoginFormData, loginSchema } from '@/schemas/authSchemas'
import { useLoginMutation } from '@/hooks/useAuthMutation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LogIn } from 'lucide-react'

export const LoginForm = () => {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync({ ...data, expiresInMins: 60 })
      navigate('/tarifas')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Ingresa tu contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {loginMutation.isError && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-600">
              Credenciales inválidas. Intenta con "emilys" / "emilyspass"
            </p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <LogIn className="mr-2 h-4 w-4" />
          {form.formState.isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>

      </form>
    </Form>
  )
}

