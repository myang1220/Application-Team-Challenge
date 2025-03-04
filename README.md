# Internship Coding Challenge, Application Team

### User Story:

Your client wants to be able to keep track of the participant (ppt) information for their organization. The first feature is a list of participants with the corresponding ICD codes for each ppt. The client would like to see a list of all participants in their organization and sort them based on how many codes each ppt has. They also need to see each participant's codes (in both ICD-code format and plain English) in a focus view, similar to a modal, for each person. In consultation with Intus Care designers, they have also finalized a Figma kit for the approximate design of this feature, included in the `Resources` section, although they are not firm on you implementing the exact design - it is up to your discretion.

#### Technology Used

- TypeScript, React, Next.js, Material-UI, Express.js, axios

#### Base Features

- [x] Participant list view with ICD code count.
- [x] Participant focus view with ICD code and condition name list.

#### Extra Features

- [x] Sorting filter for Ppt list view: default to sorting highest to lowest, can be toggled to sort from lowest to highest.
- [x] Bonus points: make the sorting filter extensible to sort by Participant name (alphabetical).

#### Additional Features

- [x] All participant data is shown in participant focus view (though this might not be desired functionality, depending on privacy concerns)
- [x] Refresh of participant data every ten minutes in case data changes frequently (even though currently the server just returns sample data and resets when server is restarted)
- [x] Caching of diagnoses names (from ICD Codes) in server
  - [x] Cache is cleared every 10 minutes
- [x] Search tool to search for participants. Searches for matches in both name and diagnosis code, using an extra server endpoint `/search`.
  - [x] These searches are also cached and cleared every 10 minutes
- [x] Responsiveness for smaller device sizes

#### Total Time Spent

7 Hours

## How To

- To start the server:
  - In root directory, move into server by running `cd server` in terminal
  - Install necessary dependencies by running `npm install` in terminal
  - Run `node ./api/index.js`
  - Verify terminal response `Server running at port: 5001`
- To start the client:
  - In root directory, move into client by running `cd client` in terminal
  - Install necessary dependencies by running `npm install` in terminal
  - Run `npm run dev` to boot up client in localhost
