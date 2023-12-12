import cn from "@/lib/utils";

type TLiveBadge = {
    className?: string;
}

function LiveBadge({ className }: TLiveBadge) {
    return <div className={cn("bg-blue-500 text-center p-0.5 px-1.5 rounded-md uppercase text-xs border border-background font-semibold tracking-wide", className)}>Live</div>;
}

export default LiveBadge;
