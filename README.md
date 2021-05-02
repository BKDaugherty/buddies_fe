# Buddies

This application will augment your interpersonal intelligence, and fill in
the gaps that our imperfect memories leave behind. With Buddies, you can
- keep track of who you hahve and hahven't talked to
- jot down notes about a person, keyed to important events
- configure reminders to reach out and reconnect

### Things we care about
- remembering these you did / heard about / talked about 
- remembering when it was you last talked 
- encouraging to reach out more
- has space for birthday, notes
- NOT social

### Component Structure

...

### Model

Model for buddy object
```
Buddy (Charlie)
- id <ID>
- birthday (July 1, 1997) <Date>
- cadence (every six months) <Millis>
- lastCRemindedOrInteracted (February 4th) <Date>
- notes ("Blah....") <Text>
- locations (San Diego) <Location>
```

Model for interaction object
```
Interaction (Lunch)
- id <ID>
- buddy <Set<ID>>
- date (July 1, 1997) <Date>
- notes ("Blah....") <Text>
- participants (Charlie, Amy) <Set<ID>>
- tags? ("Restaurant", "Park") <Set<String>>
```

Model for user
```
- id <ID>
- email ("bskirmishh@gmail.com) <String>
- password (***) <Hash>
- notifications <Boolean>
- location <Location>
```

### View
- Home
    - dasHboard
      - insightBanner
      - reminders
    - addBuddy()
    - addInteraction()
- BuddyList
    - abbrev. details
- BuddyInteractionList
    - details
    - interactions
- InteractionSearchResultList
    - interactions
    - tap takes you to BuddyInteractionList
- AddInteraction
    - populate fields
- AddBuddy
    - populate fields
- Preferences
    - push notifications
    - where you are
    - change password
    - logout
-O nboard
    - sign up
    - batch add buddies

### Controller
- Search
    - Interaction
      - date, participants, tags?
- BuddyRoulette
    - use heuristics to choose

### APIs
SignUp
- args
  - email
  - password
- return
  - user

Login
- args
  - email
  - password
- return
  - user

UpdatePreferences
- args
  - notifications
  - location
- return
  - status code

CreateBuddy
- args
  - buddyData
- args
  - Buddy

UpdateBuddy
- args
  - buddyDataWithId
- args
  - Buddy

DeleteBuddy
- args
  - buddy.id
- return
  - status code

GetBuddies
- args
  - user.id
- return
  - buddies

