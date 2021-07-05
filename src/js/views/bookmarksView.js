import View from './View';
import PreviewView from './previewView';
import icons from '../../img/icons.svg';

/***************************
 * bookmarksView as SIBLING with resultsView & previewView
 *
 *

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
*/

/***************************
 * resultsView as CHILD of previewView
 *
 *
 */

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No recipe found!. Please try again!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
