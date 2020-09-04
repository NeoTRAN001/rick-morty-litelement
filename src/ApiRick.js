import { LitElement, html, css } from 'lit-element';
import './GetData';
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

    this.addEventListener('ApiData', (e) => { 
      this._dataFormat(e.detail.data);
    });
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
      <get-data url="https://rickandmortyapi.com/api/character/" method="GET"></get-data>
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
