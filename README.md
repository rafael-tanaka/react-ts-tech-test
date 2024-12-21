# react-ts-tech-test

This is Convex React TypeScript Tech Test.

![Preview of Frontend](public/preview.png)

## Requirements

- npm
- Access to the Internet
- Suitable development environment

## Getting Started

- Run it: `npm start`
- Test it: `npm test`
- Build it: `npm build`

<br>

# User Stories

## 1 - Increase table font size
The font size of the establishment names and ratings is too small and needs to be increased.

### Acceptance Criteria:
- Establishment names and their ratings should have a font size of 20 pixels.

---

## 2 - Show some loading text when waiting loading the next page of data
When changing page, it is difficult to know if the new data has loaded yet as the old data stays on the table. Instead you should see the text: "Loading...".

### Acceptance Criteria:
- **Given** I have not yet loaded any Establishments  
  **When** I navigate to the homepage  
  **Then** I should see the text "Loading..." below the table headings  

- **Given** I have loaded the homepage  
  **And** I can see the table is populated  
  **When** I press to next page button  
  **Then** I should see the text "Loading..." below the table headings while the next page of establishments is being fetched  

- **Given** I have loaded the homepage  
  **And** I can see the table is populated  
  **When** I press to previous page button  
  **Then** I should see the text "Loading..." below the table headings while the previous page of establishments is being fetched  

---

## 3 - Filter Establishments by Country or Authority
Users need to be able to filter shown Establishments by their Authority (region in the country). There should be a drop down box above the table that allows the user to choose which Authority to filter the establishments by.

https://api.ratings.food.gov.uk/Help/Index/#Establishments

### Acceptance Criteria:
- **Given** the user is on the homepage  
  **When** the user clicks the Authority drop-down box  
  **Then** a list of Authorities is shown  

- **Given** the user is on the homepage  
  **And** the user has clicked the Authority drop-down box  
  **When** the user clicks on an Authority  
  **Then** the list of Establishments is filtered to only show Establishments from that Authority  

---

## 4 - Establishments link to their detail page
Clicking one of the Establishment's names should take the user to a new detail page showing more information about the Establishment. This page should show a button to "go back" to the homepage, and the information should include the Establishments:
- Address  
- Rating  
- Date of Inspection as a formatted string "dd/mm/yy"  

The layout and design of this page is not terribly important as long as it contains the correct data listed above.

### Acceptance Criteria:
- **Given** the user is on the homepage  
  **When** the user clicks on an Establishment's name  
  **Then** the user is navigated to the Establishment Detail Page  
  **And** can see the Establishments address, rating and date of inspection  

- **Given** the user is on the Establishment Detail Page  
  **When** the user clicks on the "go back" button  
  **Then** the user is navigated to the homepage  

---

## 5 (Extension) - Favourites table
Users should be able to "favourite" and "unfavourite" Establishments to compare them in a separate table.

### Acceptance Criteria:
- Add a checkbox next to each Establishment.  
- Toggling this checkbox adds or removes the Establishment name and rating from a "favourites" table at the bottom of the page.  
- This table should appear on all subsequent pages.  
- A "remove" button should sit next to each Establishment in the table which, when clicked, removes it from the list.
