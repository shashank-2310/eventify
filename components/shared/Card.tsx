"use client"

import { IEvent } from "@/lib/database/models/event.model"
import Link from "next/link"

type CardProps = {
    event: IEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
    return (
        <div className="group relative flex min-h-[380px] max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[430px]">
            <Link
                href={`/events/${event._id}`}
                style={{ backgroundImage: `url(${event.imageUrl})` }}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
            />
                {/* is event creator */}
        </div>
    )
}

export default Card