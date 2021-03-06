// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const apiUrl = 'http://localhost:3000/api';
export const socketUrl = 'ws://localhost:3000';
export const audiofiles = {
  game: 'assets/music/game.mp3',
  lobby: 'assets/music/lobby.mp3'
};

export const CLIENT_ID = '29624798464-uqtmjd7f97gs2gm57ns63jmvhmfrghb1.apps.googleusercontent.com';


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
