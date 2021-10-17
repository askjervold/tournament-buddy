# Tournament Buddy

Tournament Buddy aims to be a helpful web app for setting up and running small Magic: the Gathering tournaments.

**DISCLAIMER:** The app is still very much a work in progress, but contains all necessary features to run a small tournament (see features below).

## Available features

- Arbitrary amount of players
  - A large amount of players MAY cause pairings to take some time
- Get seatings for draft
  - Currently only supports a single table
- Get random pairings for the first rounds
- Swiss pairings for subsequent rounds
  - Will aim to pair players with the same score but ignoring standings/tiebreakers
  - Will avoid repeat opponents, but when number of rounds exceed the optimal amount based on number of players, repeats will take priority over pairings with excessive score differences
- View standings with tiebreakers

## Planned features

Below is a list of planned features roughly in prioritized order.

- An actual design!
- Drop players after tournament start
- Set round limit
- Multi-user features:
  - Allow players to register themselves
  - Allow players to see pairings and standings from their own device
  - Allow players to register their own match results
- Round timer
- Cut to elimination rounds (top 8 etc)
- View matches/results for a given player
- Automatically split players into multiple draft tables when necessary
- Limit when standings can be viewed
- Log in to see your previous tournaments
- Support for other formats
  - Team constructed
  - 4-player matches for EDH, Conspiracy etc
  - Custom point values for wins/draws
- Printer friendly views of matches and standings
