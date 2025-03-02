import React, { Children } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PropTypes from 'prop-types';

import { Form as FormComponent } from "@/components/ui/form"

const Form = (props) => {
    const {
        id,
        className,
        schema,
        defaultValues,
        onSubmit,
        children
    } = props;

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });


    const deepCloneChildren = (child, extraProps) => {
        if (!React.isValidElement(child)) return child;
        const clonedChildren = child.props.children
            ? Children.map(child.props.children, nestedChild =>
                  deepCloneChildren(nestedChild, extraProps)
              )
            : child.props.children;
        return React.cloneElement(child, extraProps, clonedChildren);
    };

    return (
        <FormComponent {...form}>
            <form id={id} onSubmit={form.handleSubmit(onSubmit)} className={className}>
                {Children.toArray(children).map(child =>
                    deepCloneChildren(child, { form })
                )}
            </form>
        </FormComponent>
    );
};

Form.propTypes = {
    schema: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    defaultValues: PropTypes.object,
};

export default Form;
