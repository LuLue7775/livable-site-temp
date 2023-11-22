import * as yup from 'yup'

const phoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)

export const bookingSchema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required').matches(phoneRegex, 'Phone number is not valid'),
  email: yup.string().nullable().email().required('Email is required'),
})
export const shopSchema = yup.object({
  // name: yup.string().required('Name is required'),
  // phone: yup.string().required('Phone is required').matches(phoneRegex, 'Phone number is not valid'),
  // email: yup.string().nullable().email().required('Email is required'),
})

export const checkoutSchema = yup.object({
  payer: yup.object({
    name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone is required').matches(phoneRegex, 'Phone number is not valid'),
    email: yup.string().nullable().email().required('Email is required'),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    nation: yup.string().required('Nation is required'),
  }),
  attendant: yup.lazy((value) => {
    if (!value) return yup.mixed().notRequired()

    if (Object.values(value)?.length !== 0) {
      const validationObject = {
        name: yup.string().required('Name is required'),
        phone: yup.string().required('Phone is required').matches(phoneRegex, 'Phone number is not valid'),
        email: yup.string().nullable().email().required('Email is required'),
      }
      const dynamicLengthOfAttendants =
        Object.values(value)?.length &&
        Object.keys(value).reduce(
          (acc, val) => ({
            ...acc,
            [val]: yup.object(validationObject),
          }),
          {},
        )
      return yup.object().shape(dynamicLengthOfAttendants)
    }
    return yup.mixed().notRequired()
  }),
})
