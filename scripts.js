const songList =  {
  1: "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', ')
}


// INITIAL REDUX STATE
const initialState = {
  currentSongId: 1,
  songsById: {
    1: {
      title: "Bye Bye Bye",
      artist: "N Sync",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0
    }
  }
}

// function Song(chorusString, position = 0) {
//   this.chorus = chorusString;
//   this.chorusArray = this.chorus.split(', ');
//   this.position = position;
//   this.currentPhrase = this.chorusArray[this.position];
// }

// REDUX REDUCERS
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;

  switch (action.type) {
    case 'NEXT_LYRIC':
    console.log(action);
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      console.log(newArrayPosition);
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      console.log(newSongsByIdEntry);
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId] : newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    // case 'RESTART_SONG' will go here

      // break;
    default:
      return state;
  }
}

// REDUX STORE
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);


// let byeByeBye = new Song(chorus);

// function switchPhrase() {
//   if (byeByeBye.position < byeByeBye.chorusArray.length - 1) {
//     let newPosition = byeByeBye.position + 1;
//     const newSong = new Song(byeByeBye.chorus, newPosition);
//     return newSong;
//   } else {
//     let newSong = new Song(byeByeBye.chorus);
//     return newSong;
//   }
// }


// RENDERING STATE IN DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }

  if (store.getState().currentSongId) {
    const currentLine = document.createTextNode(store.getState().songsById[store.getState().currentSongId].songArray[store.getState().songsById[store.getState().currentSongId].arrayPosition]);
    document.getElementById('lyrics').appendChild(currentLine);
  }
}

const renderSongs = () => {
  const songsById = store.getState().songsById;
  for (const songKey in songsById) {
    const song = songsById[songKey]
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    h3.addEventListener('click', function() {
      selectSong(song.songId);
    });
    li.appendChild(h3);
    document.getElementById('songs').appendChild(li);
  }
}

// function displayPhrase(song) {
//   document.getElementById('words').innerHTML = song.currentPhrase;
// }

window.onload = function() {
  renderLyrics();
}

// CLICK LISTENERS
const userClick = () => {
  store.dispatch({  type: 'NEXT_LYRIC',
                    currentSongId: 1 })
}

//   if (store.getState().songsById[store.getState().currentSongId].arrayPosition === store.getState().songsById[store.getState().currentSongId].songArray.length - 1) {
//     store.dispatch({  type: 'NEXT_LYRIC',
//                       currentSongId: store.getState().currentSongId });
// }


// SUBSCRIBE TO REDUX store
store.subscribe(renderLyrics);

// function userClick() {
//   byeByeBye = switchPhrase();
//   displayPhrase(byeByeBye);
// }
