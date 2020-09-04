import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-card';

export class ApiRick extends LitElement {
  static get properties() {
    return {
      wiki: { type: Array }
    };
  }

  constructor() {
    super();

    this.wiki = [];

    fetch('https://rickandmortyapi.com/api/character/', { method: 'GET' })
    .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
    })
    .then((data) => { this._dataFormat(data); })
    .catch((error) => { console.warn('Something went wrong.', error); });
}

  _dataFormat(data) {
      let characters = [];

      data["results"].forEach((character) => {
        characters.push({
          img: character.image,
          name: character.name,
          species: character.species,
          status: character.status
        });
      });

      this.wiki = characters;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      ${this.wiki.map(character => html`
        <paper-card>
            <div class="card-content aToDo">
                <h2 class="text-content"> ${ character.name }</h2> 
                <img src="${character.img}">
                <p>${character.species} | ${character.status}</p>
            </div>
        </paper-card>
      `)}
    `;
  }
}
