'use client'
import { checkoutSchema } from '@/utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'

const CheckoutFormProvider = ({ children }) => {
  const methods = useForm({
    resolver: yupResolver(checkoutSchema),
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

export default CheckoutFormProvider
