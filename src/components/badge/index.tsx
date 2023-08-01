import { ComponentChildren } from "preact";

const Badge = ({ children }: { children?: ComponentChildren }) => {
    return (
        <div className="relative">
            {children}
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
        </div>
    );
};

export default Badge;
