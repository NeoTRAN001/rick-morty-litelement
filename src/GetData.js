import { LitElement, html, css } from 'lit-element';

export class GetData extends LitElement {

    static get properties() {
        return {
          url: { type: String },
          method: { type: String }
        };
    }

    constructor() {
        super();
    
        this.wiki = [];
    }

    _sendData(data) {
        this.dispatchEvent(new CustomEvent('ApiData', {
            detail: { data }, bubbles: true, composed: true
        }));  
    }

    render() {
        return html`
            ${
                fetch(this.url, { method: this.method })
                .then((response) => {
                    if (response.ok) return response.json();
                    return Promise.reject(response);
                })
                .then((data) => { this._sendData(data); })
                .catch((error) => { console.warn('Something went wrong.', error); })
            }
        `;
    }
}

customElements.define('get-data', GetData);