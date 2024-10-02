
import { render, waitFor, within } from '@testing-library/react';
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import Event from '../components/Event';

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {

    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppDOM;

        given('user is on the app', () => {
            AppDOM = render(<App />).container.firstChild;
        });

        when('the app displays a list of events', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const eventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(eventListItems.length).toBeGreaterThan(0);
            });
        });

        then('the user should see the event element collapsed by default.', () => {
            const eventDetails = AppDOM.querySelector('.eventDetails');
            expect(eventDetails).not.toBeInTheDocument();
        });
    });

    test('User can expand an event to see details', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;

        given('the app is running, and the event details are hidden', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            expect(EventComponent.container.querySelector('.eventDetails')).not.toBeInTheDocument();
        });

        when('the user clicks the "Show Details" button', async () => {
            const user = userEvent.setup();
            const showDetailsButton = EventComponent.queryByText('Show Details');
            await user.click(showDetailsButton);
        });

        then('the event details should expand and become visible.', () => {
            const eventDetails = EventComponent.container.querySelector('.eventDetails');
            expect(eventDetails).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;

        given('the event details are visible', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            const user = userEvent.setup();
            const showDetailsButton = EventComponent.queryByText('Show Details');
            await user.click(showDetailsButton); // Разворачиваем детали перед тестом
            expect(EventComponent.container.querySelector('.eventDetails')).toBeInTheDocument();
        });

        when('the user clicks the "Hide Details" button', async () => {
            const user = userEvent.setup();
            const hideDetailsButton = EventComponent.queryByText('Hide Details');
            await user.click(hideDetailsButton);
        });

        then('the event details should collapse and become hidden.', () => {
            const eventDetails = EventComponent.container.querySelector('.eventDetails');
            expect(eventDetails).not.toBeInTheDocument();
        });
    });
});