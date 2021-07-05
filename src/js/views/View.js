// Import image from computer folder
import icons from '../../img/icons.svg'; // Parcel 1
// import icons from 'url:../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional';

export default class View {
  _data;

  ///////////////////////////////
  // JSDoc command
  // Muncul kalau mouse kita hover ke function/classnya
  // jsdoc.app = JAVASCRIP DOCUMENTAION
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]}} data The data to be rendered (e/g/ recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM, [] artinya optional, dan dalamnya adalah defaultnya
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View object // artinya this keywordnya nunjuk ke View object
   * @author Helmi F Nandani
   * @todo Finish implementation
   */

  // If previewView is SIBLING with bookmarksView and resultsView, use this render
  // render(data, render = true) {

  // If previewView is PARENT for bookmarksView and resultsView, use this render
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    // perlu kalau previewView is sibling with bookmarksView and resultsView
    // if (!render) return markup;

    // Clear view
    this._clear();

    // render HTML
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // .createContextualFragment(newMarkup) = will convert newMarkup string into real DOM Node Objects
    // jadi ini virtual DOM, ada di memory, nggak ada di page
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // * select all // Array.form, convert node list ke array, karena hasil dari querySelectorAll itu node list, bukan array
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      // isEqualNode = membandingkan dua node, apa bila beda atau bukan, hasilnya boolean
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    // remove any markup yang udah ada
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
