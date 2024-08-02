## Prerequisites

As of writing

1. node `v18.18.2`
2. yarn `1.22.22`

## Development

1. `yarn install`
2. `yarn run dev` to run
3. Secure `DISCORD_TOKEN`
4. Add bot to server by https://discord.com/oauth2/authorize?client_id=1261592303068385402

Based on [Creating your first Discord bot using TypeScript](https://dev.to/fellipeutaka/creating-your-first-discord-bot-using-typescript-1eh6)

#### ENV File

| Name               | Required? | Description                                        |
| ------------------ | --------- | -------------------------------------------------- |
| DISCORD_TOKEN      | Yes       | Discord token                                      |
| DISCORD_CLIENT_ID  | Yes       | Discord client id                                  |
| ADMIN_IDS          | Yes       | Comma separated list of IDs with admin permissions |
| DEVELOPER_GUILD_ID | No        | Deploy commands for testing and developer          |

## Production

No fancy stuff yet

1. Go to [AWS](us-east-2.console.aws.amazon.com)
2. Pull changes
3. Install packages if needed
4. Run app by `pm2 start npm --name "gaming-bot" -- run start`
5. Or build before reload
6. Or reload by `pm2 reload gaming-bot`

## Add to server

Add bot to server by https://discord.com/oauth2/authorize?client_id=1177698138178470000

NOTE: The client id here is different from the testing one.

## Commands

- /dn
  - cap
  - armor
    - drop - armor fragments location
  - efm
    - debuffs - list efm debuffs and related destiny immunity
  - nest - returns lunar drops of nest
  - lunar_frags - returns nests with that lunar fragment
- /genshin
  - version
- /valorant
  - buy_vp - returns how much currency needed to buy valorant points
- /ping
- /about

## Features

Dragon Nest SEA

- [x] Town cap stats `/dn cap`
- [ ] Armor fragment drops
- [x] Current EFM debuff (in town cap stats)
- [ ] Current EFM ordeal
- [ ] Nest lunar fragment drop info `/dn nest lunar`
- [ ] Mark nest/dungeon as done (nests, efm, etc...)

Genshin Impact

- [x] Current version
- [ ] Mark spiral abyss as done for the current period
- [ ] Mark imaginarium theater as done for the current period
