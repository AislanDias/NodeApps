# App

GymPass Style App

## FRs (Functional Requirements)
- [ ] It must be possible to sign up
- [ ] It must be possible to authenticate
- [ ] It must be possible to get the logged user profile
- [ ] It must be able to get the number of performed check-ins by the signed on user
- [ ] It must be able to get the check-in history
- [ ] It must be possible for the user to search for nearby gyms
- [ ] It must be possible for the user to search for gyms by name
- [ ] It must be possible for the user to perform the check-in in a gym
- [ ] It must be possible to validate the user's check-in
- [ ] It must be possible to sign-up a gym

## BRs (Business Rules)
- [ ] The user shouldn't be able to sign up with duplicate emails
- [ ] The user shouldn't do 2 check-ins in the same day
- [ ] The user can't do check-ins if he isn't next to a gym (100 m)
- [ ] The check-in can only be validated until 20 minutes after it was created
- [ ] Check-in can only be validated by admins
- [ ] The gym can only be signed up by admins

## RNFs (Non-Functional Requirements)

- [ ] The User password must be encrypted
- [ ] Application data must be persisted on a PostgreSQL database
- [ ] All datalists must be paginated with 20 items per page
- [ ] The user must be identified by a JWT (JSON Web Token)