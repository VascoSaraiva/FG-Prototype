import React from 'react'
import PropTypes from "prop-types";
import { Input as InputComponent } from "@/components/ui/input";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

const Input = (props) => {

    const {
        form, // Form where the input is integrated
        name,
        placeholder,
        label,
        description,
        onChange,
        onBlur,
        value,
        type
    } = props

    return (
        <>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => {

                    return (
                        <FormItem>

                            {label && <FormLabel>{label}</FormLabel>}
                           
                            <FormControl>
                                <InputComponent
                                    value={value}
                                    type={type}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    placeholder={placeholder}
                                    {...field}
                                />
                            </FormControl>

                            {description && <FormDescription>{description}</FormDescription>}
                           
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
        </>
    )
}

Input.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    type: PropTypes.string
}

export default Input
