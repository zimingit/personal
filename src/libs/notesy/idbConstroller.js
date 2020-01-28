export default {
  indexedDB:  window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
  baseName:  'collection',
  storeName: 'notes',

  logerr (err) {
    console.log(err)
  },

  connectDB (f) {
    let request = this.indexedDB.open(this.baseName, 1)
    request.onerror = this.logerr
    request.onsuccess = () => {
      f(request.result)
    }
    request.onupgradeneeded = (e) => {
      e.currentTarget.result.createObjectStore(this.storeName, { keyPath: 'id' })
      this.connectDB(f)
    }
  },

  getNote (note, f) {
    this.connectDB(db => {
      let request = db.transaction([this.storeName], 'readonly').objectStore(this.storeName).get(note)
      request.onerror = this.logerr
      request.onsuccess = () => {
        f(request.result ? request.result : -1)
      }
    })
  },

  getNotes (f) {
    this.connectDB(db => {
      let notes = []
      let store = db.transaction([this.storeName], 'readonly').objectStore(this.storeName)

      if(store.mozGetAll)
        store.mozGetAll().onsuccess = (e) => {
          f(e.target.result)
        }
      else
        store.openCursor().onsuccess = (e) => {
          let cursor = e.target.result
          if (cursor) {
            notes.push(cursor.value)
            cursor.continue()
          }
          else {
            f(notes)
          }
        }
    })
  },

  setNote (note) {
    this.connectDB(db => {
      let request = db.transaction([this.storeName], 'readwrite').objectStore(this.storeName).put(note)
      request.onerror = this.logerr
      request.onsuccess = () => {
        return request.result
      }
    })
  },

  delNote (note) {
    this.connectDB(function(db){
      let request = db.transaction([this.storeName], 'readwrite').objectStore(this.storeName).delete(note)
      request.onerror = this.logerr
      request.onsuccess = () => {
        console.log('Note delete from DB:', note)
      }
    })
  }
}