Feature: Show/Hide Event Details

    Scenario: An event element is collapsed by default
        Given user is on the app
        When the app displays a list of events
        Then the user should see the event element collapsed by default.

    Scenario: User can expand an event to see details
        Given the app is running, and the event details are hidden
        When the user clicks the "Show Details" button
        Then the event details should expand and become visible.

    Scenario: User can collapse an event to hide details
        Given the event details are visible
        When the user clicks the "Hide Details" button
        Then the event details should collapse and become hidden.