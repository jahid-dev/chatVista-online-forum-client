# Forum Application Summary

## Features

1. **Responsive Design**
   - *Description:* The forum boasts a responsive homepage design, ensuring optimal user experiences across various devices.
   - *Implementation:* Utilized media queries and responsive design principles to create a consistent and visually appealing layout on desktops, tablets, and mobile phones.

2. **Dynamic Post Sorting and Pagination**
   - *Description:* Users can view posts sorted by popularity and navigate through content using a pagination feature.
   - *Implementation:* Employed MongoDB aggregation for vote-based post sorting and implemented a pagination system displaying five posts per page.

3. **User Interaction and Engagement**
   - *Description:* Users can engage with posts through upvotes, downvotes, comments, and sharing. The forum includes a comment section with reporting functionality.
   - *Implementation:* Integrated upvote and downvote features, a dynamic comment section, and utilized the react-share package for post sharing. Admins can manage reported comments.

4. **Membership and User Dashboard**
   - *Description:* The platform features a membership system with a payment page, offering additional privileges such as a Gold badge for members. Users have a personalized dashboard for profile and post management.
   - *Implementation:* Created a private membership page for payments, user dashboard with profile and post management routes, and added badge rewards for registration and membership.

5. **Admin Dashboard and Management**
   - *Description:* Admins have access to a dedicated dashboard for managing users, reported comments, making announcements, and maintaining site statistics.
   - *Implementation:* Implemented admin-specific routes, user management functionalities, an announcement system, and a reported activities page. Included server-side search for efficient user lookup.

## Technologies Used

### Frontend:
- **React, Material-Tailwind, Tailwind CSS:** For building a modular, visually appealing, and responsive user interface.
- **Axios:** For handling asynchronous HTTP requests.

### Backend:
- **Express:** As the backend framework for routing and server-side logic.
- **Mongoose:** As an ODM library for MongoDB, simplifying database interactions.
- **MongoDB:** Chosen as the database for storing and retrieving application data.
- **Stripe:** Integrated for secure payment processing and membership transactions.
- **Firebase:** Used for hosting the frontend application.

### Additional Tools:
- **Handle:** For server-side templating, enabling dynamic content rendering.
- **Firebase Authentication:** For secure user authentication and authorization.

## How to Use

- **Setting Up the Project**
  - Follow the instructions in the server-side and client-side repositories to set up the project locally.

- **Running the Application**
  - Navigate to the client-side directory and run `npm start` to start the frontend.
  - Navigate to the server-side directory and run `npm start` to start the backend.

- **Accessing the Live Site**
  - Visit the provided [Front-end Live Site Link](https://chatvista-online-forum-client.web.app/) to explore the live version of the forum.
