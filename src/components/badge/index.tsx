import { ComponentChildren } from "preact";

const Badge = ({ children }: { children?: ComponentChildren }) => {
    return (
        <div className="relative">
            {children}
            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500" />
        </div>
    );
};

export default Badge;
