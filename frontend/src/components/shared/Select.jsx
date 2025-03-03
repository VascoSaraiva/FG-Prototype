import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import React from 'react'

const Select = (props) => {

  const {
    form, // Form where the select is integrated
    placeholder,
    items,
    name,
    description,
    className = 'w-full',
    label,
  } = props

  const fruits = {
    apple: 'Apple',
    banana: 'Banana',
    cherry: 'Cherry',
  }

  const food = {
    fruits: {
      apple: 'Apple',
      banana: 'Banana',
      cherry: 'Cherry',
    },
    vegetables: {
      carrot: 'Carrot',
      potato: 'Potato',
      tomato: 'Tomato',
    }
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>

          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <SelectComponent onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>

                {Object.keys(items).map((item, index) => (
                  <>

                    {typeof items[item] === 'string' && (
                      <SelectItem key={index} value={item}>{items[item]}</SelectItem>
                    )}

                    {typeof items[item] === 'object' && (
                      <SelectGroup key={index}>
                        <SelectLabel>{items[item]}</SelectLabel>

                        {Object.keys(items[item]).map((subItem, subIndex) => (
                          <SelectItem key={subIndex} value={subItem}>{items[item][subItem]}</SelectItem>
                        ))}

                      </SelectGroup>
                    )}

                  </>
                ))}

              </SelectContent>
            </SelectComponent>

          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />

        </FormItem>
      )}
    />
  )
}

export default Select
