import * as CheckboxPrimitive from '@rn-primitives/checkbox'
import * as React from 'react'
import { Platform } from 'react-native'
import { cn } from '../../lib/utils'
import { Check } from '../../lib/icons/Check'

function Checkbox({
    className,
    ...props
}: CheckboxPrimitive.RootProps & {
    ref?: React.RefObject<CheckboxPrimitive.RootRef>
}) {
    return (
        <CheckboxPrimitive.Root
            className={cn(
                'web:peer h-3 w-3 native:h-[15] native:w-[15] shrink-0 rounded-sm native:rounded border border-primary web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                props.checked && 'bg-primary',
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator className={cn('items-center justify-center h-full w-full')}>
                <Check
                    size={12}
                    strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
                    className='text-primary-foreground'
                />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
}

export { Checkbox }