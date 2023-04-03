export const getAllEvents = async () => {
    const response = await fetch(
        "https://next-first-app-5f201-default-rtdb.firebaseio.com/events.json"
    );
    const allEvents = await response.json();

    const transformedData = [];
    for (const key in allEvents) {
        transformedData.push({ id: key, ...allEvents[key] });
    }
    return transformedData;
};

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();
    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month - 1
        );
    });

    return filteredEvents;
}
