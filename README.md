
### Features
- **Responsive Design**
  - *Description:* The forum features a responsive homepage design, optimized for seamless user experiences across various devices, including desktops, tablets, and mobile phones.
  - *Implementation:* Utilized media queries and responsive design principles to ensure a consistent and visually appealing layout on different screen sizes.

- **Dynamic Post Sorting and Pagination**
  - *Description:* Users can view posts sorted by popularity (based on upvotes and downvotes) and navigate through the content with a pagination feature.
  - *Implementation:* Employed MongoDB aggregation pipeline to calculate vote differences and sort posts accordingly. Implemented a pagination system to display five posts per page.

- **User Interaction and Engagement**
  - *Description:* Users can engage with posts through upvotes, downvotes, comments, and sharing. Additionally, the forum includes a comment section with reporting functionality.
  - *Implementation:* Integrated upvote and downvote features, implemented a comment section with dynamic comment lengths, and used the react-share package for post sharing. Admins can manage reported comments.

- **Membership and User Dashboard**
  - *Description:* The platform offers a membership system with a payment page, providing additional privileges such as a Gold badge for members. Users have a personalized dashboard for managing their profile, posts, and interactions.
  - *Implementation:* Created a private membership page for payments, user dashboard with routes for profile, post management, and added badge rewards for registration and membership.

- **Admin Dashboard and Management**
  - *Description:* Admins have access to a dedicated dashboard with features for managing users, reported comments, making announcements, and maintaining site statistics.
  - *Implementation:* Implemented admin-specific routes, user management functionalities, an announcement system, and a reported activities page. Included server-side search for efficient user lookup.

### How to Use
- **Setting Up the Project**
  - Follow the instructions in the server-side and client-side repositories to set up the project locally.

- **Running the Application**
  - Navigate to the client-side directory and run \`npm start\` to start the frontend.
  - Navigate to the server-side directory and run \`npm start\` to start the backend.

- **Accessing the Live Site**
  - Visit the provided [Front-end Live Site Link](#) to explore the live version of the forum.


