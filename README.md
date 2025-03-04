# Internship Coding Challenge, Application Team

### User Story:

Your client wants to be able to keep track of the participant (ppt) information for their organization. The first feature is a list of participants with the corresponding ICD codes for each ppt. The client would like to see a list of all participants in their organization and sort them based on how many codes each ppt has. They also need to see each partipant's codes (in both ICD-code format and plain English) in a focus view, similar to a modal, for each person. In consultation with Intus Care designers, they have also finalized a Figma kit for the approximate design of this feature, included in the `Resources` section, although they are not firm on you implementing the exact design - it is up to your discretion.

#### Technology Used

- TypeScript, React, Next.js, Material-UI, Express.js, axios

#### Base Features

- [x] Participant list view with ICD code count.
- [x] Participant focus view with ICD code and condition name list.

#### Extra Features

- [x] Sorting filter for Ppt list view: default to sorting highest to lowest, can be toggled to sort from lowest to highest.
- [x] Bonus points: make the sorting filter extensible to sort by Partipant name (alphabetical).

#### Additional Features

- [x] Caching of diagnoses names (from ICD Codes) in server
- [x] Refresh of participant data every ten minutes in case data changes frequently (even though currently the server just returns sample data and refreshes when server is restarted)
- [x] Add in all participant data when card is pressed (though this might not be desired functionality, as privacy can be an issue)
- [x] Search tool to search for participants. Searches for both name and diagnosis code matches, using an extra server endpoint `/search`.
  - [x] These searches are also cached and reset every 10 minutes
- [x] Responsiveness for smaller devices

#### Total Time Spent

7 Hours
