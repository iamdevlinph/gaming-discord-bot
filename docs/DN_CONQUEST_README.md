## Dragon Nest Conquest

This will document how this feature will flow.

1. `/dn conquest *` commands can only ran if

#### Starting a conquest

User with permission can create party by doing `/dn conquest create <title>`. Title can be the date time for the conquest run.

Only 1 conquest can be started at a time

If it's time to start cnquest, user with permission can do `/dn conquest start`. This will create line up based on the users who registered.

The start command will prioritize users with prem first then fill the remaining slots.

Will return something like below and tagging the members:

```
Conquest: Aug 5, 2024 @ 8PM

Party 1:
- list here

Party 2:
- list here
```

#### Joining a conquest

User can join by typing a command `/dn conquest join <job_class> <has_prem>`

Cannot join if class from discord user already exists

User can unjoin by typing command `/dn conquest unjoin <job_class>`

User can check registered users by `/dn conquest join_list`

#### For record purposes

Users with permission can end a conquest by `/dn conquest end`. This will end the current conquest.

#### Possible commands

```
/dn conquest_start "Aug 2, 2024 @ 7PM"

/dn conquest_create type:fullDmg|regularDmg - can also reparty; returns party line up

/dn conquest_end

/dn conquest_register class:Moonlord ign:Name

/dn conquest_leave class?:Class ign?:Name - if mod, remove the user. if not, remove own user

/dn conquest_update

/dn conquest_seasons

/dn conquest_records season:date
  DiscordName :Class: IGN

/dn conquest_no_record role:GuildMember - list discord users with role that dont have record

{
  "discord_guildId":  {
    "conquest": {
      "date": {
        "byParty": {
          "party_1": [
            {
              "discordId",
              "discordName",
              "class",
              "ign"
            }
          ]
        },
        "byUser: ["discordId#ign#class"]
      }
    }
  }
}
```
