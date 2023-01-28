# Metadata generator for Farcantasy

Generates cards metadata and images.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/farcantasy-metadata`
2. Create `.env` with the environment variables listed below
3. Run `yarn` in the root folder
4. Run `yarn start`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name                 | Description                                     |
| -------------------- | ----------------------------------------------- |
| `PORT`               | Port to run server on (defaults to 1337)        |
| `FARCASTER_MNEMONIC` | Mnemonic for a Farcaster account to access data |
| `ETH_RPC`            | Ethereum RPC endpoint                           |
| `CONTRACT_ADDRESS`   | Address of the Farcantasy contract              |

Also, please, consider looking at `.env.sample`.
