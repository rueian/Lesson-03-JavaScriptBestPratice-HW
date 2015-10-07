'use strict';

(function(exports) {

  var ListManager = function() {
    this._listNoteContent = [];
    this._wrapper = document.querySelector('#note-list-wrapper');
  }

  ListManager.prototype = {

    start() {
      this.fetchList().then((function(data){
        this.updateList(data);
        this.drawList();
        this.preloadFirstNote();
      }).bind(this)).catch((function() {

      }).bind(this));
      window.addEventListener('click', (function(event) {
        this.onNoteOpen(event);
      }).bind(this));
    },

    onNoteOpen(event) {
      if (event.target.classList.contains('note-title')) {
        var id = event.target.dataset.noteId;
        var content = this._listNoteContent[id];
        window.dispatchEvent(new CustomEvent('note-open',
          { detail: content }));
      };
    },

    preloadFirstNote() {
      if (this._listNoteContent.length !== 0) {
        var content = this._listNoteContent[0];
        window.dispatchEvent(new CustomEvent('note-open',
          { detail: content }));
      }
    },

    updateList(list) {
      this._listNoteContent = list;
    },

    drawList() {
      var list = this._listNoteContent;
      var ul = document.createElement('ul');
      ul.id = 'note-title-list';
      var buff = document.createDocumentFragment();
      for(var i in list) {
        var li = document.createElement('li');
        li.dataset.noteId = i;
        li.classList.add('note-title');
        li.textContent = list[i].title;
        buff.appendChild(li);
      }
      ul.appendChild(buff);
      this._wrapper.appendChild(ul);
    },

    fetchList() {
      return XHRequest('GET', 'http://127.0.0.1:8000/demo-list-notes.json');
    }
  }

  exports.ListManager = ListManager;
})(window);
