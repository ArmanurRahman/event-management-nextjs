export const getAllEvents = async () => {
    const response = await fetch(
        "https://next-first-app-5f201-default-rtdb.firebaseio.com/events.json"
    );
    const allEvents = await response.json();

    const transformedData = [];
    for (const key in allEvents) {
        transformedData.push({ id: key, ...allEvents[key] });
    }
    console.log(transformedData);
    return transformedData;
};

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}
