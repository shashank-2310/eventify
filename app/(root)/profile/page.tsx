import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'

const ProfilePage = async () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const organizedEvents = await getEventsByUser({ userId, page: 1 })

    return (
        <>
            {/* My Tickets */}
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className="wrapper flex-center sm:flex-between">
                    <h3 className="h3-bold text-center md:text-left">My Tickets</h3>
                    <Button asChild size={"lg"} className='button hidden sm:flex'>
                        <Link href={"/#events"}>
                            Explore More Events
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Events Organized */}
            {/* <section className="wrapper my-8">
                <Collection
                    data={events?.data}
                    emptyTitle="No event  tickets purchased yet"
                    emptyStateSubtext="No worries - plenty of events to explore!"
                    collectionType="All_Events"
                    limit={3}
                    page={1}
                    urlParamName='ordersPage'
                    totalPages={2}
                />
            </section> */}

            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className="wrapper flex-center sm:flex-between">
                    <h3 className="h3-bold text-center md:text-left">Events Organized</h3>
                    <Button asChild size={"lg"} className='button hidden sm:flex'>
                        <Link href={"/events/create"}>
                            Create New Event
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Events Organized */}
            <section className="wrapper my-8">
                <Collection
                    data={organizedEvents?.data}
                    emptyTitle="No events have been created yet"
                    emptyStateSubtext="Go create some now"
                    collectionType="Events_Organized"
                    limit={6}
                    page={1}
                    urlParamName='eventsPage'
                    totalPages={2}
                />
            </section>
        </>
    )
}

export default ProfilePage