import React from "react";
import clsx from "clsx"; // optional: utility for conditional class merge

const ButtonWithIcon = ({
    title,
    iconLeft,
    iconRight,
    type = "button",
    variant = "regular", // 'regular' | 'brand'
    active = false,
    onClick,
    disabled = false,
    className = "",
}) => {
    const baseClasses =
        "flex items-center gap-2 text-sm font-semibold border rounded-[4px] px-4 py-2 shadow-sm transition duration-150 ease-in-out";

    const variants = {
        brand: "text-[#EB2027] bg-[#FFE2E6] border-[#EB2027] hover:bg-[#EB2027] hover:text-white",
        regular:
            "text-[#101010] bg-white border-[#D9D9D9] hover:bg-[#EB2027] hover:text-white",
        active: "bg-[#EB2027] text-white border-[#EB2027]",
    };

    const computedClasses = clsx(
        baseClasses,
        variant === "brand" ? variants.brand : variants.regular,
        active && variants.active,
        disabled && "opacity-50 cursor-not-allowed",
        className
    );

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={computedClasses}
        >
            {iconLeft && <span className="flex items-center">{iconLeft}</span>}
            {title && <span>{title}</span>}
            {iconRight && (
                <span className="flex items-center">{iconRight}</span>
            )}
        </button>
    );
};

export default ButtonWithIcon;
