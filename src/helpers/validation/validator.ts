








export const required = (value: string) => value ? undefined : 'Required'

export const maxLength = (length: number) => (value: string) =>
    value && value.length < length ? undefined : `maxLength must be ${length} symbols`
