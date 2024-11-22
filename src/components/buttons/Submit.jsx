import React from 'react';
import { RiSendPlaneLine } from "react-icons/ri";
import { cn } from '../../libs/utils';

export default function Submit({ label = 'Submit', icon = <RiSendPlaneLine />, className, ...props }) {
    return (
        <button
            type="submit"
            className={cn(
                "flex items-center justify-center px-4 py-2 transition-colors duration-200 space-x-2",
                "bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            {...props}
        >
            {icon && React.cloneElement(icon, { className: "h-5 w-5" })}
            <span>{label}</span>
        </button>
    )
}
