import React from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Field } from 'formik'
import { Select, Textarea } from '@chakra-ui/react'
import ImageUpload from './ImageUpload'
import Rating from 'react-rating'

interface TextInputProps {
  fieldName: string
  placeholder: string
}
export const TextInput: React.FC<TextInputProps> = ({
  fieldName = 'name',
  placeholder = 'Name'
}) => {
  return (
    <Field name={fieldName}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <FormLabel htmlFor={fieldName}>{placeholder}</FormLabel>
          <Input {...field} id={fieldName} placeholder={placeholder} />
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
export const NumberInput: React.FC<TextInputProps> = ({
  fieldName = 'name',
  placeholder = 'Name'
}) => {
  return (
    <Field name={fieldName}>
      {({ form, field }) => (
        <FormControl
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <FormLabel htmlFor={fieldName}>{placeholder}</FormLabel>
          <Rating
            initialRating={field.value}
            onChange={value => form.setFieldValue(fieldName, value)}
          />
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export const ImageInput: React.FC<{ fieldName: string }> = ({ fieldName }) => {
  return (
    <Field name={fieldName}>
      {({ form }) => (
        <FormControl
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <ImageUpload
            onUpload={imageUrl => form.setFieldValue(fieldName, imageUrl)}
          />
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export const PasswordInput: React.FC<TextInputProps> = ({
  fieldName = 'name',
  placeholder = 'Name'
}) => {
  return (
    <Field name={fieldName}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <FormLabel htmlFor={fieldName}>{placeholder}</FormLabel>
          <Input
            {...field}
            id={fieldName}
            placeholder={placeholder}
            type="password"
          />
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export const TextAreaInput: React.FC<TextInputProps> = ({
  fieldName = 'name',
  placeholder = 'Name'
}) => {
  return (
    <Field name={fieldName}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <FormLabel htmlFor={fieldName}>{placeholder}</FormLabel>
          <Textarea {...field} id={fieldName} placeholder={placeholder} />
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

interface SelectInputProps {
  fieldName: string
  placeholder: string
  options: any
}
export const SelectInput: React.FC<SelectInputProps> = ({
  fieldName,
  placeholder,
  options
}) => {
  return (
    <Field name={fieldName}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <FormLabel htmlFor={fieldName}>{placeholder}</FormLabel>
          <Select id={fieldName} {...field} placeholder={placeholder}>
            {options?.map(option => (
              <option key={option._id} value={option?._id}>
                {option.name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
    </Field>
  )
}
