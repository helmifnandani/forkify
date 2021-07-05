import View from './View';
import PreviewView from './previewView';
import icons from '../../img/icons.svg';

/***************************
 * resultsView as SIBLING with bookmarksView & previewView
 *
 *

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found!. Please try again!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
*/

/***************************
 * resultsView as CHILD of previewView
 *
 *
 */

class ResultsView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found!. Please try again!';
  _message = '';
}

export default new ResultsView();
