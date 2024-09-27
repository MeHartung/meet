import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api'; // Import the getEvents function

describe('<EventList /> component', () => {
    let EventListComponent;
    beforeEach(() => {
        EventListComponent = render(<EventList events={[]} />); // Initialize with empty events
    });

    test('has an element with "list" role', () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });

    test('renders correct number of events', async () => {
        const allEvents = await getEvents();  // Fetch mock data
        EventListComponent.rerender(<EventList events={allEvents} />); // Rerender with fetched events
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});