import { cn } from '../../libs/utils';
import { FormikError } from './FormikError';

export default function InputWrapper({ label, error, touched, children, className, ...props }) {
    return (
        <div className={cn("w-full space-y-2 my-2", className)} {...props}>
            {label && <label>{label}</label>}
            {children}
            {error && touched && <FormikError error={error} touched={touched} />}
        </div>
    )
}
