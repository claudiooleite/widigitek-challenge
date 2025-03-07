# Restaurant Finder Challenge

## Overview
This project is a **Restaurant Finder Web Application** that allows users to explore various restaurants, view details, and mark their favorite spots. The application is built using **React, Redux, and Axios**, with **React Router** for navigation and **Redux Toolkit** for state management. It also includes an infinite scroll feature for seamless browsing.

## Features
- **Restaurant Listing Page**
  - Displays a paginated list of restaurants retrieved from an API.
  - Infinite scrolling to load more restaurants dynamically.
  - Users can mark/unmark restaurants as favorites.
  - A toggle button to filter and view only favorite restaurants.
  
- **Restaurant Details Page**
  - Displays restaurant-specific details such as name, address, contact information, and cuisines.
  - Includes a favorite button to add/remove restaurants from favorites.
  
- **State Management with Redux Toolkit**
  - The list of favorite restaurants is stored in Redux state.
  - The UI updates dynamically when the state changes.
  
- **Testing with Vitest & React Testing Library**
  - Unit tests ensure core functionality, such as UI rendering and state updates.
  - API requests are mocked for controlled testing.

## Technologies Used
- **Frontend:** React, React Router
- **State Management:** Redux Toolkit
- **API Handling:** Axios
- **Styling:** Tailwind CSS
- **Testing:** Vitest, React Testing Library

## Installation & Setup
To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/claudiooleite/widigitek-challenge.git
   cd widigitek-challenge
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Start the Development Server:**
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or another available port).

4. **Run Tests:**
   ```sh
   npm run test
   ```
   This will execute the unit tests using Vitest.

## Folder Structure
```
📦 restaurant-finder
├── 📂 src
│   ├── 📂 components       # React components
│   ├── 📂 store            # Redux store and slices
│   ├── 📂 __tests__        # Unit tests
│   ├── App.jsx             # Main App component/page
│   ├── main.jsx            # React entry point
├── 📜 package.json         # Project dependencies
├── 📜 README.md            # Documentation
```

## API Integration
The project fetches restaurant data from:
```
https://api.wefood.dev/restaurants
```
- **GET /restaurants?offset={offset}&limit={limit}** → Fetches a list of restaurants.
- **GET /restaurants/{id}** → Fetches restaurant details by ID.

## Testing Strategy
- **Mocked API Requests:** Prevents dependency on live API responses.
- **State & UI Tests:** Ensures Redux state updates correctly and UI renders as expected.
- **Event Handling Tests:** Verifies user interactions such as clicking the favorite button.

## Future Improvements
- Implement search functionality for restaurants.
- Add user authentication and profiles.
- Improve UI with enhanced animations and transitions.

## License
This project is open-source and available under the **MIT License**.

## Contact
For questions or collaboration, feel free to reach out via claudio.leite@hotmail.com or submit an issue on GitHub.

